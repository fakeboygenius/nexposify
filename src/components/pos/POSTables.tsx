
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
    ? tables.filter(table => table.area === activeFilter || table.status === activeFilter)
    : tables;

  const getTableStatusIcon = (status: TableStatus) => {
    switch (status) {
      case TableStatus.Available:
        return <CircleDashed className="text-green-500" size={18} />;
      case TableStatus.Reserved:
        return <Clock className="text-yellow-500" size={18} />;
      case TableStatus.Occupied:
        return <Users className="text-red-500" size={18} />;
      default:
        return <CircleDashed className="text-gray-500" size={18} />;
    }
  };

  const getTableStatusColor = (status: TableStatus) => {
    switch (status) {
      case TableStatus.Available:
        return 'border-green-200 bg-green-50';
      case TableStatus.Reserved:
        return 'border-yellow-200 bg-yellow-50';
      case TableStatus.Occupied:
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Tables</h2>
        
        <div className="flex gap-2">
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

      {/* Filters */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        <FilterButton 
          label="All" 
          isActive={!activeFilter} 
          onClick={() => setActiveFilter(null)} 
        />
        <FilterButton 
          label="Main Floor" 
          isActive={activeFilter === 'main'} 
          onClick={() => setActiveFilter('main')} 
        />
        <FilterButton 
          label="Terrace" 
          isActive={activeFilter === 'terrace'} 
          onClick={() => setActiveFilter('terrace')} 
        />
        <FilterButton 
          label="Bar" 
          isActive={activeFilter === 'bar'} 
          onClick={() => setActiveFilter('bar')} 
        />
        <FilterButton 
          label="Available" 
          isActive={activeFilter === TableStatus.Available} 
          onClick={() => setActiveFilter(TableStatus.Available)} 
          icon={<CircleDashed size={14} />}
          color="text-green-500"
        />
        <FilterButton 
          label="Reserved" 
          isActive={activeFilter === TableStatus.Reserved} 
          onClick={() => setActiveFilter(TableStatus.Reserved)} 
          icon={<Clock size={14} />}
          color="text-yellow-500"
        />
        <FilterButton 
          label="Occupied" 
          isActive={activeFilter === TableStatus.Occupied} 
          onClick={() => setActiveFilter(TableStatus.Occupied)} 
          icon={<Users size={14} />}
          color="text-red-500"
        />
      </div>

      {/* Tables Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto">
          {filteredTables.map(table => (
            <div 
              key={table.id}
              onClick={() => onTableSelect(table.id)}
              className={cn(
                "border rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer transition-all hover:shadow-md",
                getTableStatusColor(table.status)
              )}
            >
              <div className="text-2xl font-bold mb-1">
                {table.number}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {table.capacity} seats
              </div>
              <div className="flex items-center gap-1 text-xs">
                {getTableStatusIcon(table.status)}
                <span>{table.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-auto flex-1">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border-b">Table</th>
                <th className="text-left p-3 border-b">Capacity</th>
                <th className="text-left p-3 border-b">Area</th>
                <th className="text-left p-3 border-b">Status</th>
                <th className="text-left p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTables.map(table => (
                <tr key={table.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">Table {table.number}</td>
                  <td className="p-3">{table.capacity} seats</td>
                  <td className="p-3">{table.area}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {getTableStatusIcon(table.status)}
                      <span>{table.status}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Button 
                      size="sm" 
                      onClick={() => onTableSelect(table.id)}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  color?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  isActive, 
  onClick, 
  icon, 
  color 
}) => (
  <Button
    variant={isActive ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={cn(
      "whitespace-nowrap",
      icon && "flex items-center gap-1",
      color && !isActive && color
    )}
  >
    {icon}
    {label}
  </Button>
);

export default POSTables;
