
import React from 'react';
import { Button } from '@/components/ui/button';

type OrderType = 'dine-in' | 'takeout' | 'delivery' | 'curbside';

interface OrderTypeSelectorProps {
  selectedType: OrderType;
  onTypeChange: (type: OrderType) => void;
}

const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium text-gray-700">Order Type:</div>
      <div className="flex gap-2">
        <Button 
          variant={selectedType === 'dine-in' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('dine-in')}
          className="text-xs px-3"
        >
          Dine In
        </Button>
        <Button 
          variant={selectedType === 'takeout' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('takeout')}
          className="text-xs px-3"
        >
          Takeout
        </Button>
        <Button 
          variant={selectedType === 'delivery' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('delivery')}
          className="text-xs px-3"
        >
          Delivery
        </Button>
        <Button 
          variant={selectedType === 'curbside' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('curbside')}
          className="text-xs px-3"
        >
          Curbside
        </Button>
      </div>
    </div>
  );
};

export default OrderTypeSelector;
