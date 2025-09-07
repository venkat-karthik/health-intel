import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface DetailedIndiaMapProps {
  onStateSelect: (stateName: string) => void;
  selectedState: string | null;
  className?: string;
}

interface StateData {
  name: string;
  code: string;
  path: string;
  centroid: [number, number];
  riskLevel?: 'High' | 'Medium' | 'Low';
}

const indianStates: StateData[] = [
  {
    name: 'Jammu & Kashmir',
    code: 'JK',
    path: 'M158 45L195 38L205 55L185 68L170 75L158 45Z',
    centroid: [180, 55]
  },
  {
    name: 'Ladakh',
    code: 'LA', 
    path: 'M205 25L245 30L255 45L235 55L205 55L205 25Z',
    centroid: [225, 40]
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    path: 'M158 75L185 68L205 75L195 88L175 92L158 85L158 75Z',
    centroid: [180, 80]
  },
  {
    name: 'Punjab',
    code: 'PB',
    path: 'M145 85L175 92L185 102L165 108L150 105L145 85Z',
    centroid: [162, 95]
  },
  {
    name: 'Uttarakhand',
    code: 'UT',
    path: 'M195 88L218 85L228 98L215 105L195 102L195 88Z',
    centroid: [210, 95]
  },
  {
    name: 'Haryana',
    code: 'HR',
    path: 'M165 108L185 102L195 115L175 122L165 108Z',
    centroid: [178, 112]
  },
  {
    name: 'Delhi',
    code: 'DL',
    path: 'M175 122L185 118L190 125L180 130L175 122Z',
    centroid: [182, 124]
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    path: 'M110 122L175 122L185 145L175 175L155 185L125 182L105 165L95 145L110 122Z',
    centroid: [142, 152]
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    path: 'M195 115L265 118L275 135L270 155L245 165L225 162L205 155L195 135L195 115Z',
    centroid: [235, 140]
  },
  {
    name: 'Bihar',
    code: 'BR',
    path: 'M270 155L315 158L325 172L310 182L285 185L270 175L270 155Z',
    centroid: [295, 168]
  },
  {
    name: 'Sikkim',
    code: 'SK',
    path: 'M325 162L335 158L340 165L330 172L325 162Z',
    centroid: [332, 164]
  },
  {
    name: 'Arunachal Pradesh',
    code: 'AR',
    path: 'M340 145L385 148L395 165L380 175L355 172L340 162L340 145Z',
    centroid: [365, 160]
  },
  {
    name: 'Nagaland',
    code: 'NL',
    path: 'M380 175L395 172L398 182L385 188L380 175Z',
    centroid: [388, 180]
  },
  {
    name: 'Manipur',
    code: 'MN',
    path: 'M375 188L385 185L390 195L380 198L375 188Z',
    centroid: [382, 192]
  },
  {
    name: 'Mizoram',
    code: 'MZ',
    path: 'M368 198L378 195L382 205L372 208L368 198Z',
    centroid: [375, 202]
  },
  {
    name: 'Tripura',
    code: 'TR',
    path: 'M355 195L368 192L372 202L362 205L355 195Z',
    centroid: [363, 198]
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    path: 'M340 182L365 185L372 195L355 198L340 192L340 182Z',
    centroid: [355, 190]
  },
  {
    name: 'Assam',
    code: 'AS',
    path: 'M315 172L375 175L380 185L355 195L340 192L325 185L315 172Z',
    centroid: [345, 182]
  },
  {
    name: 'West Bengal',
    code: 'WB',
    path: 'M285 185L325 188L335 205L315 225L295 228L275 215L270 195L285 185Z',
    centroid: [300, 205]
  },
  {
    name: 'Jharkhand',
    code: 'JH',
    path: 'M245 185L285 188L295 205L275 218L255 215L245 202L245 185Z',
    centroid: [268, 200]
  },
  {
    name: 'Odisha',
    code: 'OR',
    path: 'M275 218L315 222L325 245L305 265L285 268L265 255L255 235L275 218Z',
    centroid: [290, 242]
  },
  {
    name: 'Chhattisgarh',
    code: 'CG',
    path: 'M225 205L275 208L285 232L265 248L245 245L225 232L225 205Z',
    centroid: [250, 225]
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    path: 'M175 175L245 178L255 205L235 225L205 228L185 212L165 195L175 175Z',
    centroid: [210, 200]
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    path: 'M95 195L155 198L165 228L145 255L115 258L85 242L75 218L95 195Z',
    centroid: [120, 225]
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    path: 'M165 232L225 235L245 265L225 295L195 305L165 295L145 272L155 252L165 232Z',
    centroid: [195, 265]
  },
  {
    name: 'Telangana',
    code: 'TG',
    path: 'M245 265L285 268L295 288L275 305L255 302L245 285L245 265Z',
    centroid: [267, 285]
  },
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    path: 'M255 302L295 305L315 332L295 365L275 368L255 348L245 325L255 302Z',
    centroid: [280, 335]
  },
  {
    name: 'Karnataka',
    code: 'KA',
    path: 'M195 305L255 308L275 338L255 372L225 385L195 378L175 352L185 328L195 305Z',
    centroid: [225, 345]
  },
  {
    name: 'Goa',
    code: 'GA',
    path: 'M165 335L185 332L190 342L175 348L165 335Z',
    centroid: [175, 340]
  },
  {
    name: 'Kerala',
    code: 'KL',
    path: 'M185 378L225 385L235 415L215 445L185 442L165 418L175 395L185 378Z',
    centroid: [200, 410]
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    path: 'M225 385L275 388L295 418L285 455L255 475L225 472L205 445L215 415L225 385Z',
    centroid: [250, 430]
  }
];

// Coordinate grid lines
const latitudeLines = [
  { y: 50, label: '35°N' },
  { y: 100, label: '30°N' },
  { y: 150, label: '25°N' },
  { y: 200, label: '20°N' },
  { y: 250, label: '15°N' },
  { y: 300, label: '10°N' },
  { y: 350, label: '8°N' }
];

const longitudeLines = [
  { x: 100, label: '70°E' },
  { x: 150, label: '75°E' },
  { x: 200, label: '80°E' },
  { x: 250, label: '85°E' },
  { x: 300, label: '90°E' },
  { x: 350, label: '95°E' }
];

export function DetailedIndiaMap({ onStateSelect, selectedState, className }: DetailedIndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getRiskColor = (stateName: string) => {
    // Demo risk levels - in real app this would come from props/API
    const riskLevels: Record<string, string> = {
      'Delhi': '#ef4444',
      'Maharashtra': '#f97316', 
      'Karnataka': '#eab308',
      'West Bengal': '#ef4444',
      'Tamil Nadu': '#f97316',
      'Gujarat': '#eab308'
    };
    
    return riskLevels[stateName] || '#10b981';
  };

  const handleStateClick = (state: StateData) => {
    onStateSelect(state.name);
  };

  return (
    <div className={cn("relative w-full h-full bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden", className)}>
      <svg
        viewBox="0 0 450 500"
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        {/* Background */}
        <rect width="450" height="500" fill="currentColor" className="text-slate-100 dark:text-slate-800" />
        
        {/* Coordinate grid lines */}
        <g className="opacity-30">
          {/* Latitude lines */}
          {latitudeLines.map(line => (
            <g key={line.y}>
              <line
                x1="50"
                y1={line.y}
                x2="400"
                y2={line.y}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="text-slate-400"
              />
              <text
                x="45"
                y={line.y + 4}
                fontSize="10"
                fill="currentColor"
                className="text-slate-500 font-mono"
                textAnchor="end"
              >
                {line.label}
              </text>
            </g>
          ))}
          
          {/* Longitude lines */}
          {longitudeLines.map(line => (
            <g key={line.x}>
              <line
                x1={line.x}
                y1="30"
                x2={line.x}
                y2="480"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="text-slate-400"
              />
              <text
                x={line.x}
                y="25"
                fontSize="10"
                fill="currentColor"
                className="text-slate-500 font-mono"
                textAnchor="middle"
              >
                {line.label}
              </text>
            </g>
          ))}
        </g>

        {/* States */}
        {indianStates.map((state) => (
          <g key={state.code}>
            {/* State shape */}
            <path
              d={state.path}
              fill={getRiskColor(state.name)}
              stroke="#ffffff"
              strokeWidth="1"
              className={cn(
                "cursor-pointer transition-all duration-200",
                selectedState === state.name && "stroke-2 drop-shadow-lg",
                hoveredState === state.name && "brightness-110 drop-shadow-md"
              )}
              onMouseEnter={() => setHoveredState(state.name)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleStateClick(state)}
              data-testid={`state-${state.code.toLowerCase()}`}
            />
            
            {/* State label */}
            <text
              x={state.centroid[0]}
              y={state.centroid[1]}
              fontSize="8"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-semibold drop-shadow-sm pointer-events-none select-none"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              {state.code}
            </text>
          </g>
        ))}

        {/* Map title */}
        <text
          x="225"
          y="485"
          fontSize="12"
          fill="currentColor"
          textAnchor="middle"
          className="text-slate-600 dark:text-slate-400 font-semibold"
        >
          Interactive Health Intelligence Map of India
        </text>
      </svg>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg border">
        <h4 className="font-semibold text-sm mb-2">Risk Levels</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Low Risk</span>
          </div>
        </div>
      </div>

      {/* State hover tooltip */}
      {hoveredState && (
        <div className="absolute bottom-4 left-4 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium">
          {hoveredState}
          <div className="text-xs text-slate-300 mt-1">Click for AI health insights</div>
        </div>
      )}
    </div>
  );
}