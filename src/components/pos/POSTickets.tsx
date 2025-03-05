
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import TicketList from './TicketList';
import TicketDetails from './TicketDetails';

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
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout' | 'delivery' | 'curbside'>('dine-in');
  
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
      setSelectedTicket(tableOrders[0].id);
      setShowTicketDetails(true);
    }
  };

  const handleTicketClick = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setShowTicketDetails(true);
  };

  const handleContinueOrder = () => {
    if (selectedTicket) {
      onTicketSelect(selectedTicket);
    }
  };

  const handleOrderTypeChange = (type: 'dine-in' | 'takeout' | 'delivery' | 'curbside') => {
    setOrderType(type);
  };

  // Find the selected order details
  const selectedOrder = selectedTicket 
    ? orders.find(order => order.id === selectedTicket) 
    : null;

  return (
    <div className="h-full flex">
      {/* Left side: Tickets list */}
      <div className={cn(
        "flex flex-col transition-all duration-300",
        showTicketDetails && selectedOrder ? "w-1/3 pr-4" : "w-full"
      )}>
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

        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
                <p className="font-medium">{table.area || table.section}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tickets list */}
        <TicketList 
          orders={tableOrders}
          selectedTicket={selectedTicket}
          onTicketClick={handleTicketClick}
          onNewTicket={handleNewTicket}
          table={table}
        />
      </div>

      {/* Right side: Order details */}
      {showTicketDetails && selectedOrder && (
        <TicketDetails 
          order={selectedOrder}
          onBackClick={() => setShowTicketDetails(false)}
          onContinueOrder={handleContinueOrder}
          orderType={orderType}
          onOrderTypeChange={handleOrderTypeChange}
        />
      )}
    </div>
  );
};

export default POSTickets;
