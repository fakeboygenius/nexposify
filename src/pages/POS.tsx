
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useRestaurant } from '@/context/RestaurantContext';
import { LayoutGrid, Utensils, Ticket, CreditCard } from 'lucide-react';
import POSTables from '@/components/pos/POSTables';
import POSTickets from '@/components/pos/POSTickets';
import POSMenu from '@/components/pos/POSMenu';
import POSPayment from '@/components/pos/POSPayment';

const POS = () => {
  const [activeTab, setActiveTab] = useState('tables');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [currentTicket, setCurrentTicket] = useState<string | null>(null);

  // Handle navigation between tabs based on user actions
  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    setActiveTab('tickets');
  };

  const handleTicketSelect = (ticketId: string) => {
    setCurrentTicket(ticketId);
    setActiveTab('menu');
  };

  const handleGoToPayment = () => {
    setActiveTab('payment');
  };

  const handleBackToTables = () => {
    setSelectedTable(null);
    setCurrentTicket(null);
    setActiveTab('tables');
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
        <div className="border-b pb-2 mb-4">
          <TabsList className="grid grid-cols-4 w-full max-w-xl mx-auto">
            <TabsTrigger value="tables" className="flex items-center gap-2">
              <LayoutGrid size={18} />
              <span>Tables</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tickets" 
              className="flex items-center gap-2"
              disabled={!selectedTable}
            >
              <Ticket size={18} />
              <span>Tickets</span>
            </TabsTrigger>
            <TabsTrigger 
              value="menu" 
              className="flex items-center gap-2"
              disabled={!currentTicket}
            >
              <Utensils size={18} />
              <span>Menu</span>
            </TabsTrigger>
            <TabsTrigger 
              value="payment" 
              className="flex items-center gap-2"
              disabled={!currentTicket}
            >
              <CreditCard size={18} />
              <span>Payment</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="tables" className="h-full mt-0">
            <POSTables onTableSelect={handleTableSelect} />
          </TabsContent>
          
          <TabsContent value="tickets" className="h-full mt-0">
            <POSTickets 
              tableId={selectedTable}
              onTicketSelect={handleTicketSelect}
              onBackToTables={handleBackToTables}
            />
          </TabsContent>
          
          <TabsContent value="menu" className="h-full mt-0">
            <POSMenu 
              ticketId={currentTicket}
              onGoToPayment={handleGoToPayment}
            />
          </TabsContent>
          
          <TabsContent value="payment" className="h-full mt-0">
            <POSPayment 
              ticketId={currentTicket}
              onFinish={handleBackToTables}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default POS;
