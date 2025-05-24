
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProductEntryProps {
  onAdd: (product: {
    name: string;
    variant: string;
    strength: string;
    qty: number;
    totalQty: string;
    tpPrice: number;
    vat: number;
    tax: number;
  }) => void;
}

const ProductEntry: React.FC<ProductEntryProps> = ({ onAdd }) => {
  const initialProductData = {
    product: '',
    variant: '',
    qty: 0,
    unit: '',
    unitPrice: 0,
    vat: 0,
    endMonth: '',
    endYear: '',
    multiplier: '1',
    batch: 'AUTO-BATCH-001'
  };

  const [productData, setProductData] = useState(initialProductData);

  const tpPrice = productData.qty * productData.unitPrice;
  const tax = tpPrice * 0.05;

  const handleInputChange = (field: string, value: any) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    if (!productData.product || productData.qty <= 0 || productData.unitPrice <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    onAdd({
      name: productData.product,
      variant: productData.variant || 'Single Variant',
      strength: getProductStrength(productData.product),
      qty: productData.qty,
      totalQty: `${productData.qty}*${productData.multiplier}'s pack`,
      tpPrice,
      vat: productData.vat,
      tax
    });

    // Reset form after adding
    setProductData(initialProductData);
  };

  const getProductStrength = (productName: string) => {
    const strengthMap: { [key: string]: string } = {
      'cerave': '355ml',
      'product2': '250mg',
      'product3': '10mg/ml'
    };
    return strengthMap[productName.toLowerCase()] || '1 unit';
  };

  return (
    <Card className="border-2 border-blue-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Product *</Label>
            <Select value={productData.product} onValueChange={(value) => handleInputChange('product', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cerave">Cerave</SelectItem>
                <SelectItem value="product2">Product 2</SelectItem>
                <SelectItem value="product3">Product 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Variant</Label>
            <Input
              value={productData.variant || 'Single Variant'}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label>Qty *</Label>
            <Input
              type="number"
              value={productData.qty}
              onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0)}
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <Label>Unit</Label>
            <Select value={productData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pcs">Pieces</SelectItem>
                <SelectItem value="box">Box</SelectItem>
                <SelectItem value="pack">Pack</SelectItem>
                <SelectItem value="bottle">Bottle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Unit Price *</Label>
            <Input
              type="number"
              step="0.01"
              value={productData.unitPrice}
              onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
              placeholder="Enter unit price"
            />
          </div>

          <div className="space-y-2">
            <Label>TP Price</Label>
            <Input
              type="number"
              value={tpPrice.toFixed(2)}
              readOnly
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="space-y-2">
            <Label>VAT</Label>
            <Input
              type="number"
              step="0.01"
              value={productData.vat}
              onChange={(e) => handleInputChange('vat', parseFloat(e.target.value) || 0)}
              placeholder="Enter VAT"
            />
          </div>

          <div className="space-y-2">
            <Label>TAX (5%)</Label>
            <Input
              type="number"
              value={tax.toFixed(2)}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label>Multiplier</Label>
            <Input
              value={productData.multiplier}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label>End Month</Label>
            <Input
              type="number"
              min="1"
              max="12"
              value={productData.endMonth}
              onChange={(e) => handleInputChange('endMonth', e.target.value)}
              placeholder="MM"
            />
          </div>

          <div className="space-y-2">
            <Label>End Year</Label>
            <Input
              type="number"
              min="2024"
              value={productData.endYear}
              onChange={(e) => handleInputChange('endYear', e.target.value)}
              placeholder="YYYY"
            />
          </div>

          <div className="space-y-2">
            <Label>Batch</Label>
            <Input
              value={productData.batch}
              readOnly
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
            Add Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductEntry;
