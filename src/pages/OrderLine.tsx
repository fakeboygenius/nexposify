import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Edit, Trash2, Printer, Plus, Minus, ChevronLeft, ChevronRight, Utensils } from 'lucide-react';
import { OrderStatus, PaymentMethod, MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const OrderLine = () => {
  const { orders, activeOrderDetails, updateOrderStatus, selectOrder, addOrderItem } = useRestaurant();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Initialize quantities for menu items
  React.useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    activeOrderDetails.items.forEach((item: any) => {
      initialQuantities[item.id] = 0;
    });
    setQuantities(initialQuantities);
  }, [activeOrderDetails]);

  // Filter orders based on selected status
  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === selectedStatus.toLowerCase());

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleOrderSelect = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      selectOrder(order);
      setSelectedOrderId(orderId);
    }
  };

  const handleStatusUpdate = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToOrder = (name: string, price: number, itemId: string, quantity: number) => {
    if (quantity > 0) {
      // Create a complete MenuItem object with all required properties
      const menuItem: MenuItem = {
        id: itemId,
        name,
        price,
        category: "Menu", // Default category
        image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg", // Default image
        available: true // Assuming the item is available since we're adding it
      };
      addOrderItem(menuItem, quantity);
    }
  };

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.New:
        return 'bg-blue-100 text-blue-600';
      case OrderStatus.InKitchen:
        return 'bg-teal-100 text-teal-600';
      case OrderStatus.Ready:
        return 'bg-purple-100 text-purple-600';
      case OrderStatus.WaitList:
        return 'bg-orange-100 text-orange-600';
      case OrderStatus.Served:
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusActionButton = (status: OrderStatus, orderId: string) => {
    switch (status) {
      case OrderStatus.New:
        return (
          <button
            onClick={() => handleStatusUpdate(orderId, OrderStatus.InKitchen)}
            className="bg-teal-500 text-white px-3 py-1 rounded-md text-xs font-medium"
          >
            In Kitchen
          </button>
        );
      case OrderStatus.InKitchen:
        return (
          <button
            onClick={() => handleStatusUpdate(orderId, OrderStatus.Ready)}
            className="bg-purple-500 text-white px-3 py-1 rounded-md text-xs font-medium"
          >
            Ready
          </button>
        );
      case OrderStatus.WaitList:
        return (
          <button
            onClick={() => handleStatusUpdate(orderId, OrderStatus.InKitchen)}
            className="bg-teal-500 text-white px-3 py-1 rounded-md text-xs font-medium"
          >
            In Kitchen
          </button>
        );
      case OrderStatus.Ready:
        return (
          <button
            onClick={() => handleStatusUpdate(orderId, OrderStatus.Served)}
            className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium"
          >
            Served
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Line</h1>
      </div>

      {/* Order Status Filters */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <StatusButton 
          label="All" 
          count={orders.length}
          isActive={selectedStatus === 'all'} 
          onClick={() => handleStatusChange('all')}
          color="bg-blue-500"
        />
        <StatusButton 
          label="Dine In" 
          count={orders.filter(o => o.status === OrderStatus.DineIn).length}
          isActive={selectedStatus === 'dine-in'} 
          onClick={() => handleStatusChange('dine-in')}
          color="bg-teal-500"
        />
        <StatusButton 
          label="Wait List" 
          count={orders.filter(o => o.status === OrderStatus.WaitList).length}
          isActive={selectedStatus === 'wait-list'} 
          onClick={() => handleStatusChange('wait-list')}
          color="bg-orange-500"
        />
        <StatusButton 
          label="Take Away" 
          count={orders.filter(o => o.status === OrderStatus.TakeAway).length}
          isActive={selectedStatus === 'take-away'} 
          onClick={() => handleStatusChange('take-away')}
          color="bg-purple-500"
        />
        <StatusButton 
          label="Served" 
          count={orders.filter(o => o.status === OrderStatus.Served).length}
          isActive={selectedStatus === 'served'} 
          onClick={() => handleStatusChange('served')}
          color="bg-green-700"
        />
      </div>

      {/* Horizontal Orders Row */}
      <div className="flex overflow-x-auto gap-4 mb-8 pb-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => handleOrderSelect(order.id)}
              className={cn(
                "order-item p-4 rounded-lg cursor-pointer border min-w-[220px]", 
                selectedOrderId === order.id ? "border-teal-500 shadow-md" : "border-gray-200",
                order.status === OrderStatus.WaitList && "bg-orange-50",
                order.status === OrderStatus.InKitchen && "bg-teal-50",
                order.status === OrderStatus.Ready && "bg-purple-50"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800">Order #{order.id.slice(-5)}</p>
                  <p className="text-sm">Table {order.tableNumber}</p>
                </div>
                <div>
                  <Badge className={getStatusBadgeColor(order.status)}>
                    {order.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm font-bold">Item: {order.items.reduce((acc, item) => acc + item.quantity, 0)}x</p>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000)} mins ago
                </span>
                {getStatusActionButton(order.status, order.id)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg w-full">
            <p className="text-gray-500">No orders with the selected status</p>
          </div>
        )}
      </div>

      {/* Order Details Section - Now it's below the horizontal orders row */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Table No #{activeOrderDetails.tableNumber}</h2>
            <p className="text-gray-600">Order #{activeOrderDetails.orderNumber}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Edit size={18} />
            </button>
            <button className="p-2 rounded-lg text-red-500 hover:bg-red-50">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-700">{activeOrderDetails.people} People</p>
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-3">Ordered Items</h3>
          <div className="space-y-3 max-h-[180px] overflow-y-auto">
            {activeOrderDetails.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-500">{item.quantity}x</span>
                  <span className="ml-2">{item.name}</span>
                </div>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-bold mb-3">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="font-medium">${activeOrderDetails.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Tax</p>
              <p className="font-medium">${activeOrderDetails.tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Donation for Palestine</p>
              <p className="font-medium">${activeOrderDetails.donation.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between">
            <p className="font-bold">Total Payable</p>
            <p className="font-bold">${activeOrderDetails.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-3">Payment Method</h3>
          <div className="flex gap-3">
            <Button variant="outline" className={cn("w-20", activeOrderDetails.paymentMethod === PaymentMethod.Cash && "border-teal-500 bg-teal-50")}>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border flex items-center justify-center">
                  {activeOrderDetails.paymentMethod === PaymentMethod.Cash && 
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
                </span>
                Cash
              </span>
            </Button>
            <Button variant="outline" className={cn("w-20", activeOrderDetails.paymentMethod === PaymentMethod.Card && "border-teal-500 bg-teal-50")}>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border flex items-center justify-center">
                  {activeOrderDetails.paymentMethod === PaymentMethod.Card && 
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
                </span>
                Card
              </span>
            </Button>
            <Button variant="outline" className="w-20">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border flex items-center justify-center"></span>
                Scan
              </span>
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} />
            Print
          </Button>
          <Button className="flex-1 bg-teal-500 hover:bg-teal-600">Place Order</Button>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Foodies Menu</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="rounded-full p-2 h-auto w-auto">
              <ChevronLeft size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full p-2 h-auto w-auto">
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
          <MenuCategoryButton 
            name="All Menu" 
            count={154} 
            isActive={true} 
            icon="🍽️" 
          />
          <MenuCategoryButton 
            name="Special" 
            count={12} 
            isActive={false} 
            icon="🌟" 
          />
          <MenuCategoryButton 
            name="Soups" 
            count={3} 
            isActive={false} 
            icon="🥣" 
          />
          <MenuCategoryButton 
            name="Desserts" 
            count={19} 
            isActive={false} 
            icon="🍰" 
          />
          <MenuCategoryButton 
            name="Chickens" 
            count={10} 
            isActive={false} 
            icon="🍗" 
          />
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-4 gap-4">
          <FoodMenuItem 
            id="ordit1"
            name="Grilled Salmon Steak" 
            category="Lunch"
            price={15.00}
            quantity={quantities['ordit1'] || 0}
            onIncrease={() => handleQuantityChange('ordit1', 1)}
            onDecrease={() => handleQuantityChange('ordit1', -1)}
            onAdd={() => handleAddToOrder("Grilled Salmon Steak", 15.0, "ordit1", quantities['ordit1'] || 0)}
            image="/placeholder.svg"
          />
          <FoodMenuItem 
            id="ordit2"
            name="Tofu Poke Bowl" 
            category="Salad"
            price={7.00}
            quantity={quantities['ordit2'] || 0}
            onIncrease={() => handleQuantityChange('ordit2', 1)}
            onDecrease={() => handleQuantityChange('ordit2', -1)}
            onAdd={() => handleAddToOrder("Tofu Poke Bowl", 7.0, "ordit2", quantities['ordit2'] || 0)}
            image="/placeholder.svg"
          />
          <FoodMenuItem 
            id="ordit3"
            name="Pasta with Roast Beef" 
            category="Pasta"
            price={10.00}
            quantity={quantities['ordit3'] || 0}
            onIncrease={() => handleQuantityChange('ordit3', 1)}
            onDecrease={() => handleQuantityChange('ordit3', -1)}
            onAdd={() => handleAddToOrder("Pasta with Roast Beef", 10.0, "ordit3", quantities['ordit3'] || 0)}
            image="/placeholder.svg"
          />
          <FoodMenuItem 
            id="ordit4"
            name="Beef Steak" 
            category="Beef"
            price={30.00}
            quantity={quantities['ordit4'] || 0}
            onIncrease={() => handleQuantityChange('ordit4', 1)}
            onDecrease={() => handleQuantityChange('ordit4', -1)}
            onAdd={() => handleAddToOrder("Beef Steak", 30.0, "ordit4", quantities['ordit4'] || 0)}
            image="/placeholder.svg"
          />
          <FoodMenuItem 
            id="ordit5"
            name="Shrimp Rice Bowl" 
            category="Rice"
            price={6.00}
            quantity={quantities['ordit5'] || 0}
            onIncrease={() => handleQuantityChange('ordit5', 1)}
            onDecrease={() => handleQuantityChange('ordit5', -1)}
            onAdd={() => handleAddToOrder("Shrimp Rice Bowl", 6.0, "ordit5", quantities['ordit5'] || 0)}
            image="/placeholder.svg"
          />
          <FoodMenuItem 
            id="ordit6"
            name="Apple Stuffed Pancake" 
            category="Dessert"
            price={35.00}
            quantity={quantities['ordit6'] || 0}
            onIncrease={() => handleQuantityChange('ordit6', 1)}
            onDecrease={() => handleQuantityChange('ordit6', -1)}
            onAdd={() => handleAddToOrder("Apple Stuffed Pancake", 35.0, "ordit6", quantities['ordit6'] || 0)}
            image="/placeholder.svg"
          />
          <FoodMenuItem 
            id="ordit7"
            name="Chicken Quinoa & Herbs" 
            category="Chicken"
            price={12.00}
            quantity={quantities['ordit7'] || 0}
            onIncrease={() => handleQuantityChange('ordit7', 1)}
            onDecrease={() => handleQuantityChange('ordit7', -1)}
            onAdd={() => handleAddToOrder("Chicken Quinoa & Herbs", 12.0, "ordit7", quantities['ordit7'] || 0)}
            image="/placeholder.svg"
          />
          <FoodMenuItem 
            id="ordit8"
            name="Vegetable Shrimp" 
            category="Salad"
            price={10.00}
            quantity={quantities['ordit8'] || 0}
            onIncrease={() => handleQuantityChange('ordit8', 1)}
            onDecrease={() => handleQuantityChange('ordit8', -1)}
            onAdd={() => handleAddToOrder("Vegetable Shrimp", 10.0, "ordit8", quantities['ordit8'] || 0)}
            image="/placeholder.svg"
          />
        </div>
      </div>
    </div>
  );
};

// Component for Order Status Buttons
interface StatusButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

const StatusButton: React.FC<StatusButtonProps> = ({ label, count, isActive, onClick, color }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full text-sm min-w-[100px] transition-all",
      isActive 
        ? `${color} text-white` 
        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
    )}
  >
    <span className="font-medium">{label}</span>
    <span className={cn(
      "flex items-center justify-center text-xs rounded-full w-6 h-6",
      isActive 
        ? "bg-white text-gray-800" 
        : `${color} text-white`
    )}>
      {count}
    </span>
  </button>
);

// Component for Menu Category Buttons
interface MenuCategoryButtonProps {
  name: string;
  count: number;
  isActive: boolean;
  icon: string;
}

const MenuCategoryButton: React.FC<MenuCategoryButtonProps> = ({ name, count, isActive, icon }) => (
  <button
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all",
      isActive 
        ? "bg-teal-50 border-teal-500 text-teal-700" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
    )}
  >
    <span className="text-xl">{icon}</span>
    <div className="text-left">
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-gray-500">{count} items</p>
    </div>
  </button>
);

// Component for Food Menu Items
interface FoodMenuItemProps {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onAdd: () => void;
}

const FoodMenuItem: React.FC<FoodMenuItemProps> = ({ 
  id,
  name, 
  category, 
  price, 
  quantity,
  image,
  onIncrease,
  onDecrease,
  onAdd
}) => (
  <div className="menu-item border border-gray-200 rounded-lg overflow-hidden">
    <div className="bg-gray-100 h-28 flex items-center justify-center">
      <div className="rounded-full w-20 h-20 bg-white flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="w-14 h-14 opacity-40" />
      </div>
    </div>
    <div className="p-3">
      <p className="text-xs text-gray-500 mb-1">{category}</p>
      <p className="font-medium text-sm mb-2 truncate">{name}</p>
      <div className="flex justify-between items-center">
        <p className="font-bold">${price.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <button 
            onClick={onDecrease}
            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            disabled={quantity === 0}
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm">{quantity}</span>
          <button 
            onClick={onIncrease}
            className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white hover:bg-teal-600"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default OrderLine;
