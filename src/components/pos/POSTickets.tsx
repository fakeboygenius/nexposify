
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { OrderStatus, PaymentStatus } from '@/lib/types';
import { 
  ChevronLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Printer, 
  Search, 
  CreditCard, 
  FileText, 
  PenTool,
  Menu,
  List
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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

  const getOrderStatusStyle = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.New:
        return "bg-blue-100 text-blue-800";
      case OrderStatus.InKitchen:
        return "bg-yellow-100 text-yellow-800";
      case OrderStatus.Ready: 
        return "bg-green-100 text-green-800";
      case OrderStatus.Served:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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
        <div className="flex-1 overflow-auto">
          {tableOrders.length > 0 ? (
            <div className="space-y-3">
              {tableOrders.map(order => (
                <div 
                  key={order.id}
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all",
                    selectedTicket === order.id ? "border-blue-500 bg-blue-50" : ""
                  )}
                  onClick={() => handleTicketClick(order.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">Ticket #{order.id.slice(-5)}</p>
                      <p className="text-sm text-gray-500">{formatTime(order.createdAt)}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusStyle(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <p className="text-sm mb-1">Items: {order.items.length}</p>
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-2 border-t">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={14} />
                      <span>{Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000)} mins ago</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-full hover:bg-gray-100">
                        <Edit size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 rounded-full hover:bg-red-50">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <p className="text-gray-500 mb-4">No tickets for this table yet</p>
              <Button onClick={handleNewTicket}>Create New Ticket</Button>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Order details */}
      {showTicketDetails && selectedOrder && (
        <div className="w-2/3 border-l pl-4 h-full overflow-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">Order Details</h2>
              <p className="text-sm text-gray-500">
                Ticket #{selectedOrder.id.slice(-5)} • Table {selectedOrder.tableNumber}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setShowTicketDetails(false)}
              >
                <ChevronLeft size={16} />
                Back
              </Button>
              <Button 
                size="sm"
                className="flex items-center gap-1"
                onClick={handleContinueOrder}
              >
                Continue Order
              </Button>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white p-4 rounded-lg border mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">
                  {selectedOrder.customerName || 'Guest Customer'}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(selectedOrder.createdAt)} • {formatTime(selectedOrder.createdAt)}
                </p>
                <p className="mt-1">Table {selectedOrder.tableNumber} • {selectedOrder.items.length} items</p>
              </div>
              
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getOrderStatusStyle(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
                {selectedOrder.paymentStatus && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedOrder.paymentStatus === PaymentStatus.Paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrder.paymentStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Type Selection */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-700">Order Type:</div>
            <div className="flex gap-2">
              <Button 
                variant={orderType === 'dine-in' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleOrderTypeChange('dine-in')}
                className="text-xs px-3"
              >
                Dine In
              </Button>
              <Button 
                variant={orderType === 'takeout' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleOrderTypeChange('takeout')}
                className="text-xs px-3"
              >
                Takeout
              </Button>
              <Button 
                variant={orderType === 'delivery' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleOrderTypeChange('delivery')}
                className="text-xs px-3"
              >
                Delivery
              </Button>
              <Button 
                variant={orderType === 'curbside' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleOrderTypeChange('curbside')}
                className="text-xs px-3"
              >
                Curbside
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="ml-1">History</span>
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="ml-1">Discount</span>
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 10h18M8 3v6M16 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="ml-1">Coupon</span>
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 9h8M8 13h5M8 17h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="ml-1">Note</span>
            </Button>
          </div>
          
          {/* Order Items */}
          <div className="bg-white rounded-lg border mb-4">
            <div className="p-3 border-b bg-gray-50 font-medium flex justify-between items-center">
              <span>Order Items</span>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-gray-200">
                  <Menu size={16} className="text-gray-500" />
                </button>
                <button className="p-1 rounded hover:bg-gray-200">
                  <List size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            {selectedOrder.items.map((item, index) => (
              <div key={item.id} className="p-4 border-b last:border-b-0">
                <div className="flex justify-between mb-1">
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {item.quantity}
                    </span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.specialInstructions && (
                        <p className="text-sm text-gray-500 mt-1">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                      {item.modifiers && item.modifiers.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.modifiers.map((mod, i) => (
                            <Badge key={i} variant="red" className="text-xs">
                              {mod}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    <Edit size={14} />
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs text-red-600 hover:text-red-700">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg border mb-4">
            <div className="p-3 border-b bg-gray-50 font-medium">
              Order Summary
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${selectedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">${(selectedOrder.total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service Charge</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium">$0.00</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(selectedOrder.total * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
              <Printer size={16} />
              Print
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
              <Edit size={16} />
              Edit Items
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
              <PenTool size={16} />
              Add Note
            </Button>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
              <FileText size={16} />
              Split Bill
            </Button>
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-1">
              <CreditCard size={16} />
              Pay Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSTickets;
