import { useState } from "react";
import { DetailedIndiaMap } from "@/components/map/detailed-india-map";
import HealthSnapshot from "@/components/health/health-snapshot";
import { AIHealthChatbot } from "@/components/chat/ai-health-chatbot";
import { useQuery } from "@tanstack/react-query";
import { type HealthPrediction } from "@shared/schema";

interface HealthSnapshotConnectorProps {
  selectedState: string;
}

function HealthSnapshotConnector({ selectedState }: HealthSnapshotConnectorProps) {
  const { data, isLoading, error } = useQuery<HealthPrediction>({
    queryKey: ['/api/predict', selectedState],
    queryFn: async () => {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: selectedState, month: 'January' })
      });
      if (!response.ok) throw new Error('Failed to fetch health data');
      return response.json();
    },
    enabled: !!selectedState
  });

  return (
    <HealthSnapshot 
      data={data || null} 
      isLoading={isLoading} 
      error={error} 
      selectedState={selectedState}
    />
  );
}

export default function MapPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            🤖 AI-Powered Health Intelligence Platform
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time disease prediction and health surveillance powered by AI
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Intelligence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span>AI Chatbot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Interactive Map</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Map Section */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  🗺️ Interactive Disease Map
                </h2>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Click states for AI insights
                </div>
              </div>
              <div className="w-full overflow-auto">
                <div className="min-h-[400px] max-h-[600px]">
                  <DetailedIndiaMap 
                    onStateSelect={setSelectedState} 
                    selectedState={selectedState}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Chatbot */}
          <div className="xl:col-span-1">
            <AIHealthChatbot 
              selectedState={selectedState}
            />
          </div>
        </div>
        
        {/* Health Data Panel - Below map */}
        {selectedState && (
          <div className="mt-6">
            <HealthSnapshotConnector selectedState={selectedState} />
          </div>
        )}
        
        {/* AI Capabilities Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            🤖 AI Intelligence Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="font-semibold text-base mb-1.5">Real-time Web Scraping</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Collects latest health data from medical websites and databases
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">
              <div className="text-3xl mb-2">🔬</div>
              <h3 className="font-semibold text-base mb-1.5">Disease Prediction</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                AI analyzes patterns to predict outbreaks and regional health risks
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-base mb-1.5">Interactive AI Chat</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Chat for personalized health insights and prevention tips
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-base mb-1.5">Smart Analytics</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Data visualization with trends and actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}