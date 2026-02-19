import { type HealthPrediction, type Disease } from "@shared/schema";

export interface AIHealthService {
  getHealthData(region: string, month: string): Promise<HealthPrediction | null>;
  generateDiseaseInsights(diseaseName: string): Promise<{
    symptoms: string[];
    precautions: string[];
    transmissionRate: number;
    riskLevel: 'High' | 'Medium' | 'Low';
    caseCount: number;
  } | null>;
  chatQuery(message: string, selectedState?: string | null): Promise<string>;
}

export class PerplexityHealthService implements AIHealthService {
  private apiKey: string;
  private baseUrl = 'https://api.perplexity.ai/chat/completions';

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY || '';
    if (!this.apiKey) {
      console.warn('PERPLEXITY_API_KEY not found. AI features will be limited.');
    }
  }

  private async queryPerplexity(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Perplexity API key not configured');
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Perplexity API error response:', errorText);
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error querying Perplexity:', error);
      throw error;
    }
  }

  async generateDiseaseInsights(diseaseName: string) {
    const prompt = `
    Provide current health information for ${diseaseName} in India. Include:
    1. Common symptoms (list 4-6 key symptoms)
    2. Prevention measures (list 4-6 precautions)  
    3. Current transmission rate percentage (0-100)
    4. Risk level (High/Medium/Low based on current outbreak data)
    5. Estimated current case count in India

    Format as JSON:
    {
      "symptoms": ["symptom1", "symptom2", ...],
      "precautions": ["precaution1", "precaution2", ...],
      "transmissionRate": number,
      "riskLevel": "High|Medium|Low", 
      "caseCount": number
    }
    `;

    try {
      const response = await this.queryPerplexity(prompt);
      
      // Try to parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        return {
          symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],
          precautions: Array.isArray(data.precautions) ? data.precautions : [],
          transmissionRate: typeof data.transmissionRate === 'number' ? data.transmissionRate : 50,
          riskLevel: ['High', 'Medium', 'Low'].includes(data.riskLevel) ? data.riskLevel : 'Medium',
          caseCount: typeof data.caseCount === 'number' ? data.caseCount : 1000
        };
      }
      
      // Fallback parsing if JSON structure isn't perfect
      return this.parseHealthDataFromText(response, diseaseName);
    } catch (error) {
      console.error('Error generating disease insights:', error);
      return null;
    }
  }

  private parseHealthDataFromText(text: string, diseaseName: string) {
    // Extract information using text parsing as fallback
    const symptoms: string[] = [];
    const precautions: string[] = [];
    
    // Simple text parsing without complex regex
    const lines = text.toLowerCase().split('\n');
    let inSymptomsSection = false;
    let inPrecautionsSection = false;
    
    for (const line of lines) {
      if (line.includes('symptom')) {
        inSymptomsSection = true;
        inPrecautionsSection = false;
      } else if (line.includes('prevention') || line.includes('precaution')) {
        inSymptomsSection = false;
        inPrecautionsSection = true;
      } else if (line.includes('transmission') || line.includes('risk')) {
        inSymptomsSection = false;
        inPrecautionsSection = false;
      }
      
      if (inSymptomsSection && line.trim().length > 5) {
        const clean = line.replace(/[•\-\d\.\s]+/, '').trim();
        if (clean.length > 3 && !clean.includes('symptom')) {
          symptoms.push(clean);
        }
      } else if (inPrecautionsSection && line.trim().length > 5) {
        const clean = line.replace(/[•\-\d\.\s]+/, '').trim();
        if (clean.length > 3 && !clean.includes('prevention') && !clean.includes('precaution')) {
          precautions.push(clean);
        }
      }
    }

    // Determine risk level based on disease name and text content
    let riskLevel: 'High' | 'Medium' | 'Low' = 'Medium';
    if (text.toLowerCase().includes('high risk') || text.toLowerCase().includes('outbreak') || 
        diseaseName.toLowerCase().includes('dengue') || diseaseName.toLowerCase().includes('malaria')) {
      riskLevel = 'High';
    } else if (text.toLowerCase().includes('low risk') || text.toLowerCase().includes('seasonal')) {
      riskLevel = 'Low';
    }

    // Extract numbers for case count and transmission
    const numbers = text.match(/\d+/g);
    const caseCount = numbers ? parseInt(numbers.find(n => parseInt(n) > 100) || '1000') : 1000;
    const transmissionRate = numbers ? parseInt(numbers.find(n => parseInt(n) <= 100) || '50') : 50;

    return {
      symptoms: symptoms.slice(0, 6),
      precautions: precautions.slice(0, 6),
      transmissionRate,
      riskLevel,
      caseCount
    };
  }

  async getHealthData(region: string, month: string): Promise<HealthPrediction | null> {
    const prompt = `
    Get current disease outbreak information for ${region}, India in ${month} 2024. 
    Focus on the top 3-4 most prevalent diseases currently affecting this region.
    
    For each disease, provide:
    - Disease name
    - Current case numbers
    - Risk level (High/Medium/Low)
    - Key symptoms
    - Prevention measures
    
    Format as JSON array of diseases.
    `;

    try {
      const response = await this.queryPerplexity(prompt);
      
      // Parse common diseases for the region
      const commonDiseases = this.getCommonDiseasesForRegion(region);
      const diseases: Disease[] = [];

      for (const diseaseName of commonDiseases) {
        const insights = await this.generateDiseaseInsights(diseaseName);
        if (insights) {
          diseases.push({
            name: diseaseName,
            riskLevel: insights.riskLevel,
            caseCount: insights.caseCount,
            symptoms: insights.symptoms,
            precautions: insights.precautions
          });
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (diseases.length === 0) {
        return null;
      }

      return {
        region,
        month,
        diseases
      };
    } catch (error) {
      console.error('Error getting health data:', error);
      return null;
    }
  }

  private getCommonDiseasesForRegion(region: string): string[] {
    // Define region-specific common diseases
    const regionDiseases: Record<string, string[]> = {
      'Delhi': ['Air Pollution Related Respiratory Issues', 'Dengue Fever', 'Seasonal Influenza', 'Chikungunya'],
      'Maharashtra': ['Dengue Fever', 'Malaria', 'Seasonal Influenza', 'Leptospirosis'],
      'Karnataka': ['Chikungunya', 'Typhoid', 'Seasonal Influenza', 'Japanese Encephalitis'],
      'West Bengal': ['Dengue Fever', 'Japanese Encephalitis', 'Malaria', 'Kala-azar'],
      'Rajasthan': ['Heat-related Illness', 'Seasonal Influenza', 'Chikungunya', 'Scrub Typhus'],
      'Tamil Nadu': ['Dengue Fever', 'Chikungunya', 'Typhoid', 'Japanese Encephalitis'],
      'Gujarat': ['Malaria', 'Dengue Fever', 'Seasonal Influenza', 'Chikungunya'],
      'Uttar Pradesh': ['Japanese Encephalitis', 'Dengue Fever', 'Typhoid', 'Seasonal Influenza']
    };

    return regionDiseases[region] || ['Dengue Fever', 'Seasonal Influenza', 'Malaria', 'Typhoid'];
  }

  async chatQuery(message: string, selectedState?: string | null): Promise<string> {
    if (!this.apiKey) {
      return "I'm currently unable to access real-time health data. Please check that the Perplexity API key is configured.";
    }

    const contextPrompt = selectedState 
      ? `The user is asking about health information for ${selectedState}, India. `
      : 'The user is asking about health information in India. ';

    const prompt = contextPrompt + `User question: ${message}

Please provide accurate, helpful health information based on current medical knowledge and data. 
Focus on:
- Disease information and symptoms
- Prevention and precautions
- Current health trends in India
- Risk assessments
- Actionable health advice

Keep the response concise, informative, and formatted with clear sections using markdown.`;

    try {
      const response = await this.queryPerplexity(prompt);
      return response || "I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error('Error in chat query:', error);
      return "I'm having trouble accessing health data right now. Please try again in a moment.";
    }
  }
}

export const aiHealthService = new PerplexityHealthService();