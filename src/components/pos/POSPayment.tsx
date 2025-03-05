
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CreditCard, Banknote, Smartphone, Printer, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface POSPaymentProps {
  ticketId: string | null;
  onFinish: () => void;
}

const POSPayment: React.FC<POSPaymentProps> = ({ ticketId, onFinish }) => {
  const { orders } = useRestaurant();
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Get the current order
  const currentOrder = ticketId ? orders.find(order => order.id === ticketId) : null;
  
  const orderTotal = currentOrder?.total || 0;
  const subtotal = orderTotal || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + tipAmount;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      toast.success('Payment processed successfully!');
    }, 1500);
  };

  const handleAddTip = (percentage: number) => {
    const tipValue = subtotal * (percentage / 100);
    setTipAmount(tipValue);
  };

  if (isCompleted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
        <p className="text-gray-500 mb-6">
          The payment has been processed successfully.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 w-full max-w-md">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Amount Paid</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-500">Transaction ID</span>
            <span className="text-gray-900">TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Time</span>
            <span className="text-gray-900">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex gap-3 w-full max-w-md">
          <Button
            variant="outline"
            className="flex items-center gap-2 flex-1"
          >
            <Printer size={18} />
            Print Receipt
          </Button>
          <Button
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            onClick={onFinish}
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Payment Details */}
      <div className="w-2/3 pr-4 h-full">
        <div className="mb-4 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.history.back()}
            className="p-0 h-8 w-8"
          >
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-xl font-bold">Payment</h2>
        </div>

        {/* Order summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-gray-500">Order</span>
            <span>#{currentOrder?.id.slice(-5) || 'New'}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-500">Table</span>
            <span>{currentOrder?.tableNumber || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Items</span>
            <span>{currentOrder?.items.length || 0}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <h3 className="font-medium mb-3">Payment Method</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <PaymentMethodCard
            title="Card"
            icon={<CreditCard size={24} />}
            description="Credit or Debit Card"
            isSelected={paymentMethod === 'card'}
            onClick={() => setPaymentMethod('card')}
          />
          <PaymentMethodCard
            title="Cash"
            icon={<Banknote size={24} />}
            description="Cash Payment"
            isSelected={paymentMethod === 'cash'}
            onClick={() => setPaymentMethod('cash')}
          />
          <PaymentMethodCard
            title="Mobile"
            icon={<Smartphone size={24} />}
            description="Mobile Payment"
            isSelected={paymentMethod === 'mobile'}
            onClick={() => setPaymentMethod('mobile')}
          />
        </div>

        {/* Tip Options */}
        <h3 className="font-medium mb-3">Add Tip</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">
          <TipButton 
            percentage={0} 
            amount={0} 
            isSelected={tipAmount === 0}
            onClick={() => setTipAmount(0)}
          />
          <TipButton 
            percentage={10} 
            amount={subtotal * 0.1} 
            isSelected={tipAmount === subtotal * 0.1}
            onClick={() => handleAddTip(10)}
          />
          <TipButton 
            percentage={15} 
            amount={subtotal * 0.15} 
            isSelected={tipAmount === subtotal * 0.15}
            onClick={() => handleAddTip(15)}
          />
          <TipButton 
            percentage={20} 
            amount={subtotal * 0.2} 
            isSelected={tipAmount === subtotal * 0.2}
            onClick={() => handleAddTip(20)}
          />
        </div>
        
        {/* Custom Tip Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 mb-1">Custom Tip</label>
          <div className="flex items-center">
            <span className="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              className="flex-1 border rounded-r-md px-3 py-2"
              value={tipAmount.toFixed(2)}
              onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        
        {paymentMethod === 'card' && (
          <div className="p-4 border rounded-lg mb-6">
            <h3 className="font-medium mb-3">Card Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-500 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-500 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Order Summary */}
      <div className="w-1/3 border-l pl-4 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        
        <div className="flex-1 overflow-auto mb-4">
          {currentOrder?.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {item.quantity}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </div>
              </div>
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Tax (10%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Tip</span>
            <span className="font-medium">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          className="bg-blue-500 hover:bg-blue-600 py-6"
          onClick={handleProcessPayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

interface PaymentMethodCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  title,
  icon,
  description,
  isSelected,
  onClick
}) => (
  <div 
    className={cn(
      "border rounded-lg p-4 cursor-pointer transition-all",
      isSelected 
        ? "border-blue-500 bg-blue-50" 
        : "border-gray-200 hover:bg-gray-50"
    )}
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center">
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-2",
        isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
      )}>
        {icon}
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

interface TipButtonProps {
  percentage: number;
  amount: number;
  isSelected: boolean;
  onClick: () => void;
}

const TipButton: React.FC<TipButtonProps> = ({
  percentage,
  amount,
  isSelected,
  onClick
}) => (
  <button
    className={cn(
      "border rounded-lg p-3 transition-all",
      isSelected 
        ? "border-blue-500 bg-blue-50 text-blue-700" 
        : "border-gray-200 hover:bg-gray-50"
    )}
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center">
      <p className="font-medium">{percentage === 0 ? 'No Tip' : `${percentage}%`}</p>
      {percentage > 0 && (
        <p className="text-xs text-gray-500">${amount.toFixed(2)}</p>
      )}
    </div>
  </button>
);

export default POSPayment;
