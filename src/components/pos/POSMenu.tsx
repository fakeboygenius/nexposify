
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Minus, Utensils, Search } from 'lucide-react';
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
      {/* Menu Section (2/3 width) */}
      <div className="w-2/3 pr-4 h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">Menu</h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            <CategoryButton 
              name="All" 
              isActive={!selectedCategory} 
              onClick={() => setSelectedCategory(null)} 
              icon="🍽️" 
            />
            {categories.map(category => (
              <CategoryButton 
                key={category.id}
                name={category.name} 
                isActive={selectedCategory === category.id} 
                onClick={() => setSelectedCategory(category.id)} 
                icon={category.icon || "🍴"}
              />
            ))}
          </div>
        </div>
        
        {/* Menu Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-auto h-full pb-4">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="border rounded-lg overflow-hidden"
            >
              <div className="h-32 bg-gray-100 relative">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Utensils size={32} className="text-gray-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-300 text-gray-500"
                      disabled={!quantities[item.id]}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center">{quantities[item.id] || 0}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToOrder(item.id)}
                    disabled={!quantities[item.id]}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order Summary Section (1/3 width) */}
      <div className="w-1/3 border-l pl-4 h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Current Order</h2>
          <p className="text-sm text-gray-500">
            {currentOrder 
              ? `Ticket #${currentOrder.id.slice(-5)} - Table ${currentOrder.tableNumber}`
              : 'New Order'}
          </p>
        </div>
        
        <div className="flex-1 overflow-auto mb-4">
          {orderItems.length > 0 ? (
            <div className="space-y-3">
              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {item.quantity}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-8 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-gray-500 mb-2">No items added yet</p>
              <p className="text-sm text-gray-400">
                Select items from the menu to add them to the order
              </p>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Tax (10%)</span>
            <span className="font-medium">${(calculateTotal() * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-auto">
          <Button 
            variant="outline" 
            className="flex-1"
          >
            Save
          </Button>
          <Button 
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            onClick={onGoToPayment}
            disabled={orderItems.length === 0}
          >
            Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  icon: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  name, 
  isActive, 
  onClick, 
  icon 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap",
      isActive 
        ? "bg-blue-50 border-blue-500 text-blue-700" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
    )}
  >
    <span>{icon}</span>
    <span>{name}</span>
  </button>
);

export default POSMenu;
