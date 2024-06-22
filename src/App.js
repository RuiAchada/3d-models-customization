import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ url, colors, setColors }) => {
  const group = useRef();
  const { scene } = useGLTF(url);
  const { invalidate } = useThree();

  useEffect(() => {
    const newColors = {};
    scene.traverse((object) => {
      if (object.isMesh) {
        const key = object.name || object.uuid;
        if (object.material.color) {
          newColors[key] = '#' + object.material.color.getHexString();
        }
      }
    });
    setColors(newColors);
  }, [scene, setColors]);

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        const key = object.name || object.uuid;
        if (colors[key]) {
          if (object.material.color) {
            object.material.color.set(colors[key]);
          } else {
            object.material = new THREE.MeshStandardMaterial({ color: colors[key] });
          }
          object.material.needsUpdate = true;
        }
      }
    });
    invalidate();
  }, [scene, colors, invalidate]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) / 8;
    group.current.position.y = (1 + Math.sin(t / 1.5)) / 50;
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

const ColorPicker = ({ label, color, onChange }) => (
  <div className="mb-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full h-8"
    />
  </div>
);

const ModelCustomizer = () => {
  const [modelUrl, setModelUrl] = useState('');
  const [colors, setColors] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
      setColors({}); // Reset colors when new model is loaded
    }
  };

  const handleColorChange = (part, newColor) => {
    setColors(prev => ({ ...prev, [part]: newColor }));
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-4 bg-gray-100">
        <input type="file" accept=".gltf,.glb" onChange={handleFileChange} className="mb-4" />
      </div>
      <div className="flex-grow">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Suspense fallback={null}>
            {modelUrl && <Model url={modelUrl} colors={colors} setColors={setColors} />}
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="p-4 bg-gray-100 overflow-auto" style={{maxHeight: '30vh'}}>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(colors).map(([part, color]) => (
            <ColorPicker 
              key={part}
              label={part}
              color={color}
              onChange={(newColor) => handleColorChange(part, newColor)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelCustomizer;