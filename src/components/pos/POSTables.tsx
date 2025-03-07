
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { TableStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface POSTablesProps {
  onTableSelect: (tableId: string) => void;
}

const POSTables: React.FC<POSTablesProps> = ({ onTableSelect }) => {
  const { tables } = useRestaurant();
  const [activeArea, setActiveArea] = useState<string | null>(null);
  
  // Get all table sections
  const sections = ['Main Floor', 'Terrace', 'Bar'];
  
  // Get all unique areas
  const areas = Array.from(new Set(tables.map(table => table.area || 'Unknown')));
  
  // Filter tables based on selected area
  const filteredTables = activeArea 
    ? tables.filter(table => table.area === activeArea)
    : tables;

  return (
    <div className="h-full flex flex-col">
      {/* Top section with main navigation options */}
      <div className="flex border-b mb-4 pb-2 overflow-x-auto">
        {['Tables', 'SambaCard', 'Delivery', 'Customer Search', 'Customer Tickets', 'Customers'].map(item => (
          <Button 
            key={item}
            variant={item === 'Tables' ? 'default' : 'ghost'}
            className="min-w-[120px] whitespace-nowrap mx-1"
          >
            {item}
          </Button>
        ))}
      </div>
      
      {/* Areas/Sections filter */}
      <div className="mb-4 flex gap-1 overflow-x-auto border-b pb-2">
        <Button 
          variant={!activeArea ? "default" : "outline"} 
          size="sm" 
          onClick={() => setActiveArea(null)}
          className="min-w-20"
        >
          All Tables
        </Button>
        {areas.map(area => (
          <Button 
            key={area}
            variant={activeArea === area ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveArea(area)}
            className="min-w-20"
          >
            {area}
          </Button>
        ))}
      </div>

      {/* Tables grid - SambaPOS style */}
      <div className="grid grid-cols-7 gap-1 overflow-auto flex-1">
        {filteredTables.map(table => (
          <button 
            key={table.id}
            onClick={() => onTableSelect(table.id)}
            className={cn(
              "flex items-center justify-center aspect-[3/2] text-xl font-bold border-2 hover:border-blue-500",
              table.status === TableStatus.Occupied && "bg-orange-500 text-white border-orange-600",
              table.status === TableStatus.Reserved && "bg-yellow-100 border-yellow-300",
              table.status === TableStatus.Available && "bg-white border-gray-300"
            )}
          >
            {table.number}
          </button>
        ))}
      </div>
      
      {/* Bottom section with status bar */}
      <div className="mt-4 border-t pt-2 flex justify-between text-sm text-gray-600">
        <div className="flex gap-4">
          <Button size="sm" variant="outline">Restaurant</Button>
          <Button size="sm" variant="outline">FastFood</Button>
          <Button size="sm" variant="outline">Delivery Service</Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">Connected</span>
          <span>Administrator</span>
        </div>
      </div>
    </div>
  );
};

export default POSTables;
