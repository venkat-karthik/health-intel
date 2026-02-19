import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { predictionRequestSchema } from "@shared/schema";
import { aiHealthService } from "./ai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health prediction endpoint
  app.post("/api/predict", async (req, res) => {
    try {
      const { region, month } = predictionRequestSchema.parse(req.body);
      
      const prediction = await storage.getHealthPrediction(region, month);
      
      if (!prediction) {
        return res.status(404).json({ 
          error: "No health data found for the specified region and month",
          region,
          month 
        });
      }
      
      res.json(prediction);
    } catch (error) {
      console.error("Error in /api/predict:", error);
      res.status(400).json({ 
        error: "Invalid request data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get available regions
  app.get("/api/regions", async (req, res) => {
    // Return list of available regions for the map
    const regions = [
      "Delhi", "Maharashtra", "Karnataka", "West Bengal", "Rajasthan",
      "Tamil Nadu", "Gujarat", "Uttar Pradesh", "Punjab", "Kerala"
    ];
    res.json(regions);
  });

  // AI-powered disease insights endpoint
  app.post("/api/ai-insights", async (req, res) => {
    try {
      const { diseaseName } = req.body;
      
      if (!diseaseName || typeof diseaseName !== 'string') {
        return res.status(400).json({ 
          error: "Disease name is required"
        });
      }
      
      const insights = await aiHealthService.generateDiseaseInsights(diseaseName);
      
      if (!insights) {
        return res.status(404).json({ 
          error: "Could not generate insights for the specified disease"
        });
      }
      
      res.json({
        disease: diseaseName,
        ...insights,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error in /api/ai-insights:", error);
      res.status(500).json({ 
        error: "Failed to generate AI insights",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // AI chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, selectedState } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          error: "Message is required"
        });
      }
      
      const response = await aiHealthService.chatQuery(message, selectedState);
      
      res.json({
        response,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ 
        error: "Failed to process chat message",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health data refresh endpoint (triggers AI data collection)
  app.post("/api/refresh-data", async (req, res) => {
    try {
      const { region, month } = predictionRequestSchema.parse(req.body);
      
      // Force AI data collection
      const aiData = await storage.getAIHealthPrediction(region, month);
      
      if (!aiData) {
        return res.status(404).json({ 
          error: "Could not collect AI health data for the specified region",
          region,
          month 
        });
      }
      
      res.json({
        ...aiData,
        dataSource: 'AI-powered',
        refreshedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error in /api/refresh-data:", error);
      res.status(500).json({ 
        error: "Failed to refresh health data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
