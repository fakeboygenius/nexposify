import React, { useState, useEffect } from 'react';
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
  Edit,
  MoreHorizontal,
  Printer,
  Trash2,
  Settings,
  RefreshCw,
  CheckSquare,
  Square,
  Coffee as CoffeeFilled,
  ChevronDown
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { toast } from "sonner";

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

const TableQuickActions = ({ tableId }: { tableId: string }) => {
  const { tables, updateTableStatus } = useRestaurant();
  const navigate = useNavigate();
  const table = tables.find(t => t.id === tableId);
  
  if (!table) return null;
  
  const handleStatusChange = (newStatus: TableStatus) => {
    updateTableStatus(tableId, newStatus);
    toast.success(`Table ${table.number} status changed to ${newStatus}`);
  };
  
  const handleViewOrders = () => {
    navigate('/order-line', { state: { tableId } });
  };
  
  return (
    <div className="absolute z-10 top-2 right-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Table {table.number}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleViewOrders}>
            <CoffeeFilled className="mr-2 h-4 w-4" /> View Orders
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Change Status</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => handleStatusChange(TableStatus.Available)}
            className="text-teal-600"
          >
            <div className="h-2 w-2 rounded-full bg-teal-500 mr-2" /> Available
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleStatusChange(TableStatus.Reserved)}
            className="text-red-600"
          >
            <div className="h-2 w-2 rounded-full bg-red-500 mr-2" /> Reserved
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleStatusChange(TableStatus.Occupied)}
            className="text-orange-600"
          >
            <div className="h-2 w-2 rounded-full bg-orange-500 mr-2" /> Occupied
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
          <div key={index} className="min-h-24 flex items-center justify-center relative">
            {table ? (
              <>
                <TableComponent
                  id={table.id}
                  number={table.number}
                  capacity={table.capacity}
                  status={table.status}
                  position={{ row: Math.floor(index / sectionConfig.cols), col: index % sectionConfig.cols }}
                  onSelect={onSelectTable}
                  isSelected={selectedTable === table.id}
                />
                <TableQuickActions tableId={table.id} />
              </>
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
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    guests: 2,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '19:00',
    notes: ''
  });

  const selectedTable = tables.find(table => table.id === tableId);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableId) {
      // Combine date and time into a Date object
      const dateTimeStr = `${formData.date}T${formData.time}`;
      const reservationDateTime = new Date(dateTimeStr);
      
      addReservation({
        tableId,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        guests: formData.guests,
        time: reservationDateTime,
        notes: formData.notes,
        status: ReservationStatus.Confirmed
      });
      
      // Reset form and close dialog
      setFormData({
        customerName: '',
        customerPhone: '',
        guests: 2,
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '19:00',
        notes: ''
      });
      setIsOpen(false);
      toast.success(`Reservation created for ${formData.customerName}`);
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
              <Label htmlFor="customerName">Customer Name</Label>
              <Input 
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Customer name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input 
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Input 
                id="guests"
                name="guests"
                type="number"
                min="1"
                value={formData.guests}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea 
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
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

const TableFilters = ({ 
  onStatusFilter, 
  onSectionFilter,
  onCapacityFilter,
  selectedFilters
}: { 
  onStatusFilter: (status: TableStatus | null) => void;
  onSectionFilter: (section: string | null) => void;
  onCapacityFilter: (capacity: number | null) => void;
  selectedFilters: {
    status: TableStatus | null;
    section: string | null;
    capacity: number | null;
  };
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Status
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onStatusFilter(null)} className="justify-between">
            All
            {selectedFilters.status === null && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilter(TableStatus.Available)} className="justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-teal-500 mr-2" />
              Available
            </div>
            {selectedFilters.status === TableStatus.Available && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilter(TableStatus.Reserved)} className="justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
              Reserved
            </div>
            {selectedFilters.status === TableStatus.Reserved && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilter(TableStatus.Occupied)} className="justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-orange-500 mr-2" />
              Occupied
            </div>
            {selectedFilters.status === TableStatus.Occupied && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Coffee className="h-4 w-4" />
            Section
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onSectionFilter(null)} className="justify-between">
            All Sections
            {selectedFilters.section === null && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSectionFilter('mainDining')} className="justify-between">
            Main Dining
            {selectedFilters.section === 'mainDining' && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSectionFilter('terrace')} className="justify-between">
            Terrace
            {selectedFilters.section === 'terrace' && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSectionFilter('outdoor')} className="justify-between">
            Outdoor
            {selectedFilters.section === 'outdoor' && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Capacity
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onCapacityFilter(null)} className="justify-between">
            All
            {selectedFilters.capacity === null && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCapacityFilter(2)} className="justify-between">
            2 Seats
            {selectedFilters.capacity === 2 && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCapacityFilter(4)} className="justify-between">
            4 Seats
            {selectedFilters.capacity === 4 && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCapacityFilter(6)} className="justify-between">
            6+ Seats
            {selectedFilters.capacity === 6 && <CheckSquare className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {(selectedFilters.status !== null || selectedFilters.section !== null || selectedFilters.capacity !== null) && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            onStatusFilter(null);
            onSectionFilter(null);
            onCapacityFilter(null);
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

const BulkActions = ({ selectedIds, onClearSelection }: { selectedIds: string[], onClearSelection: () => void }) => {
  const { updateTableStatus } = useRestaurant();
  
  const handleBulkStatusChange = (status: TableStatus) => {
    selectedIds.forEach(id => {
      updateTableStatus(id, status);
    });
    toast.success(`Updated ${selectedIds.length} tables to ${status}`);
    onClearSelection();
  };
  
  if (selectedIds.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-200 rounded-lg p-3 flex items-center gap-3 z-50">
      <div className="text-sm font-medium mr-2">
        {selectedIds.length} {selectedIds.length === 1 ? 'table' : 'tables'} selected
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-teal-600 hover:bg-teal-50 border-teal-200"
        onClick={() => handleBulkStatusChange(TableStatus.Available)}
      >
        Set Available
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600 hover:bg-red-50 border-red-200"
        onClick={() => handleBulkStatusChange(TableStatus.Reserved)}
      >
        Set Reserved
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-orange-600 hover:bg-orange-50 border-orange-200"
        onClick={() => handleBulkStatusChange(TableStatus.Occupied)}
      >
        Set Occupied
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearSelection}
      >
        Clear Selection
      </Button>
    </div>
  );
};

const ManageTable = () => {
  const navigate = useNavigate();
  const { tables, reservations, updateTableStatus } = useRestaurant();
  const [activeSection, setActiveSection] = useState('mainDining');
  const [activeTab, setActiveTab] = useState('floorPlan');
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: null as TableStatus | null,
    section: null as string | null,
    capacity: null as number | null
  });
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  
  const handleSelectTable = (id: string) => {
    // If in selection mode, toggle selection
    if (selectedItems.length > 0) {
      setSelectedItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
      return;
    }
    
    // Otherwise proceed to normal table selection
    setSelectedTableId(prevId => prevId === id ? null : id);
    navigate('/order-line', { state: { tableId: id } });
  };
  
  const handleStatusFilter = (status: TableStatus | null) => {
    setFilters(prev => ({ ...prev, status }));
  };
  
  const handleSectionFilter = (section: string | null) => {
    setFilters(prev => ({ ...prev, section }));
  };
  
  const handleCapacityFilter = (capacity: number | null) => {
    setFilters(prev => ({ ...prev, capacity }));
  };
  
  const filteredTables = tables.filter(table => {
    // Apply search filter
    if (searchQuery && !table.number.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && table.status !== filters.status) {
      return false;
    }
    
    // Apply section filter
    if (filters.section && table.section !== filters.section) {
      return false;
    }
    
    // Apply capacity filter
    if (filters.capacity) {
      if (filters.capacity === 6) {
        if (table.capacity < 6) return false;
      } else {
        if (table.capacity !== filters.capacity) return false;
      }
    }
    
    return true;
  });
  
  const tableCounts = {
    mainDining: filteredTables.filter(t => t.section === 'mainDining').length,
    terrace: filteredTables.filter(t => t.section === 'terrace').length,
    outdoor: filteredTables.filter(t => t.section === 'outdoor').length,
  };

  // Reset selected items when tab changes
  useEffect(() => {
    setSelectedItems([]);
  }, [activeTab]);

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
            phone="+84 678 890
