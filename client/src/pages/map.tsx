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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI-Powered Health Intelligence Platform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time disease prediction and health surveillance system powered by advanced AI that gathers live data from across the web
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Web Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>AI Chatbot Assistance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Interactive State Mapping</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 h-[calc(100vh-250px)]">
          {/* Map Section */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  🗺️ AI-Enhanced Disease Map
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Click states for live AI predictions
                </div>
              </div>
              <div className="h-[calc(100%-80px)]">
                <DetailedIndiaMap 
                  onStateSelect={setSelectedState} 
                  selectedState={selectedState}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* AI Chatbot */}
          <div className="xl:col-span-2 space-y-6">
            <AIHealthChatbot 
              selectedState={selectedState}
              className="h-full"
            />
          </div>
        </div>
        
        {/* Health Data Panel - Below map */}
        {selectedState && (
          <div className="mt-8">
            <HealthSnapshotConnector selectedState={selectedState} />
          </div>
        )}
        
        {/* AI Capabilities Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            🤖 AI Intelligence Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-semibold text-lg mb-2">Real-time Web Scraping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automatically collects latest health information from medical websites, news sources, and health databases
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="font-semibold text-lg mb-2">Disease Prediction</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AI analyzes patterns to predict disease outbreaks, seasonal trends, and regional health risks
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold text-lg mb-2">Interactive AI Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Chat with AI assistant for personalized health insights, symptom analysis, and prevention tips
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-lg mb-2">Smart Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advanced data visualization with trends, risk assessments, and actionable health recommendations
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-center">🎯 Key AI Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Data Collection:</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Live health news monitoring</li>
                  <li>• Medical journal analysis</li>
                  <li>• Government health advisories</li>
                  <li>• WHO/ICMR data integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Intelligence Features:</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Symptom-based disease identification</li>
                  <li>• Risk level assessments</li>
                  <li>• Prevention strategy recommendations</li>
                  <li>• Outbreak early warning system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}