import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Plus, Minus, Home } from "lucide-react";

// Interactive map component using a simple grid layout
function IndiaMapGrid({ onStateClick, isLoading }: { onStateClick: (state: string) => void; isLoading: boolean }) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Sample state data with grid positions and risk levels
  const states = [
    { name: "Delhi", gridRow: 2, gridCol: 3, risk: "high", displayName: "Delhi" },
    { name: "Maharashtra", gridRow: 4, gridCol: 2, risk: "high", displayName: "Maharashtra" },
    { name: "Karnataka", gridRow: 6, gridCol: 2, risk: "medium", displayName: "Karnataka" },
    { name: "West Bengal", gridRow: 3, gridCol: 5, risk: "high", displayName: "West Bengal" },
    { name: "Rajasthan", gridRow: 3, gridCol: 1, risk: "low", displayName: "Rajasthan" },
    { name: "Tamil Nadu", gridRow: 7, gridCol: 3, risk: "medium", displayName: "Tamil Nadu" },
    { name: "Gujarat", gridRow: 4, gridCol: 1, risk: "low", displayName: "Gujarat" },
    { name: "Uttar Pradesh", gridRow: 2, gridCol: 4, risk: "medium", displayName: "Uttar Pradesh" },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-500 border-red-600";
      case "medium": return "bg-orange-500 border-orange-600";
      case "low": return "bg-green-500 border-green-600";
      default: return "bg-gray-500 border-gray-600";
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* India Map Grid */}
      <div className="relative" style={{ width: '500px', height: '400px' }}>
        {/* Grid container */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 gap-2">
          {states.map((state) => (
            <div
              key={state.name}
              className={`
                relative flex items-center justify-center rounded-lg cursor-pointer
                transition-all duration-200 transform hover:scale-110 hover:z-10
                border-2 shadow-sm
                ${getRiskColor(state.risk)}
                ${hoveredState === state.name ? 'scale-110 shadow-lg' : ''}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              style={{
                gridRow: state.gridRow,
                gridColumn: state.gridCol,
                minHeight: '40px',
                minWidth: '60px'
              }}
              onClick={() => !isLoading && onStateClick(state.name)}
              onMouseEnter={() => !isLoading && setHoveredState(state.name)}
              onMouseLeave={() => setHoveredState(null)}
              data-testid={`state-${state.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="text-white text-xs font-medium text-center px-1">
                {state.displayName}
              </span>
              
              {/* Tooltip */}
              {hoveredState === state.name && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <Card className="shadow-lg border-border">
                    <CardContent className="p-2">
                      <p className="text-sm font-medium text-foreground">{state.displayName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{state.risk} Risk</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>
        
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
          <IndiaMapGrid onStateClick={onStateSelect} isLoading={isLoading} />
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
