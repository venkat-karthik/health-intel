import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, AlertTriangle, Users, Activity, Shield, Eye, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Cell } from 'recharts';

export default function Home() {
  // Fetch real-time statistics
  const { data: regions } = useQuery({
    queryKey: ['/api/regions'],
    queryFn: async () => {
      const response = await fetch('/api/regions');
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const totalRegions = regions?.length || 10;
  const currentTime = new Date().toLocaleString();
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Health Surveillance Dashboard</h2>
              <p className="text-muted-foreground mt-2">Real-time health intelligence and predictive analytics</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Last updated: {currentTime}
              </div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-accent font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Regions Monitored</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRegions}</div>
              <p className="text-xs text-muted-foreground">States monitored</p>
              <div className="mt-2">
                <Progress value={85} className="h-1" />
                <p className="text-xs text-muted-foreground mt-1">85% coverage</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Predictions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">Disease forecasts</p>
              <div className="mt-2">
                <Progress value={92} className="h-1" />
                <p className="text-xs text-muted-foreground mt-1">92% accuracy</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">12</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
              <div className="mt-2">
                <Progress value={30} className="h-1" />
                <p className="text-xs text-destructive mt-1">Critical level</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Population Coverage</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.4B</div>
              <p className="text-xs text-muted-foreground">Citizens protected</p>
              <div className="mt-2">
                <Progress value={98} className="h-1" />
                <p className="text-xs text-accent mt-1">98% protected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Disease Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Disease Trends (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 'Mon', cases: 850, alerts: 3 },
                    { day: 'Tue', cases: 920, alerts: 4 },
                    { day: 'Wed', cases: 780, alerts: 2 },
                    { day: 'Thu', cases: 1100, alerts: 5 },
                    { day: 'Fri', cases: 1250, alerts: 7 },
                    { day: 'Sat', cases: 980, alerts: 4 },
                    { day: 'Sun', cases: 1150, alerts: 6 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cases" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="alerts" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Current Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <PieChart data={[
                      { name: 'High Risk', value: 35, fill: '#dc2626' },
                      { name: 'Medium Risk', value: 45, fill: '#d97706' },
                      { name: 'Low Risk', value: 20, fill: '#059669' }
                    ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                      <Cell fill="#dc2626" />
                      <Cell fill="#d97706" />
                      <Cell fill="#059669" />
                    </PieChart>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Cases Today</p>
                  <p className="text-lg font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="text-lg font-bold">2.3h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Weekly Growth</p>
                  <p className="text-lg font-bold">+12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Prevention Rate</p>
                  <p className="text-lg font-bold">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Interactive Health Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Explore real-time health data across Indian states with our 3D interactive map. 
                Click on any region to view detailed health predictions and risk assessments.
              </p>
              <Link href="/map">
                <Button className="w-full" data-testid="button-open-map">
                  Open Predictive Map
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                <span>Report Health Issue</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Spotted unusual health patterns in your region? Report incidents to help 
                improve our predictive models and protect public health.
              </p>
              <Link href="/report">
                <Button variant="outline" className="w-full" data-testid="button-report-issue">
                  Report an Issue
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
