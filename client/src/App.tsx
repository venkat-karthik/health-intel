import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import Home from "@/pages/home";
import PredictiveMap from "@/pages/predictive-map";
import ReportIssue from "@/pages/report-issue";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/map" component={PredictiveMap} />
          <Route path="/report" component={ReportIssue} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="bg-card border-t border-border px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>API Status: <span className="text-accent">Connected</span></span>
            <span>Data Sync: <span>Live</span></span>
          </div>
          <div className="flex items-center space-x-4">
            <span>© 2024 Ministry of Health & Family Welfare</span>
            <span>v2.1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
