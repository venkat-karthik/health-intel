import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Home } from "lucide-react";

// Mock 3D map component - in production, this would use actual GLB model
function IndiaMapMesh({ onStateClick, isLoading }: { onStateClick: (state: string) => void; isLoading: boolean }) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Sample state data with positions and risk levels
  const states = [
    { name: "Delhi", position: [0, 2, 0], risk: "high", displayName: "Delhi" },
    { name: "Maharashtra", position: [-2, 0, 0], risk: "high", displayName: "Maharashtra" },
    { name: "Karnataka", position: [-2, -2, 0], risk: "medium", displayName: "Karnataka" },
    { name: "West Bengal", position: [2, 1, 0], risk: "high", displayName: "West Bengal" },
    { name: "Rajasthan", position: [-3, 1, 0], risk: "low", displayName: "Rajasthan" },
    { name: "Tamil Nadu", position: [-1, -3, 0], risk: "medium", displayName: "Tamil Nadu" },
    { name: "Gujarat", position: [-3, 0, 0], risk: "low", displayName: "Gujarat" },
    { name: "Uttar Pradesh", position: [0, 1, 0], risk: "medium", displayName: "Uttar Pradesh" },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "#dc2626"; // red
      case "medium": return "#d97706"; // orange
      case "low": return "#059669"; // green
      default: return "#6b7280"; // gray
    }
  };

  return (
    <group>
      {/* Base India outline */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[8, 6]} />
        <meshBasicMaterial color="#e2e8f0" opacity={0.3} transparent />
      </mesh>

      {/* State markers */}
      {states.map((state) => (
        <group key={state.name} position={state.position as [number, number, number]}>
          <mesh
            onClick={() => !isLoading && onStateClick(state.name)}
            onPointerEnter={() => !isLoading && setHoveredState(state.name)}
            onPointerLeave={() => setHoveredState(null)}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial 
              color={getRiskColor(state.risk)} 
              opacity={hoveredState === state.name ? 0.8 : 1}
              transparent
            />
          </mesh>
          
          {hoveredState === state.name && (
            <Html position={[0, 0.5, 0]} center>
              <div className="bg-card border border-border rounded px-2 py-1 shadow-lg pointer-events-none">
                <p className="text-sm font-medium text-foreground">{state.displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">{state.risk} Risk</p>
              </div>
            </Html>
          )}
        </group>
      ))}
      
      {/* Loading overlay */}
      {isLoading && (
        <Html position={[0, 0, 1]} center>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-muted-foreground">Loading health data...</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

interface IndiaMap3DProps {
  onStateSelect: (stateName: string) => void;
  isLoading?: boolean;
}

export default function IndiaMap3D({ onStateSelect, isLoading = false }: IndiaMap3DProps) {
  const controlsRef = useRef<any>();

  const handleZoomIn = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.multiplyScalar(0.8);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.multiplyScalar(1.25);
      controlsRef.current.update();
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="india-map-container h-full flex items-center justify-center p-8 relative">
      <div className="map-overlay"></div>
      
      {/* 3D Canvas */}
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          
          <Suspense fallback={null}>
            <IndiaMapMesh onStateClick={onStateSelect} isLoading={isLoading} />
          </Suspense>
          
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={15}
            minDistance={3}
          />
        </Canvas>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="w-8 h-8 p-0"
            data-testid="button-zoom-in"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="w-8 h-8 p-0"
            data-testid="button-zoom-out"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-8 h-8 p-0"
            data-testid="button-reset-view"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Risk Levels</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-xs text-muted-foreground">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#d97706" }}></div>
              <span className="text-xs text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-xs text-muted-foreground">Low Risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
