import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Plus, Minus, Home } from "lucide-react";

// Interactive India map with SVG visualization
function IndiaMapSVG({ onStateClick, isLoading }: { onStateClick: (state: string) => void; isLoading: boolean }) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Sample state data with risk levels
  const states = [
    { name: "Delhi", risk: "high", displayName: "Delhi", path: "M300,180 L320,180 L320,200 L300,200 Z" },
    { name: "Maharashtra", risk: "high", displayName: "Maharashtra", path: "M200,280 L280,280 L280,350 L200,350 Z" },
    { name: "Karnataka", risk: "medium", displayName: "Karnataka", path: "M220,350 L280,350 L280,420 L220,420 Z" },
    { name: "West Bengal", risk: "high", displayName: "West Bengal", path: "M400,220 L460,220 L460,280 L400,280 Z" },
    { name: "Rajasthan", risk: "low", displayName: "Rajasthan", path: "M150,120 L280,120 L280,220 L150,220 Z" },
    { name: "Tamil Nadu", risk: "medium", displayName: "Tamil Nadu", path: "M240,420 L300,420 L300,480 L240,480 Z" },
    { name: "Gujarat", risk: "low", displayName: "Gujarat", path: "M120,220 L200,220 L200,300 L120,300 Z" },
    { name: "Uttar Pradesh", risk: "medium", displayName: "Uttar Pradesh", path: "M280,120 L380,120 L380,200 L280,200 Z" },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "#dc2626";
      case "medium": return "#d97706";
      case "low": return "#059669";
      default: return "#6b7280";
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* SVG India Map */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg border border-border" style={{ width: '600px', height: '500px' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 500"
          className="absolute inset-0"
        >
          {/* Map background */}
          <rect width="600" height="500" fill="#f8fafc" rx="8" />
          
          {/* State regions */}
          {states.map((state) => (
            <g key={state.name}>
              <path
                d={state.path}
                fill={getRiskColor(state.risk)}
                stroke="#ffffff"
                strokeWidth="2"
                className={`
                  cursor-pointer transition-all duration-200
                  ${hoveredState === state.name ? 'opacity-80 drop-shadow-lg' : 'opacity-100'}
                  ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
                `}
                onClick={() => !isLoading && onStateClick(state.name)}
                onMouseEnter={() => !isLoading && setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                data-testid={`state-${state.name.toLowerCase().replace(/\s+/g, '-')}`}
              />
              
              {/* State labels */}
              <text
                x={state.path.includes('M300,180') ? '310' : state.path.includes('M200,280') ? '240' : state.path.includes('M220,350') ? '250' : state.path.includes('M400,220') ? '430' : state.path.includes('M150,120') ? '215' : state.path.includes('M240,420') ? '270' : state.path.includes('M120,220') ? '160' : '330'}
                y={state.path.includes('M300,180') ? '195' : state.path.includes('M200,280') ? '315' : state.path.includes('M220,350') ? '385' : state.path.includes('M400,220') ? '255' : state.path.includes('M150,120') ? '175' : state.path.includes('M240,420') ? '455' : state.path.includes('M120,220') ? '265' : '165'}
                fill="white"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {state.displayName}
              </text>
            </g>
          ))}
          
          {/* Map title */}
          <text x="300" y="30" fill="#1f2937" fontSize="18" fontWeight="bold" textAnchor="middle">
            India Health Surveillance Map
          </text>
          <text x="300" y="50" fill="#6b7280" fontSize="12" textAnchor="middle">
            Real-time Disease Risk Assessment
          </text>
        </svg>
        
        {/* Tooltip */}
        {hoveredState && (
          <div className="absolute top-4 left-4 z-20">
            <Card className="shadow-lg border-border bg-card/95 backdrop-blur-sm">
              <CardContent className="p-3">
                <p className="text-sm font-medium text-foreground">{hoveredState}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {states.find(s => s.name === hoveredState)?.risk} Risk Level
                </p>
                <p className="text-xs text-primary mt-1">Click to view details</p>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-muted-foreground">Loading health data...</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Real-time indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-1 border border-border">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground font-medium">LIVE</span>
        </div>
      </div>
    </div>
  );
}

interface IndiaMap3DProps {
  onStateSelect: (stateName: string) => void;
  isLoading?: boolean;
}

export default function IndiaMap3D({ onStateSelect, isLoading = false }: IndiaMap3DProps) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  return (
    <div className="india-map-container h-full flex items-center justify-center p-8 relative">
      <div className="map-overlay"></div>
      
      {/* Interactive Map */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className="transition-transform duration-300 ease-in-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <IndiaMapSVG onStateClick={onStateSelect} isLoading={isLoading} />
        </div>
        
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
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-muted-foreground">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">Low Risk</span>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-medium text-foreground">Interactive Map</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Click on any state to view health predictions and disease forecasts.
          </p>
        </div>
      </div>
    </div>
  );
}
