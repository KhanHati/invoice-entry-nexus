
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingCart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Purchase Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your purchase processes with our comprehensive invoice entry and management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Invoice Entry</CardTitle>
              <CardDescription>
                Complete invoice processing with automatic calculations and validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Purchase order management</li>
                <li>• Automatic tax calculations</li>
                <li>• Product entry with batch tracking</li>
                <li>• Real-time validation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Vendor Management</CardTitle>
              <CardDescription>
                Comprehensive vendor and brand management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Multiple vendor support</li>
                <li>• Brand categorization</li>
                <li>• Payment terms tracking</li>
                <li>• Purchase history</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Financial Tracking</CardTitle>
              <CardDescription>
                Advanced financial calculations and reporting features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• VAT & TAX calculations</li>
                <li>• Discount distribution</li>
                <li>• TDS & VDS tracking</li>
                <li>• Payment reconciliation</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/purchase-invoice">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Purchase Invoice Entry
            </Button>
          </Link>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Automated Calculations</h3>
              <p className="text-gray-600 text-sm">
                The system automatically calculates Total TP, TAX (5%), TDS & VDS, and final payable amounts based on your inputs.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Real-time Validation</h3>
              <p className="text-gray-600 text-sm">
                Built-in validation ensures that your input values match with calculated product totals before processing.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Product Management</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive product entry with variant tracking, batch management, and expiry date monitoring.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Flexible Bill Types</h3>
              <p className="text-gray-600 text-sm">
                Support for multiple bill types including various tax and VAT inclusion/exclusion scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
