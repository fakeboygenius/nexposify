
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableStatus } from '@/lib/types';
import { 
  Coffee, 
  Users, 
  Clock, 
  CircleDashed,
  Filter 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface POSTablesProps {
  onTableSelect: (tableId: string) => void;
}

const POSTables: React.FC<POSTablesProps> = ({ onTableSelect }) => {
  const { tables } = useRestaurant();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter tables based on selected filter
  const filteredTables = activeFilter 
    ? tables.filter(table => table.area === activeFilter || table.section === activeFilter || table.status === activeFilter)
    : tables;

  // Group tables by section
  const sectionNames = ['Main Floor', 'Terrace', 'Bar'];
  
  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case TableStatus.Available:
        return 'bg-white border-gray-300 text-gray-800';
      case TableStatus.Reserved:
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case TableStatus.Occupied:
        return 'bg-orange-500 border-orange-600 text-white';
      default:
        return 'bg-white border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Tables</h2>
        
        <div className="flex gap-2">
          {/* Table action buttons */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-gray-100' : ''}
          >
            Grid
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-gray-100' : ''}
          >
            List
          </Button>
        </div>
      </div>

      {/* Filters/Tabs for table sections - Similar to SambaPOS navigation */}
      <div className="mb-4 flex gap-1 overflow-x-auto border-b pb-2">
        <Button 
          variant={!activeFilter ? "default" : "outline"} 
          size="sm" 
          onClick={() => setActiveFilter(null)}
          className="min-w-20"
        >
          All Tables
        </Button>
        {sectionNames.map(section => (
          <Button 
            key={section}
            variant={activeFilter === section.toLowerCase() ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveFilter(section.toLowerCase())}
            className="min-w-20"
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Tables Grid - SambaPOS style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1 overflow-auto">
        {filteredTables.map(table => (
          <div 
            key={table.id}
            onClick={() => onTableSelect(table.id)}
            className={cn(
              "border-2 aspect-[4/3] flex items-center justify-center cursor-pointer transition-all",
              table.status === TableStatus.Occupied && "bg-orange-500 text-white border-orange-600",
              table.status === TableStatus.Reserved && "bg-yellow-100 border-yellow-300",
              table.status === TableStatus.Available && "bg-white border-gray-300 hover:bg-gray-50",
              table.status === TableStatus.Available ? "hover:border-blue-400" : ""
            )}
          >
            <div className="text-center">
              <div className="text-2xl font-bold">
                {table.number}
              </div>
              <div className="text-xs">
                {table.capacity} seats
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default POSTables;
