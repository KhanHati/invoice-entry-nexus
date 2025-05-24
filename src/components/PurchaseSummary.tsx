
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  variant: string;
  strength: string;
  qty: number;
  totalQty: string;
  tpPrice: number;
  vat: number;
  tax: number;
  discount: number;
  totalPurchasePrice: number;
  payableToVendor: number;
}

interface PurchaseSummaryProps {
  formData: {
    billAmount: number;
    totalVAT: number;
    totalDiscount: number;
  };
  products: Product[];
  calculatedValues: {
    totalTP: number;
    totalTAX: number;
    payableToVendor: number;
    totalTDSVDS: number;
  };
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ 
  formData, 
  products, 
  calculatedValues 
}) => {
  // Calculate totals from products table
  const tableVATTotal = products.reduce((sum, product) => sum + product.vat, 0);
  const tableTAXTotal = products.reduce((sum, product) => sum + product.tax, 0);
  const tableDiscountTotal = products.reduce((sum, product) => sum + product.discount, 0);
  const tablePayableTotal = products.reduce((sum, product) => sum + product.payableToVendor, 0);

  // Validation checks
  const vatMatches = Math.abs(formData.totalVAT - tableVATTotal) < 0.01;
  const taxMatches = Math.abs(calculatedValues.totalTAX - tableTAXTotal) < 0.01;
  const discountMatches = Math.abs(formData.totalDiscount - tableDiscountTotal) < 0.01;
  const payableMatches = Math.abs(calculatedValues.payableToVendor - tablePayableTotal) < 0.01;

  const ValidationRow = ({ 
    label, 
    inputValue, 
    tableValue, 
    matches 
  }: { 
    label: string; 
    inputValue: number; 
    tableValue: number; 
    matches: boolean;
  }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-2">
        {matches ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
        <span className="font-medium">{label}</span>
      </div>
      <div className="text-right">
        {matches ? (
          <span className="text-green-600 font-medium">
            {inputValue.toFixed(2)}
          </span>
        ) : (
          <div className="text-sm">
            <div className="text-red-600">Input: {inputValue.toFixed(2)}</div>
            <div className="text-blue-600">Table: {tableValue.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Input Values</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Bill Amount:</span>
                <span className="font-medium">{formData.billAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Total VAT:</span>
                <span className="font-medium">{formData.totalVAT.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Total TAX:</span>
                <span className="font-medium">{calculatedValues.totalTAX.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Total Discount:</span>
                <span className="font-medium">{formData.totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Payable to Vendor:</span>
                <span className="font-medium">{calculatedValues.payableToVendor.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Validation</h3>
            <div className="space-y-2">
              <ValidationRow
                label="Total VAT"
                inputValue={formData.totalVAT}
                tableValue={tableVATTotal}
                matches={vatMatches}
              />
              
              <ValidationRow
                label="Total TAX"
                inputValue={calculatedValues.totalTAX}
                tableValue={tableTAXTotal}
                matches={taxMatches}
              />
              
              <ValidationRow
                label="Total Discount"
                inputValue={formData.totalDiscount}
                tableValue={tableDiscountTotal}
                matches={discountMatches}
              />
              
              <ValidationRow
                label="Payable to Vendor"
                inputValue={calculatedValues.payableToVendor}
                tableValue={tablePayableTotal}
                matches={payableMatches}
              />
            </div>
          </div>
        </div>

        {(!vatMatches || !taxMatches || !discountMatches || !payableMatches) && (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Some values don't match between your input and the product table calculations. 
              Please review the product entries or input values.
            </AlertDescription>
          </Alert>
        )}

        {(vatMatches && taxMatches && discountMatches && payableMatches) && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              All values match! The invoice is ready for processing.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseSummary;
