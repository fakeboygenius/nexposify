
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  subtotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal }) => {
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  return (
    <div className="bg-white rounded-lg border mb-4">
      <div className="p-3 border-b bg-gray-50 font-medium">
        Order Summary
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Service Charge</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium">$0.00</span>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
