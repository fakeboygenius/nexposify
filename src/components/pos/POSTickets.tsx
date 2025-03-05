
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { OrderStatus } from '@/lib/types';
import { ChevronLeft, Plus, Edit, Trash2, Clock } from 'lucide-react';

interface POSTicketsProps {
  tableId: string | null;
  onTicketSelect: (ticketId: string) => void;
  onBackToTables: () => void;
}

const POSTickets: React.FC<POSTicketsProps> = ({ 
  tableId, 
  onTicketSelect,
  onBackToTables
}) => {
  const { orders, tables } = useRestaurant();
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  
  // Find the table details
  const table = tables.find(t => t.id === tableId);
  
  // Get tickets/orders for this table
  const tableOrders = orders.filter(order => 
    order.tableId === tableId || order.tableNumber === table?.number
  );

  const handleNewTicket = () => {
    // In a real app, this would create a new ticket
    // Here we'll just use the first order as a demo
    if (tableOrders.length > 0) {
      onTicketSelect(tableOrders[0].id);
    }
  };

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
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBackToTables}
            className="p-0 h-8 w-8"
          >
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-xl font-bold">
            {table ? `Table ${table.number} - Tickets` : 'Tickets'}
          </h2>
        </div>
        
        <Button 
          size="sm" 
          onClick={handleNewTicket}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          New Ticket
        </Button>
      </div>

      {/* Table info */}
      {table && (
        <div className="mb-4 p-3 border rounded-md bg-gray-50">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Table {table.number}</p>
              <p className="font-medium">{table.capacity} seats</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-medium">{table.area}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tickets list */}
      <div className="flex-1 overflow-auto">
        {tableOrders.length > 0 ? (
          <div className="space-y-3">
            {tableOrders.map(order => (
              <div 
                key={order.id}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-md"
                onClick={() => onTicketSelect(order.id)}
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
            <Button onClick={handleNewTicket}>Create New Ticket</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default POSTickets;
