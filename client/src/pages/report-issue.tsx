import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, MapPin, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    reporterName: "",
    region: "",
    issueType: "",
    description: "",
    urgency: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report Submitted",
        description: "Your health issue report has been submitted successfully. Our team will review it shortly.",
      });
      setIsSubmitting(false);
      setFormData({
        reporterName: "",
        region: "",
        issueType: "",
        description: "",
        urgency: "",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-accent" />
            <div>
              <h2 className="text-3xl font-bold text-foreground">Report Health Issue</h2>
              <p className="text-muted-foreground mt-1">Help us improve public health by reporting incidents in your area</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Issue Report Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Reporter Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reporterName">Reporter Name</Label>
                      <Input
                        id="reporterName"
                        value={formData.reporterName}
                        onChange={(e) => handleInputChange("reporterName", e.target.value)}
                        placeholder="Your full name"
                        required
                        data-testid="input-reporter-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region/State</Label>
                      <Select onValueChange={(value) => handleInputChange("region", value)} required>
                        <SelectTrigger data-testid="select-region">
                          <SelectValue placeholder="Select your region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="west-bengal">West Bengal</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Issue Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issueType">Issue Type</Label>
                      <Select onValueChange={(value) => handleInputChange("issueType", value)} required>
                        <SelectTrigger data-testid="select-issue-type">
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disease-outbreak">Disease Outbreak</SelectItem>
                          <SelectItem value="unusual-symptoms">Unusual Symptoms</SelectItem>
                          <SelectItem value="environmental-hazard">Environmental Hazard</SelectItem>
                          <SelectItem value="water-contamination">Water Contamination</SelectItem>
                          <SelectItem value="food-poisoning">Food Poisoning</SelectItem>
                          <SelectItem value="vector-infestation">Vector Infestation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select onValueChange={(value) => handleInputChange("urgency", value)} required>
                        <SelectTrigger data-testid="select-urgency">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High - Immediate attention required</SelectItem>
                          <SelectItem value="medium">Medium - Within 24 hours</SelectItem>
                          <SelectItem value="low">Low - Within a week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Provide detailed information about the health issue, including symptoms, affected population, location details, and any other relevant information..."
                      rows={6}
                      required
                      data-testid="textarea-description"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                    data-testid="button-submit-report"
                  >
                    {isSubmitting ? "Submitting Report..." : "Submit Health Issue Report"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <span>Important Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">What to Report</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Unusual disease patterns</li>
                    <li>• Multiple cases in the same area</li>
                    <li>• Environmental health hazards</li>
                    <li>• Water or food contamination</li>
                    <li>• Vector-borne disease signs</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Response Time</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High urgency: Within 2 hours</li>
                    <li>• Medium urgency: Within 24 hours</li>
                    <li>• Low urgency: Within 1 week</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Emergency Hotline</p>
                  <p className="text-muted-foreground">1075 (Toll Free)</p>
                </div>
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-muted-foreground">health.emergency@gov.in</p>
                </div>
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-muted-foreground">Available for critical issues</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
