import { type User, type InsertUser, type HealthPrediction, type Disease } from "@shared/schema";
import { randomUUID } from "crypto";
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { aiHealthService } from './ai-service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getHealthPrediction(region: string, month: string): Promise<HealthPrediction | null>;
  getAIHealthPrediction(region: string, month: string): Promise<HealthPrediction | null>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private healthData: any[] = [];

  constructor() {
    this.users = new Map();
    this.loadHealthData();
  }

  private loadHealthData() {
    try {
      const csvPath = path.join(__dirname, 'health_data.csv');
      const csvData = fs.readFileSync(csvPath, 'utf8');
      const lines = csvData.trim().split('\n');
      const headers = lines[0].split(',');
      
      this.healthData = lines.slice(1).map(line => {
        // Handle CSV with quoted fields containing commas
        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        const values = line.split(regex);
        const record: any = {};
        headers.forEach((header, index) => {
          let value = values[index]?.trim() || '';
          // Remove surrounding quotes if present
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          record[header.trim()] = value;
        });
        return record;
      });
      
      console.log(`✅ Loaded ${this.healthData.length} health records from CSV`);
    } catch (error) {
      console.error('Error loading health data CSV:', error);
      this.healthData = [];
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getHealthPrediction(region: string, month: string): Promise<HealthPrediction | null> {
    // Use CSV data directly for faster response
    // AI features are available through the chatbot
    const filteredData = this.healthData.filter(
      record => 
        record.region?.toLowerCase() === region.toLowerCase() && 
        record.month?.toLowerCase() === month.toLowerCase()
    );

    if (filteredData.length === 0) {
      return null;
    }

    // Group diseases for the region/month
    const diseaseMap = new Map<string, Disease>();
    
    filteredData.forEach(record => {
      const diseaseName = record.disease_name;
      if (!diseaseMap.has(diseaseName)) {
        const symptoms = record.symptoms ? record.symptoms.split(',').map((s: string) => s.trim()) : [];
        const precautions = record.precautions ? record.precautions.split(',').map((p: string) => p.trim()) : [];
        
        diseaseMap.set(diseaseName, {
          name: diseaseName,
          riskLevel: record.risk_level as "High" | "Medium" | "Low",
          caseCount: parseInt(record.case_count) || 0,
          symptoms,
          precautions,
        });
      }
    });

    return {
      region,
      month,
      diseases: Array.from(diseaseMap.values()),
    };
  }

  async getAIHealthPrediction(region: string, month: string): Promise<HealthPrediction | null> {
    try {
      return await aiHealthService.getHealthData(region, month);
    } catch (error) {
      console.error('Error getting AI health prediction:', error);
      return null;
    }
  }
}

export const storage = new MemStorage();
