import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import IndiaMap3D from "@/components/map/india-map-3d";
import HealthSnapshot from "@/components/health/health-snapshot";
import { type HealthPrediction } from "@shared/schema";

export default function PredictiveMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [predictionData, setPredictionData] = useState<HealthPrediction | null>(null);

  // Query for health prediction when state is selected
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/predict", selectedState],
    enabled: !!selectedState,
    queryFn: async () => {
      if (!selectedState) return null;
      
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region: selectedState,
          month: "January", // Current month - could be dynamic
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch prediction");
      }

      return response.json();
    },
  });

  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    if (data) {
      setPredictionData(data);
    }
  };

  // Update prediction data when query completes
  if (data && !isLoading) {
    if (predictionData?.region !== data.region) {
      setPredictionData(data);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Health Surveillance Dashboard</h2>
              <p className="text-muted-foreground mt-1">Real-time health intelligence and predictive analytics</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleString()}
              </div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-accent font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[calc(100vh-180px)] flex">
        {/* Map Container */}
        <div className="flex-1 lg:w-3/5 relative">
          <IndiaMap3D 
            onStateSelect={handleStateSelect}
            isLoading={isLoading}
          />
        </div>

        {/* Health Data Panel */}
        <div className="w-full lg:w-2/5 bg-muted/30 border-l border-border overflow-y-auto">
          <HealthSnapshot 
            data={predictionData}
            isLoading={isLoading}
            error={error as Error | null}
            selectedState={selectedState}
          />
        </div>
      </div>
    </div>
  );
}
