
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Minus, Utensils, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface POSMenuProps {
  ticketId: string | null;
  onGoToPayment: () => void;
}

const POSMenu: React.FC<POSMenuProps> = ({ ticketId, onGoToPayment }) => {
  const { menuItems, categories, orders, addOrderItem } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Get the current order if it exists
  const currentOrder = ticketId ? orders.find(order => order.id === ticketId) : null;

  // Filter menu items based on category and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + delta)
    }));
  };

  const handleAddToOrder = (itemId: string) => {
    const quantity = quantities[itemId] || 0;
    if (quantity > 0) {
      const item = menuItems.find(item => item.id === itemId);
      if (item) {
        addOrderItem(item, quantity);
        
        // In a real app, this would update the order in the backend
        // Here we just update the local state for demo purposes
        setOrderItems(prev => [
          ...prev,
          {
            id: `item-${Date.now()}`,
            name: item.name,
            price: item.price,
            quantity
          }
        ]);
        
        // Reset quantity after adding
        setQuantities(prev => ({
          ...prev,
          [itemId]: 0
        }));
      }
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div className="h-full flex">
      {/* Left side: Table info and order summary (1/4 width) - SambaPOS style */}
      <div className="w-1/4 border-r pr-4 h-full flex flex-col">
        <div className="mb-4 border p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Table</p>
          <p className="font-medium text-lg">
            {currentOrder ? `${currentOrder.tableNumber}` : 'New Order'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Status</p>
          <p className="font-medium">
            {currentOrder ? currentOrder.status : 'New'}
          </p>
        </div>
        
        <div className="flex-1 overflow-auto mb-4">
          {orderItems.length > 0 ? (
            <div className="space-y-1">
              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.quantity}x</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-gray-500 mb-2">No items added yet</p>
              <p className="text-sm text-gray-400">
                Select items from the menu
              </p>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Balance:</span>
            <span className="text-red-600">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button 
            variant="outline"
            className="py-6"
          >
            Settle
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600 py-6"
            onClick={onGoToPayment}
          >
            Close
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs py-1"
          >
            Print Bill
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="text-xs py-1"
          >
            Add Ticket
          </Button>
        </div>
      </div>
      
      {/* Middle section: Categories (1/4 width) */}
      <div className="w-1/4 px-2 h-full overflow-auto">
        <div className="grid grid-cols-1 gap-1">
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "justify-start h-16 text-left",
                selectedCategory === category.id
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-orange-400 hover:bg-orange-500"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Right side: Menu items (2/4 width) */}
      <div className="w-2/4 pl-2 h-full overflow-auto">
        <div className="grid grid-cols-2 gap-1">
          {filteredItems.map(item => (
            <Button
              key={item.id}
              onClick={() => {
                handleQuantityChange(item.id, 1);
                handleAddToOrder(item.id);
              }}
              className="h-24 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700"
            >
              <span className="text-lg font-medium text-white">{item.name}</span>
              <span className="text-sm text-white">${item.price.toFixed(2)}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default POSMenu;
