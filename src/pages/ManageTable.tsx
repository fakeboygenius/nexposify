import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Plus, 
  Users, 
  Calendar, 
  Phone,
  Clock,
  Coffee,
  X,
  Edit
} from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { TableStatus, ReservationStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

const FLOOR_GRID = {
  mainDining: {
    rows: 3,
    cols: 3,
    name: "Main Dining",
  },
  terrace: {
    rows: 2,
    cols: 4,
    name: "Terrace",
  },
  outdoor: {
    rows: 2,
    cols: 2,
    name: "Outdoor",
  }
};

const TableSection = ({ title, isActive, count, onClick }: { 
  title: string; 
  isActive: boolean;
  count: number;
  onClick: () => void;
}) => (
  <Button
    variant={isActive ? "default" : "outline"}
    className={`rounded-full h-9 px-5 text-sm font-medium relative ${
      isActive 
        ? "bg-teal-600 hover:bg-teal-700 text-white" 
        : "bg-white text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {title}
    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-teal-800 rounded-full ml-2">
      {count}
    </span>
  </Button>
);

const DateNavigator = () => {
  const today = new Date();
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <Button variant="ghost" size="icon" className="text-gray-500">
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <div className="text-sm font-medium text-gray-800 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-teal-600" />
        {format(today, "EEE, d MMMM yyyy")}
      </div>
      <Button variant="ghost" size="icon" className="text-gray-500">
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

interface ReservationItemProps { 
  time: string;
  customer: string;
  people: number;
  table: string;
  phone: string;
  status: "payment" | "on-dine" | "free" | "unpaid";
  id: string;
}

const ReservationItem = ({ 
  time, 
  customer, 
  people, 
  table, 
  phone, 
  status,
  id
}: ReservationItemProps) => {
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
    <div className="border border-gray-200 rounded-md mb-3 overflow-hidden hover:shadow-md transition-all duration-200">
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
            <div className="text-sm text-gray-500 flex items-center">
              {status === 'on-dine' ? (
                <>
                  <Clock className="w-3 h-3 mr-1" />
                  On Dine
                </>
              ) : (
                time
              )}
            </div>
          </div>
          
          <div className="flex gap-2 items-center text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <Coffee className="w-3 h-3" /> {table}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {people}
            </span>
          </div>
          
          {phone && (
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Phone className="w-3 h-3" /> {phone}
            </div>
          )}
        </div>
      </div>
      
      {(status === 'payment' || status === 'unpaid') && (
        <div className="border-t border-gray-200 py-2 px-3 bg-gray-50 flex justify-between">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-gray-600">{statusStyle.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

interface TableProps {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  position?: { row: number; col: number };
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const TableComponent = ({ 
  id, 
  number, 
  capacity, 
  status, 
  position,
  onSelect,
  isSelected
}: TableProps) => {
  const getTableShape = () => {
    if (capacity <= 2) return "rounded-full";
    if (capacity <= 4) return "rounded-md";
    return "rounded-md";
  };

  const getTableSize = () => {
    if (capacity <= 2) return "w-16 h-16";
    if (capacity <= 4) return "w-20 h-20";
    if (capacity <= 6) return "w-24 h-16";
    return "w-28 h-20";
  };

  const getStatusStyles = () => {
    switch (status) {
      case TableStatus.Available:
        return "bg-teal-50 border-teal-200 hover:bg-teal-100";
      case TableStatus.Reserved:
        return "bg-red-50 border-red-200 hover:bg-red-100";
      case TableStatus.Occupied:
        return "bg-orange-50 border-orange-200 hover:bg-orange-100";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case TableStatus.Available:
        return "text-teal-600";
      case TableStatus.Reserved:
        return "text-red-600";
      case TableStatus.Occupied:
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div 
      className={cn(
        "relative flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-200 transform",
        isSelected ? "scale-105" : ""
      )}
      onClick={() => onSelect(id)}
    >
      <div 
        className={cn(
          `flex flex-col items-center justify-center border-2 ${getTableSize()} ${getTableShape()} ${getStatusStyles()}`,
          isSelected ? "ring-2 ring-primary" : ""
        )}
      >
        <div className={`font-medium ${getTextColor()}`}>
          {number}
        </div>
        <div className="flex items-center text-xs">
          <Users className={`w-3 h-3 mr-1 ${getTextColor()}`} />
          <span className={getTextColor()}>{capacity}</span>
        </div>
      </div>
    </div>
  );
};

const FloorPlanGrid = ({ 
  tables, 
  selectedTable,
  onSelectTable,
  section
}: { 
  tables: any[],
  selectedTable: string | null,
  onSelectTable: (id: string) => void,
  section: string
}) => {
  const sectionConfig = FLOOR_GRID[section as keyof typeof FLOOR_GRID];
  const filteredTables = tables.filter(table => table.section === section);
  
  const grid = Array(sectionConfig.rows).fill(0).map(() => Array(sectionConfig.cols).fill(null));
  
  filteredTables.forEach((table, index) => {
    const row = Math.floor(index / sectionConfig.cols);
    const col = index % sectionConfig.cols;
    if (row < sectionConfig.rows) {
      grid[row][col] = table;
    }
  });
  
  return (
    <div className="bg-white/50 p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4 flex justify-center">
        <Badge variant="outline" className="text-sm py-1 px-3">
          {sectionConfig.name}
        </Badge>
      </div>
      <div 
        className="grid gap-4" 
        style={{ 
          gridTemplateColumns: `repeat(${sectionConfig.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${sectionConfig.rows}, minmax(0, 1fr))` 
        }}
      >
        {grid.flat().map((table, index) => (
          <div key={index} className="min-h-24 flex items-center justify-center">
            {table ? (
              <TableComponent
                id={table.id}
                number={table.number}
                capacity={table.capacity}
                status={table.status}
                position={{ row: Math.floor(index / sectionConfig.cols), col: index % sectionConfig.cols }}
                onSelect={onSelectTable}
                isSelected={selectedTable === table.id}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const NewReservationDialog = ({ tableId }: { tableId: string | null }) => {
  const { addReservation, tables } = useRestaurant();
  const [isOpen, setIsOpen] = useState(false);
  const selectedTable = tables.find(table => table.id === tableId);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableId) {
      addReservation({
        tableId,
        customerName: "New Customer",
        customerPhone: "+1 234 567 890",
        guests: 2,
        time: new Date(),
        status: ReservationStatus.Confirmed
      });
      setIsOpen(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-teal-600 hover:bg-teal-700">
          Add New Reservation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Reservation</DialogTitle>
          <DialogDescription>
            {selectedTable 
              ? `Create a reservation for Table ${selectedTable.number}` 
              : "Please select a table first"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Name</label>
              <input 
                type="text" 
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Customer name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input 
                type="tel" 
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Phone number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              <input 
                type="datetime-local" 
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Guests</label>
              <input 
                type="number" 
                min="1"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Number of guests"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea 
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Special requests or notes"
              rows={3}
            />
          </div>
        
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!tableId}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Create Reservation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ManageTable = () => {
  const navigate = useNavigate();
  const { tables, reservations } = useRestaurant();
  const [activeSection, setActiveSection] = useState('mainDining');
  const [activeTab, setActiveTab] = useState('floorPlan');
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  
  const handleSelectTable = (id: string) => {
    setSelectedTableId(prevId => prevId === id ? null : id);
    navigate('/order-line', { state: { tableId: id } });
  };
  
  const tableCounts = {
    mainDining: tables.filter(t => t.section === 'mainDining').length,
    terrace: tables.filter(t => t.section === 'terrace').length,
    outdoor: tables.filter(t => t.section === 'outdoor').length,
  };

  return (
    <div className="flex h-full">
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
            id="res1"
            time="7:30 PM" 
            customer="Uthman ibn Hunaif" 
            people={6} 
            table="T1" 
            phone="+84 678 890 000" 
            status="payment" 
          />
          <ReservationItem 
            id="res2"
            time="" 
            customer="Bashir ibn Sa'ad" 
            people={2} 
            table="T2" 
            phone="" 
            status="on-dine" 
          />
          <ReservationItem 
            id="res3"
            time="8:00 PM" 
            customer="Ali" 
            people={2} 
            table="T3" 
            phone="+84 342 556 555" 
            status="payment" 
          />
          <ReservationItem 
            id="res4"
            time="" 
            customer="Khunais ibn Hudhafa" 
            people={3} 
            table="T4" 
            phone="" 
            status="on-dine" 
          />
          <ReservationItem 
            id="res5"
            time="" 
            customer="Available Now" 
            people={0} 
            table="T5" 
            phone="" 
            status="free" 
          />
          <ReservationItem 
            id="res6"
            time="8:25 PM" 
            customer="Mus'ab ibn Umayr" 
            people={7} 
            table="T6" 
            phone="+84 800 563 554" 
            status="unpaid" 
          />
          <ReservationItem 
            id="res7"
            time="9:00 PM" 
            customer="Shuja ibn Wahb" 
            people={10} 
            table="T7" 
            phone="+84 900 100 200" 
            status="payment" 
          />
        </div>

        <div className="mt-6">
          <NewReservationDialog tableId={selectedTableId} />
        </div>
      </div>

      <div className="w-2/3 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Tables</h1>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="floorPlan" className="flex-1">Floor Plan</TabsTrigger>
              <TabsTrigger value="list" className="flex-1">List View</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="floorPlan" className="mt-0">
              <div className="flex gap-2 mb-6">
                <TableSection 
                  title="Main Dining" 
                  isActive={activeSection === 'mainDining'} 
                  count={tableCounts.mainDining}
                  onClick={() => setActiveSection('mainDining')}
                />
                <TableSection 
                  title="Terrace" 
                  isActive={activeSection === 'terrace'} 
                  count={tableCounts.terrace}
                  onClick={() => setActiveSection('terrace')}
                />
                <TableSection 
                  title="Outdoor" 
                  isActive={activeSection === 'outdoor'} 
                  count={tableCounts.outdoor}
                  onClick={() => setActiveSection('outdoor')}
                />
              </div>
              
              <FloorPlanGrid 
                tables={tables} 
                selectedTable={selectedTableId}
                onSelectTable={handleSelectTable}
                section={activeSection}
              />
              
              {selectedTableId && (
                <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white/50">
                  <h3 className="text-lg font-medium mb-2">Selected Table Details</h3>
                  {(() => {
                    const table = tables.find(t => t.id === selectedTableId);
                    if (!table) return <p>No table selected</p>;
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Table Number:</span>
                          <span className="font-medium">{table.number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{table.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-medium",
                              table.status === TableStatus.Available ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              table.status === TableStatus.Reserved ? "bg-red-100 text-red-800 hover:bg-red-100" :
                              "bg-orange-100 text-orange-800 hover:bg-orange-100"
                            )}
                          >
                            {table.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Section:</span>
                          <span className="font-medium">{table.section}</span>
                        </div>
                        
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                          <Button variant="outline" className="flex-1">
                            Edit Table
                          </Button>
                          {table.status === TableStatus.Available && (
                            <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                              Reserve Table
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Table No.
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Section
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tables.map((table) => (
                      <tr 
                        key={table.id} 
                        className={cn(
                          "hover:bg-gray-50 cursor-pointer",
                          selectedTableId === table.id ? "bg-gray-50" : ""
                        )}
                        onClick={() => handleSelectTable(table.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {table.number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {table.capacity} Seats
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {table.section}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-medium",
                              table.status === TableStatus.Available ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              table.status === TableStatus.Reserved ? "bg-red-100 text-red-800 hover:bg-red-100" :
                              "bg-orange-100 text-orange-800 hover:bg-orange-100"
                            )}
                          >
                            {table.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button 
                              size="sm" 
                              className={
                                table.status === TableStatus.Available 
                                  ? "bg-teal-600 hover:bg-teal-700" 
                                  : "bg-red-600 hover:bg-red-700"
                              }
                            >
                              {table.status === TableStatus.Available ? "Reserve" : "Change Status"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Floor Plan Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Add New Section
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Section name" 
                          className="rounded-md border border-gray-300 flex-1 px-3 py-2 text-sm"
                        />
                        <Button className="bg-teal-600 hover:bg-teal-700">
                          Add Section
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Add New Table
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <input 
                          type="text" 
                          placeholder="Table number" 
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                        <input 
                          type="number" 
                          placeholder="Capacity" 
                          min="1"
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                        <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                          <option value="">Select section</option>
                          <option value="mainDining">Main Dining</option>
                          <option value="terrace">Terrace</option>
                          <option value="outdoor">Outdoor</option>
                        </select>
                      </div>
                      <Button className="bg-teal-600 hover:bg-teal-700 mt-2">
                        Add Table
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Table Status Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span>Reserved</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                        <span>On Dine</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Custom Status
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ManageTable;
