import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Shoe = ({ colors }) => {
  return (
    <group>
      {/* Sole */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.5, 0.2, 3]} />
        <meshStandardMaterial color={colors.sole} />
      </mesh>
      {/* Upper */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.4, 0.6, 2.8]} />
        <meshStandardMaterial color={colors.upper} />
      </mesh>
      {/* Laces */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1, 0.1, 2]} />
        <meshStandardMaterial color={colors.laces} />
      </mesh>
      {/* Stripe */}
      <mesh position={[0.7, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.6, 2.8]} />
        <meshStandardMaterial color={colors.stripe} />
      </mesh>
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

const ShoeCustomizer = () => {
  const [colors, setColors] = useState({
    sole: '#ffffff',
    upper: '#ff0000',
    laces: '#00ff00',
    stripe: '#0000ff'
  });

  const handleColorChange = (part, color) => {
    setColors(prevColors => ({ ...prevColors, [part]: color }));
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-grow">
        <Canvas camera={{ position: [0, 1, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Shoe colors={colors} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="p-4 bg-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker label="Sole Color" color={colors.sole} onChange={(color) => handleColorChange('sole', color)} />
          <ColorPicker label="Upper Color" color={colors.upper} onChange={(color) => handleColorChange('upper', color)} />
          <ColorPicker label="Laces Color" color={colors.laces} onChange={(color) => handleColorChange('laces', color)} />
          <ColorPicker label="Stripe Color" color={colors.stripe} onChange={(color) => handleColorChange('stripe', color)} />
        </div>
      </div>
    </div>
  );
};

export default ShoeCustomizer;