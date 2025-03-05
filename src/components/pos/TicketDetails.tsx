
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Order } from '@/lib/types';
import CustomerInfo from './CustomerInfo';
import OrderTypeSelector from './OrderTypeSelector';
import OrderActions from './OrderActions';
import OrderItems from './OrderItems';
import OrderSummary from './OrderSummary';

type OrderType = 'dine-in' | 'takeout' | 'delivery' | 'curbside';

interface TicketDetailsProps {
  order: Order;
  onBackClick: () => void;
  onContinueOrder: () => void;
  orderType: OrderType;
  onOrderTypeChange: (type: OrderType) => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  order,
  onBackClick,
  onContinueOrder,
  orderType,
  onOrderTypeChange
}) => {
  return (
    <div className="w-2/3 border-l pl-4 h-full overflow-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">Order Details</h2>
          <p className="text-sm text-gray-500">
            Ticket #{order.id.slice(-5)} • Table {order.tableNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            className="flex items-center gap-1"
            onClick={onBackClick}
          >
            <ChevronLeft size={16} />
            Back
          </Button>
          <Button 
            size="sm"
            className="flex items-center gap-1"
            onClick={onContinueOrder}
          >
            Continue Order
          </Button>
        </div>
      </div>

      <CustomerInfo order={order} />
      
      <OrderTypeSelector 
        selectedType={orderType} 
        onTypeChange={onOrderTypeChange} 
      />
      
      <OrderActions type="top" />
      
      <OrderItems items={order.items} />
      
      <OrderSummary subtotal={order.total} />
      
      <OrderActions type="bottom" />
    </div>
  );
};

export default TicketDetails;
