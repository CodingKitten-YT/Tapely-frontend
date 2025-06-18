import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { 
  Palette, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Material, Materials } from '../App';
import Slider from './ui/Slider';

interface CustomizerUIProps {
  materials: Materials;
  onMaterialChange: (materialName: keyof Materials, property: keyof Material, value: string | number) => void;
}

const CustomizerUI: React.FC<CustomizerUIProps> = ({ materials, onMaterialChange }) => {
  const [expandedMaterial, setExpandedMaterial] = useState<string | null>('SIDEA');

  const materialOptions = [
    { 
      key: 'SIDEA' as keyof Materials, 
      label: 'Side A',
      color: '#ef4444'
    },
    { 
      key: 'SIDEB' as keyof Materials, 
      label: 'Side B',
      color: '#3b82f6'
    },
    { 
      key: 'BASE' as keyof Materials, 
      label: 'Body',
      color: '#64748b'
    },
    { 
      key: 'ACCENTS' as keyof Materials, 
      label: 'Accents',
      color: '#f59e0b'
    },
  ];

  const presetMaterials = [
    {
      name: 'Classic',
      materials: {
        SIDEA: { color: '#ff6b6b', metalness: 0.1, roughness: 0.8 },
        SIDEB: { color: '#4ecdc4', metalness: 0.1, roughness: 0.8 },
        BASE: { color: '#2c3e50', metalness: 0.3, roughness: 0.6 },
        ACCENTS: { color: '#f39c12', metalness: 0.7, roughness: 0.2 }
      }
    },
    {
      name: 'Chrome',
      materials: {
        SIDEA: { color: '#ffffff', metalness: 0.9, roughness: 0.1 },
        SIDEB: { color: '#e5e7eb', metalness: 0.9, roughness: 0.1 },
        BASE: { color: '#6b7280', metalness: 0.8, roughness: 0.2 },
        ACCENTS: { color: '#374151', metalness: 0.9, roughness: 0.1 }
      }
    },
    {
      name: 'Matte',
      materials: {
        SIDEA: { color: '#dc2626', metalness: 0.0, roughness: 0.9 },
        SIDEB: { color: '#7c3aed', metalness: 0.0, roughness: 0.9 },
        BASE: { color: '#475569', metalness: 0.1, roughness: 0.8 },
        ACCENTS: { color: '#eab308', metalness: 0.0, roughness: 0.9 }
      }
    }
  ];

  const handlePresetClick = (preset: typeof presetMaterials[0]) => {
    Object.entries(preset.materials).forEach(([materialKey, materialProps]) => {
      Object.entries(materialProps).forEach(([property, value]) => {
        onMaterialChange(
          materialKey as keyof Materials,
          property as keyof Material,
          value
        );
      });
    });
  };

  const toggleMaterial = (materialKey: string) => {
    setExpandedMaterial(expandedMaterial === materialKey ? null : materialKey);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Materials</h2>
        <p className="text-sm text-gray-600">Customize your cassette</p>
      </div>

      <div className="space-y-6">
        {/* Quick Presets */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Presets</h3>
          <div className="grid grid-cols-3 gap-2">
            {presetMaterials.map((preset) => (
              <button
                key={preset.name}
                className="p-2 border rounded-md hover:bg-gray-50 transition-colors text-left"
                onClick={() => handlePresetClick(preset)}
              >
                <div className="text-xs font-medium text-gray-900 mb-1">
                  {preset.name}
                </div>
                <div className="flex gap-1">
                  {Object.values(preset.materials).map((material, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: material.color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-200 h-px" />

        {/* Material Controls */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Components</h3>
          
          <div className="space-y-2">
            {materialOptions.map((option) => (
              <div key={option.key} className="border rounded-md overflow-hidden">
                <button
                  className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleMaterial(option.key)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: materials[option.key].color }}
                    />
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </div>
                  {expandedMaterial === option.key ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                {expandedMaterial === option.key && (
                  <div className="p-4 pt-0 space-y-4 bg-gray-50/50">
                    {/* Color */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Color
                      </Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={materials[option.key].color}
                          onChange={(e) => onMaterialChange(option.key, 'color', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <span className="text-sm font-mono text-gray-600">
                          {materials[option.key].color}
                        </span>
                      </div>
                    </div>

                    {/* Metalness */}
                    <div>
                      <Label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>Metalness</span>
                        <span className="text-xs text-gray-500">
                          {Math.round(materials[option.key].metalness * 100)}%
                        </span>
                      </Label>
                      <Slider
                        value={materials[option.key].metalness}
                        onValueChange={(value) => onMaterialChange(option.key, 'metalness', value)}
                        min={0}
                        max={1}
                        step={0.01}
                      />
                    </div>

                    {/* Roughness */}
                    <div>
                      <Label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>Roughness</span>
                        <span className="text-xs text-gray-500">
                          {Math.round(materials[option.key].roughness * 100)}%
                        </span>
                      </Label>
                      <Slider
                        value={materials[option.key].roughness}
                        onValueChange={(value) => onMaterialChange(option.key, 'roughness', value)}
                        min={0}
                        max={1}
                        step={0.01}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizerUI;