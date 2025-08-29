"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, User, Shield } from "lucide-react";

interface DemoAccount {
  type: string;
  email: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    type: "Admin",
    email: "admin@demo.com",
    description: "Full admin panel access",
    features: [
      "View all orders and customers",
      "Manage products and inventory", 
      "Access admin dashboard",
      "User management capabilities"
    ],
    icon: <Shield className="w-5 h-5" />
  },
  {
    type: "Customer",
    email: "customer@demo.com", 
    description: "Regular customer account",
    features: [
      "View personal order history ($2,309.95 in orders)",
      "Manage wishlist and cart",
      "Make purchases",
      "Account management"
    ],
    icon: <User className="w-5 h-5" />
  }
];

export default function DemoCredentials() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          size="sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          Demo Accounts
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-xl border border-gray-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              🚀 Demo Accounts
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription className="text-sm">
            Login with these pre-configured accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {DEMO_ACCOUNTS.map((account) => (
            <div key={account.type} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                {account.icon}
                <h3 className="font-semibold text-sm">{account.type} Account</h3>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-white px-2 py-1 rounded text-xs font-mono border">
                  {account.email}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(account.email)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                {copiedEmail === account.email && (
                  <span className="text-xs text-green-600 font-medium">Copied!</span>
                )}
              </div>
              
              <p className="text-xs text-gray-600 mb-2">{account.description}</p>
              
              <ul className="text-xs text-gray-500 space-y-1">
                {account.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-green-500 mt-0.5">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> These accounts are pre-configured in Clerk with passwords. 
              No sign-up required!
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-800">
              <strong>Quick Start:</strong> Click "Sign In" and use these email addresses. 
              Passwords are already set up in the authentication system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
