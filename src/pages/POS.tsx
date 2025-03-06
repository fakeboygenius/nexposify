
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useRestaurant } from '@/context/RestaurantContext';
import POSTables from '@/components/pos/POSTables';
import POSTickets from '@/components/pos/POSTickets';
import POSMenu from '@/components/pos/POSMenu';
import POSPayment from '@/components/pos/POSPayment';

const POS = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tables');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [currentTicket, setCurrentTicket] = useState<string | null>(null);
  
  // Parse query params to check if we should open a specific tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    
    if (tab && ['tables', 'tickets', 'menu', 'payment'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

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

  // Handle tab changes and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/pos?tab=${value}`, { replace: true });
  };

  // Direct rendering of content based on activeTab
  // This is more like SambaPOS where screens replace each other completely
  const renderContent = () => {
    switch (activeTab) {
      case 'tables':
        return <POSTables onTableSelect={handleTableSelect} />;
      case 'tickets':
        return (
          <POSTickets 
            tableId={selectedTable}
            onTicketSelect={handleTicketSelect}
            onBackToTables={handleBackToTables}
          />
        );
      case 'menu':
        return (
          <POSMenu 
            ticketId={currentTicket}
            onGoToPayment={handleGoToPayment}
          />
        );
      case 'payment':
        return (
          <POSPayment 
            ticketId={currentTicket}
            onFinish={handleBackToTables}
          />
        );
      default:
        return <POSTables onTableSelect={handleTableSelect} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {renderContent()}
    </div>
  );
};

export default POS;
