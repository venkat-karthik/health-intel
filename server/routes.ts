import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { predictionRequestSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
