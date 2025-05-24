
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

interface ProductSummaryTableProps {
  products: Product[];
}

const ProductSummaryTable: React.FC<ProductSummaryTableProps> = ({ products }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total Qty</TableHead>
                <TableHead>TP Price</TableHead>
                <TableHead>VAT</TableHead>
                <TableHead>TAX</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total Purchase Price</TableHead>
                <TableHead>Payable to Vendor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.variant}</TableCell>
                  <TableCell>{product.strength}</TableCell>
                  <TableCell>{product.qty}</TableCell>
                  <TableCell>{product.totalQty}</TableCell>
                  <TableCell>{product.tpPrice.toFixed(2)}</TableCell>
                  <TableCell>{product.vat.toFixed(2)}</TableCell>
                  <TableCell>{product.tax.toFixed(2)}</TableCell>
                  <TableCell>{product.discount.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">
                    {product.totalPurchasePrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.payableToVendor.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSummaryTable;
