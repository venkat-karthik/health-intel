import { Link, useLocation } from "wouter";
import { Bell, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/map", label: "Predictive Map" },
    { path: "/report", label: "Report Issue" },
  ];

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="text-primary-foreground w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Health Intelligence Platform</h1>
              <p className="text-xs text-muted-foreground">Ministry of Health & Family Welfare</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a 
                  className={`transition-colors ${
                    location === item.path 
                      ? "text-primary font-medium border-b-2 border-primary pb-4 -mb-px" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              data-testid="button-notifications"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
