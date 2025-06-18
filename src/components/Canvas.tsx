import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Model from './Model'
import { Materials } from '../App'

interface CanvasComponentProps {
  materials: Materials;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({ materials }) => {
  return (
    <Canvas
      camera={{ position: [180, 180, 20], fov: 50 }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <Environment preset="studio" />
      <Model materials={materials} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={100}
        maxDistance={400}
      />
    </Canvas>
  )
}

export default CanvasComponent