
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRestaurant } from '@/context/RestaurantContext';
import POSTables from '@/components/pos/POSTables';
import POSTickets from '@/components/pos/POSTickets';
import POSMenu from '@/components/pos/POSMenu';
import POSPayment from '@/components/pos/POSPayment';

const POS = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState('tables');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [currentTicket, setCurrentTicket] = useState<string | null>(null);
  
  // Handle navigation between screens based on user actions
  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    setActiveScreen('tickets');
  };

  const handleTicketSelect = (ticketId: string) => {
    setCurrentTicket(ticketId);
    setActiveScreen('menu');
  };

  const handleGoToPayment = () => {
    setActiveScreen('payment');
  };

  const handleBackToTables = () => {
    setSelectedTable(null);
    setCurrentTicket(null);
    setActiveScreen('tables');
  };

  // Direct rendering of content based on activeScreen
  // This is more like SambaPOS where screens replace each other completely
  const renderContent = () => {
    switch (activeScreen) {
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
