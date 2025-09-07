import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Download, Bell, RefreshCw, AlertCircle } from "lucide-react";
import { type HealthPrediction, type Disease } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface HealthSnapshotProps {
  data: HealthPrediction | null;
  isLoading: boolean;
  error: Error | null;
  selectedState: string | null;
}

function DiseaseCard({ disease }: { disease: Disease }) {
  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "high":
        return "bg-destructive hover:bg-destructive/90";
      case "medium":
        return "bg-orange-500 hover:bg-orange-500/90";
      case "low":
        return "bg-accent hover:bg-accent/90";
      default:
        return "bg-muted hover:bg-muted/90";
    }
  };

  return (
    <Card className="shadow-sm" data-testid={`card-disease-${disease.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-foreground" data-testid={`text-disease-name-${disease.name.toLowerCase().replace(/\s+/g, '-')}`}>
              {disease.name}
            </h4>
            <p className="text-sm text-muted-foreground" data-testid={`text-case-count-${disease.name.toLowerCase().replace(/\s+/g, '-')}`}>
              Predicted cases: {disease.caseCount.toLocaleString()}
            </p>
          </div>
          <Badge 
            className={`text-white text-xs font-medium ${getRiskBadgeClass(disease.riskLevel)}`}
            data-testid={`badge-risk-${disease.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {disease.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Symptoms</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              {disease.symptoms.map((symptom, index) => (
                <li 
                  key={index} 
                  className="flex items-start space-x-2"
                  data-testid={`symptom-${disease.name.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                >
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Precautions</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              {disease.precautions.map((precaution, index) => (
                <li 
                  key={index} 
                  className="flex items-start space-x-2"
                  data-testid={`precaution-${disease.name.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                >
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>{precaution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HealthSnapshot({ data, isLoading, error, selectedState }: HealthSnapshotProps) {
  const { toast } = useToast();

  const handleExportReport = () => {
    if (!data) return;
    
    // Create CSV content
    const csvContent = [
      ['Disease Name', 'Risk Level', 'Case Count', 'Symptoms', 'Precautions'],
      ...data.diseases.map(disease => [
        disease.name,
        disease.riskLevel,
        disease.caseCount.toString(),
        disease.symptoms.join('; '),
        disease.precautions.join('; ')
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-report-${data.region}-${data.month}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: `Health report for ${data.region} has been downloaded successfully.`,
    });
  };

  const handleSetAlert = () => {
    if (!data) return;
    
    toast({
      title: "Alert Set",
      description: `You'll be notified of health updates for ${data.region}. Check your notifications for real-time alerts.`,
    });
    
    // In a real app, this would set up push notifications or email alerts
    console.log(`Setting up alerts for ${data.region}`);
  };
  // Loading State
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-foreground mb-2">Loading Health Data</h3>
          <p className="text-muted-foreground text-sm">
            Fetching latest health predictions for {selectedState}...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Error Loading Data</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {error.message || "Unable to fetch health data for the selected region"}
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.reload()}
            data-testid="button-retry-loading"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Default State (No selection)
  if (!data) {
    return (
      <div className="p-6">
        <div className="text-center py-12" data-testid="default-state">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-muted-foreground text-xl" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Select a State</h3>
          <p className="text-muted-foreground text-sm">
            Click on any state on the map to view its health forecast and disease predictions.
          </p>
        </div>
      </div>
    );
  }

  // Data View
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 
            className="text-xl font-semibold text-foreground"
            data-testid="text-selected-region"
          >
            Health Snapshot for {data.region}
          </h3>
          <p 
            className="text-sm text-muted-foreground"
            data-testid="text-current-month"
          >
            {data.month} 2024 Forecast
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          data-testid="button-refresh-data"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Disease Predictions */}
      <div className="space-y-4 mb-6">
        {data.diseases.map((disease, index) => (
          <DiseaseCard key={index} disease={disease} />
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          className="flex-1"
          onClick={handleExportReport}
          data-testid="button-export-report"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
        <Button 
          variant="secondary" 
          className="flex-1"
          onClick={handleSetAlert}
          data-testid="button-set-alert"
        >
          <Bell className="w-4 h-4 mr-2" />
          Set Alert
        </Button>
      </div>
    </div>
  );
}
