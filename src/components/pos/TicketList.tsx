
import React from 'react';
import { Clock, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Order, OrderStatus } from '@/lib/types';

interface TicketListProps {
  orders: Order[];
  selectedTicket: string | null;
  onTicketClick: (ticketId: string) => void;
  onNewTicket: () => void;
  table?: { number: string; capacity: number; area?: string; section?: string } | null;
}

const TicketList: React.FC<TicketListProps> = ({
  orders,
  selectedTicket,
  onTicketClick,
  onNewTicket,
  table
}) => {
  const getOrderStatusStyle = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.New:
        return "bg-blue-100 text-blue-800";
      case OrderStatus.InKitchen:
        return "bg-yellow-100 text-yellow-800";
      case OrderStatus.Ready: 
        return "bg-green-100 text-green-800";
      case OrderStatus.Served:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 overflow-auto">
      {orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map(order => (
            <div 
              key={order.id}
              className={cn(
                "border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all",
                selectedTicket === order.id ? "border-blue-500 bg-blue-50" : ""
              )}
              onClick={() => onTicketClick(order.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Ticket #{order.id.slice(-5)}</p>
                  <p className="text-sm text-gray-500">{formatTime(order.createdAt)}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusStyle(order.status)}`}>
                  {order.status}
                </div>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <p className="text-sm mb-1">Items: {order.items.length}</p>
                <p className="font-bold">${order.total.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={14} />
                  <span>{Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000)} mins ago</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-full hover:bg-gray-100">
                    <Edit size={16} className="text-gray-500" />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-red-50">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-gray-500 mb-4">No tickets for this table yet</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={onNewTicket}
          >
            Create New Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketList;
