
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ProductEntry from '@/components/ProductEntry';
import ProductSummaryTable from '@/components/ProductSummaryTable';
import PurchaseSummary from '@/components/PurchaseSummary';

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

const PurchaseInvoice = () => {
  const [formData, setFormData] = useState({
    purchaseType: '',
    purchaseOrder: '',
    brand: '',
    vendor: '',
    billType: '',
    invoiceAmount: 0,
    totalVAT: 0,
    totalDiscount: 0,
    paymentMethod: '',
    paymentTerms: '',
    note: ''
  });

  const [products, setProducts] = useState<Product[]>([]);

  // Calculate derived values based on bill type
  const totalTP = formData.invoiceAmount - formData.totalVAT;
  const totalTAX = totalTP * 0.05;
  const payableToVendor = (totalTP - totalTAX) - formData.totalDiscount;
  const totalTDSVDS = formData.totalVAT + totalTAX;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addProduct = (product: Omit<Product, 'id' | 'discount' | 'totalPurchasePrice' | 'payableToVendor'>) => {
    const discount = products.length > 0 ? formData.totalDiscount / (products.length + 1) : formData.totalDiscount;
    
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      discount,
      totalPurchasePrice: ((product.tpPrice - product.tax) - discount) + product.tax + product.vat,
      payableToVendor: (product.tpPrice - product.tax) - discount
    };

    // Redistribute discount across all products
    const updatedProducts = products.map(p => ({
      ...p,
      discount: formData.totalDiscount / (products.length + 1),
      totalPurchasePrice: ((p.tpPrice - p.tax) - (formData.totalDiscount / (products.length + 1))) + p.tax + p.vat,
      payableToVendor: (p.tpPrice - p.tax) - (formData.totalDiscount / (products.length + 1))
    }));

    setProducts([...updatedProducts, newProduct]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Purchase Invoice Entry</h1>
        
        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseType">Purchase Type</Label>
                <Select value={formData.purchaseType} onValueChange={(value) => handleInputChange('purchaseType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="official-local">Official Local</SelectItem>
                    <SelectItem value="official-import">Official Import</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseOrder">Purchase Order</Label>
                <Select value={formData.purchaseOrder} onValueChange={(value) => handleInputChange('purchaseOrder', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select PO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PO001">PO001</SelectItem>
                    <SelectItem value="PO002">PO002</SelectItem>
                    <SelectItem value="PO003">PO003</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select value={formData.brand} onValueChange={(value) => handleInputChange('brand', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="test1">Test 1</SelectItem>
                    <SelectItem value="test2">Test 2</SelectItem>
                    <SelectItem value="cerave">Cerave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Select value={formData.vendor} onValueChange={(value) => handleInputChange('vendor', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="test11">Test 11</SelectItem>
                    <SelectItem value="test12">Test 12</SelectItem>
                    <SelectItem value="vendor1">Vendor 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billType">Bill Type</Label>
                <Select value={formData.billType} onValueChange={(value) => handleInputChange('billType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bill type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="including-tax-vat">Including Tax & VAT</SelectItem>
                    <SelectItem value="excluding-tax-vat">Excluding Tax & VAT</SelectItem>
                    <SelectItem value="including-tax-excluding-vat">Including Tax & Excluding VAT</SelectItem>
                    <SelectItem value="excluding-tax-including-vat">Excluding Tax & Including VAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Financial Details - Show when bill type is selected */}
            {formData.billType === 'including-tax-vat' && (
              <div className="space-y-4 border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceAmount">Bill Amount</Label>
                    <Input
                      type="number"
                      value={formData.invoiceAmount}
                      onChange={(e) => handleInputChange('invoiceAmount', parseFloat(e.target.value) || 0)}
                      placeholder="Enter bill amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalVAT">Total VAT</Label>
                    <Input
                      type="number"
                      value={formData.totalVAT}
                      onChange={(e) => handleInputChange('totalVAT', parseFloat(e.target.value) || 0)}
                      placeholder="Enter total VAT"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalTP">Total TP</Label>
                    <Input
                      type="number"
                      value={totalTP}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalTAX">Total TAX</Label>
                    <Input
                      type="number"
                      value={totalTAX.toFixed(2)}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalDiscount">Total Discount</Label>
                    <Input
                      type="number"
                      value={formData.totalDiscount}
                      onChange={(e) => handleInputChange('totalDiscount', parseFloat(e.target.value) || 0)}
                      placeholder="Enter discount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payableToVendor">Payable to Vendor</Label>
                    <Input
                      type="number"
                      value={payableToVendor.toFixed(2)}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalTDSVDS">Total TDS & VDS</Label>
                    <Input
                      type="number"
                      value={totalTDSVDS.toFixed(2)}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="credit">Credit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange('paymentTerms', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="net-30">Net 30</SelectItem>
                        <SelectItem value="net-60">Net 60</SelectItem>
                        <SelectItem value="net-90">Net 90</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Note</Label>
                    <Textarea
                      value={formData.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      placeholder="Enter notes"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Entry Section - Always visible when bill type is selected */}
        {formData.billType === 'including-tax-vat' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Product Entry</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductEntry onAdd={addProduct} />
              </CardContent>
            </Card>

            {/* Product Summary Table */}
            {products.length > 0 && (
              <>
                <ProductSummaryTable products={products} />
                <PurchaseSummary 
                  formData={formData}
                  products={products}
                  calculatedValues={{
                    totalTP,
                    totalTAX,
                    payableToVendor,
                    totalTDSVDS
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseInvoice;
