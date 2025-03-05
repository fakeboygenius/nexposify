
import React from 'react';
import { Edit, Trash2, Menu, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OrderItem } from '@/lib/types';

interface OrderItemsProps {
  items: OrderItem[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg border mb-4">
      <div className="p-3 border-b bg-gray-50 font-medium flex justify-between items-center">
        <span>Order Items</span>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-gray-200">
            <Menu size={16} className="text-gray-500" />
          </button>
          <button className="p-1 rounded hover:bg-gray-200">
            <List size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      {items.map((item) => (
        <div key={item.id} className="p-4 border-b last:border-b-0">
          <div className="flex justify-between mb-1">
            <div className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {item.quantity}
              </span>
              <div>
                <p className="font-medium">{item.name}</p>
                {item.specialInstructions && (
                  <p className="text-sm text-gray-500 mt-1">
                    Note: {item.specialInstructions}
                  </p>
                )}
                {item.modifiers && item.modifiers.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.modifiers.map((mod, i) => (
                      <Badge key={i} variant="red" className="text-xs">
                        {mod}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              <Edit size={14} />
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs text-red-600 hover:text-red-700">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
