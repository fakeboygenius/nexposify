
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Edit2, Printer, Clock, PercentSquare, Gift } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  serviceCharge?: number;
  discount?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  subtotal,
  serviceCharge = 0,
  discount = 0
}) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [customDiscount, setCustomDiscount] = useState(discount);
  
  const tax = subtotal * 0.1;
  const totalBeforeDiscounts = subtotal + tax + serviceCharge;
  const total = totalBeforeDiscounts + tipAmount - customDiscount;
  
  return (
    <div className="bg-white rounded-lg border mb-4">
      <div className="p-3 border-b bg-gray-50 font-medium flex justify-between items-center">
        <span>Order Summary</span>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          >
            <Edit2 size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full"
          >
            <Printer size={14} />
          </Button>
        </div>
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
        
        {showAdvancedOptions && (
          <>
            <div className="mt-3 mb-3 border rounded-md p-2 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Apply Tip:</span>
                <div className="flex gap-1">
                  {[0, 10, 15, 20].map(percent => (
                    <button 
                      key={percent}
                      onClick={() => setTipAmount(subtotal * (percent / 100))}
                      className={`text-xs px-2 py-1 rounded ${
                        tipAmount === subtotal * (percent / 100)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-white border'
                      }`}
                    >
                      {percent === 0 ? 'None' : `${percent}%`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Custom Amount:</span>
                <div className="flex items-center">
                  <span className="mr-1">$</span>
                  <input
                    type="number"
                    value={tipAmount.toFixed(2)}
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                    className="w-16 border rounded-md px-1 py-0.5 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 mb-3">
              <Button variant="outline" size="sm" className="justify-start">
                <Clock size={14} className="mr-1" />
                <span className="text-xs">Order Timing</span>
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <PercentSquare size={14} className="mr-1" />
                <span className="text-xs">Apply Discount</span>
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Gift size={14} className="mr-1" />
                <span className="text-xs">Add Coupon</span>
              </Button>
            </div>
          </>
        )}
        
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Service Charge</span>
          <span className="font-medium">${serviceCharge.toFixed(2)}</span>
        </div>
        
        {tipAmount > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tip</span>
            <span className="font-medium">${tipAmount.toFixed(2)}</span>
          </div>
        )}
        
        {customDiscount > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">-${customDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <Separator className="my-3" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
          <span>Order #12345</span>
          <span>Created: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
