
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { TableStatus, ReservationStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';

const TableSection = ({ title, isActive }: { title: string; isActive: boolean }) => (
  <Button
    variant={isActive ? "default" : "outline"}
    className={`rounded-full h-9 px-5 text-sm font-medium ${
      isActive 
        ? "bg-teal-600 hover:bg-teal-700 text-white" 
        : "bg-white text-gray-600 hover:bg-gray-100"
    }`}
  >
    {title}
  </Button>
);

const TablesFilter = ({ activeFilter }: { activeFilter: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <Button
      variant={activeFilter === 'all' ? "default" : "outline"}
      size="sm"
      className={`rounded-full h-9 px-5 text-sm font-medium relative ${
        activeFilter === 'all' 
          ? "bg-teal-600 hover:bg-teal-700 text-white" 
          : "bg-white text-gray-600 hover:bg-gray-100"
      }`}
    >
      All
      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-teal-800 rounded-full ml-2">
        6
      </span>
    </Button>
    
    <Button
      variant={activeFilter === 'reservation' ? "default" : "outline"}
      size="sm"
      className={`rounded-full h-9 px-5 text-sm font-medium relative ${
        activeFilter === 'reservation' 
          ? "bg-teal-600 hover:bg-teal-700 text-white" 
          : "bg-white text-gray-600 hover:bg-gray-100"
      }`}
    >
      Reservation
      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-teal-800 rounded-full ml-2">
        12
      </span>
    </Button>
    
    <Button
      variant={activeFilter === 'on-dine' ? "default" : "outline"}
      size="sm"
      className={`rounded-full h-9 px-5 text-sm font-medium relative ${
        activeFilter === 'on-dine' 
          ? "bg-teal-600 hover:bg-teal-700 text-white" 
          : "bg-white text-gray-600 hover:bg-gray-100"
      }`}
    >
      On Dine
      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-teal-800 rounded-full ml-2">
        4
      </span>
    </Button>
  </div>
);

const DateNavigator = () => {
  const today = new Date();
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <ChevronLeft className="w-5 h-5 text-gray-500 cursor-pointer" />
      <div className="text-sm font-medium text-gray-800">
        {format(today, "EEE, d MMMM yyyy")}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-500 cursor-pointer" />
    </div>
  );
};

const ReservationItem = ({ 
  time, 
  customer, 
  people, 
  table, 
  phone, 
  status 
}: { 
  time: string;
  customer: string;
  people: number;
  table: string;
  phone: string;
  status: "payment" | "on-dine" | "free" | "unpaid";
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'on-dine':
        return {
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-700',
          label: 'On Dine'
        };
      case 'payment':
        return {
          bgColor: 'bg-white',
          textColor: 'text-gray-700',
          label: 'Payment'
        };
      case 'free':
        return {
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          label: 'Free'
        };
      case 'unpaid':
        return {
          bgColor: 'bg-white',
          textColor: 'text-gray-700',
          label: 'Unpaid'
        };
      default:
        return {
          bgColor: 'bg-white',
          textColor: 'text-gray-700',
          label: status
        };
    }
  };

  const statusStyle = getStatusStyles();

  return (
    <div className="border border-gray-200 rounded-md mb-3 overflow-hidden">
      <div className="flex">
        {status === 'on-dine' && (
          <div className="bg-orange-100 flex flex-col justify-center items-center px-3">
            <div className="text-xs text-orange-700">On</div>
            <div className="text-xs text-orange-700">Dine</div>
          </div>
        )}
        {status === 'free' && (
          <div className="bg-blue-50 flex flex-col justify-center items-center px-3">
            <div className="text-xs text-blue-700">Free</div>
          </div>
        )}
        
        <div className="flex-1 p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium text-gray-900">{customer}</div>
            <div className="text-sm text-gray-500">{status === 'on-dine' ? 'On Dine' : time}</div>
          </div>
          
          <div className="flex gap-2 items-center text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <span>🪑</span> {table}
            </span>
            <span className="flex items-center gap-1">
              <span>👤</span> {people}
            </span>
          </div>
          
          {phone && (
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <span>📞</span> {phone}
            </div>
          )}
        </div>
      </div>
      
      {(status === 'payment' || status === 'unpaid') && (
        <div className="border-t border-gray-200 py-2 px-3 bg-gray-50 flex justify-end">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-gray-600">{statusStyle.label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface TableItemProps {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
}

const TableItem = ({ id, number, capacity, status }: TableItemProps) => {
  const getBgColor = () => {
    switch (status) {
      case TableStatus.Available:
        return 'bg-teal-50';
      case TableStatus.Reserved:
        return 'bg-red-50';
      case TableStatus.Occupied:
        return 'bg-orange-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case TableStatus.Available:
        return 'border-teal-200';
      case TableStatus.Reserved:
        return 'border-red-200';
      case TableStatus.Occupied:
        return 'border-orange-200';
      default:
        return 'border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case TableStatus.Available:
        return 'text-teal-600';
      case TableStatus.Reserved:
        return 'text-red-600';
      case TableStatus.Occupied:
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  // Generate chairs based on capacity
  const renderChairs = () => {
    const chairs = [];
    
    // Top chairs
    for (let i = 0; i < Math.min(capacity, 2); i++) {
      chairs.push(
        <div key={`top-${i}`} className="absolute -top-3 flex justify-center w-full" style={{ left: `${25 + i * 50}%` }}>
          <div className={`w-4 h-4 ${status === TableStatus.Occupied ? 'text-orange-700' : 'text-teal-700'}`}>
            👤
          </div>
        </div>
      );
    }
    
    // Right chairs
    if (capacity > 2) {
      for (let i = 0; i < Math.min(Math.floor((capacity - 2) / 2), 2); i++) {
        chairs.push(
          <div key={`right-${i}`} className="absolute -right-3 flex flex-col justify-center h-full" style={{ top: `${25 + i * 50}%` }}>
            <div className={`w-4 h-4 ${status === TableStatus.Occupied ? 'text-orange-700' : 'text-teal-700'}`}>
              👤
            </div>
          </div>
        );
      }
    }
    
    // Bottom chairs
    if (capacity > 4) {
      for (let i = 0; i < Math.min(Math.floor((capacity - 4) / 2), 2); i++) {
        chairs.push(
          <div key={`bottom-${i}`} className="absolute -bottom-3 flex justify-center w-full" style={{ left: `${25 + i * 50}%` }}>
            <div className={`w-4 h-4 ${status === TableStatus.Occupied ? 'text-orange-700' : 'text-teal-700'}`}>
              👤
            </div>
          </div>
        );
      }
    }
    
    // Left chairs
    if (capacity > 6) {
      for (let i = 0; i < Math.min(capacity - 6, 2); i++) {
        chairs.push(
          <div key={`left-${i}`} className="absolute -left-3 flex flex-col justify-center h-full" style={{ top: `${25 + i * 50}%` }}>
            <div className={`w-4 h-4 ${status === TableStatus.Occupied ? 'text-orange-700' : 'text-teal-700'}`}>
              👤
            </div>
          </div>
        );
      }
    }
    
    return chairs;
  };

  return (
    <div className="relative flex flex-col items-center p-4">
      <div 
        className={`relative w-20 h-20 ${getBgColor()} ${getBorderColor()} border rounded-md flex flex-col items-center justify-center`}
      >
        <div className={`font-medium ${getTextColor()}`}>{number}</div>
        <div className="flex items-center text-sm">
          <span className="text-gray-500">👤</span>
          <span className="ml-1 text-gray-500">{capacity}</span>
        </div>
        {renderChairs()}
      </div>
    </div>
  );
};

const ManageTable = () => {
  const { tables, reservations } = useRestaurant();
  const [activeSection, setActiveSection] = useState('main-dining');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="flex h-full">
      {/* Left side - Reservations */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto p-4">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <DateNavigator />

        <div className="space-y-3">
          <ReservationItem 
            time="7:30 PM" 
            customer="Uthman ibn Hunaif" 
            people={6} 
            table="🪑 1" 
            phone="+84 678 890 000" 
            status="payment" 
          />
          <ReservationItem 
            time="" 
            customer="Bashir ibn Sa'ad" 
            people={2} 
            table="🪑 2" 
            phone="" 
            status="on-dine" 
          />
          <ReservationItem 
            time="8:00 PM" 
            customer="Ali" 
            people={2} 
            table="🪑 3" 
            phone="+84 342 556 555" 
            status="payment" 
          />
          <ReservationItem 
            time="" 
            customer="Khunais ibn Hudhafa" 
            people={3} 
            table="🪑 4" 
            phone="" 
            status="on-dine" 
          />
          <ReservationItem 
            time="" 
            customer="Available Now" 
            people={0} 
            table="🪑 5" 
            phone="" 
            status="free" 
          />
          <ReservationItem 
            time="8:25 PM" 
            customer="Mus'ab ibn Umayr" 
            people={7} 
            table="🪑 6" 
            phone="+84 800 563 554" 
            status="unpaid" 
          />
          <ReservationItem 
            time="9:00 PM" 
            customer="Shuja ibn Wahb" 
            people={10} 
            table="🪑 7" 
            phone="+84 900 100 200" 
            status="payment" 
          />
        </div>

        <div className="mt-6">
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-md py-2.5">
            Add New Reservation
          </Button>
        </div>
      </div>

      {/* Right side - Table layout */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Tables</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-600">On Dine</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <TableSection title="Main Dining" isActive={activeSection === 'main-dining'} />
            <TableSection title="Terrace" isActive={activeSection === 'terrace'} />
            <TableSection title="Outdoor" isActive={activeSection === 'outdoor'} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {tables.map((table) => (
            <TableItem
              key={table.id}
              id={table.id}
              number={table.number}
              capacity={table.capacity}
              status={table.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTable;
