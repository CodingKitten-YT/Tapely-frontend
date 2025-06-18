import { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import CustomizerUI from './components/CustomizerUI';

export interface Material {
  color: string;
  metalness: number;
  roughness: number;
}

export interface Materials {
  SIDEA: Material;
  SIDEB: Material;
  BASE: Material;
  ACCENTS: Material;
}

function App() {
  const [materials, setMaterials] = useState<Materials>({
    SIDEA: {
      color: '#ff6b6b',
      metalness: 0.1,
      roughness: 0.8
    },
    SIDEB: {
      color: '#4ecdc4',
      metalness: 0.1,
      roughness: 0.8
    },
    BASE: {
      color: '#2c3e50',
      metalness: 0.3,
      roughness: 0.6
    },
    ACCENTS: {
      color: '#f39c12',
      metalness: 0.7,
      roughness: 0.2
    }
  });

  const handleMaterialChange = (
    materialType: keyof Materials, 
    property: keyof Material, 
    value: string | number
  ) => {
    setMaterials((prevMaterials) => ({
      ...prevMaterials,
      [materialType]: {
        ...prevMaterials[materialType],
        [property]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <header className="text-center py-6 px-4 bg-white border-b">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">
          Tapely
        </h1>
        <p className="text-gray-600">
          Design your cassette tape
        </p>
      </header>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full">
        <div className="w-full lg:w-80 flex-shrink-0">
          <CustomizerUI materials={materials} onMaterialChange={handleMaterialChange} />
        </div>
        
        <div className="flex-1 min-h-[600px] bg-white rounded-lg border shadow-sm overflow-hidden">
          <Canvas materials={materials} />
        </div>
      </div>
    </div>
  );
}

export default App;