import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url, colors, setColors }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(url);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) / 8;
    group.current.position.y = (1 + Math.sin(t / 1.5)) / 50;
  });

  return (
    <group ref={group} dispose={null}>
      {Object.entries(nodes).map(([nodeName, node]) => {
        if (node.isMesh) {
          return (
            <mesh 
              key={nodeName} 
              geometry={node.geometry} 
              material={materials[node.material.name]}
              material-color={colors[nodeName] || '#ffffff'}
              onClick={() => {
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                setColors(prev => ({ ...prev, [nodeName]: '#' + randomColor }));
              }}
            />
          );
        }
        return null;
      })}
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
      <div className="p-4 bg-gray-100">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(colors).map(([part, color]) => (
            <ColorPicker 
              key={part}
              label={`${part} Color`}
              color={color}
              onChange={(newColor) => setColors(prev => ({ ...prev, [part]: newColor }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelCustomizer;