import React, { createContext, useContext, useState } from 'react';
import { activeOrders, tables, menuItems, menuCategories, currentUser, reservations, customers, activeOrderDetails } from '@/data/mockData';
import { Order, Table, MenuItem, Category, UserProfile, Reservation, Customer, OrderStatus } from '@/lib/types';
import { toast } from 'sonner';

interface RestaurantContextType {
  user: UserProfile;
  orders: Order[];
  tables: Table[];
  menuItems: MenuItem[];
  categories: Category[];
  reservations: Reservation[];
  customers: Customer[];
  activeOrderDetails: any;
  
  currentView: string;
  selectedOrder: Order | null;
  selectedTable: Table | null;
  selectedCategory: Category | null;
  
  setCurrentView: (view: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  selectOrder: (order: Order | null) => void;
  selectTable: (table: Table | null) => void;
  selectCategory: (category: Category | null) => void;
  addOrderItem: (menuItem: MenuItem, quantity: number) => void;
  removeOrderItem: (orderItemId: string) => void;
  addMenuItem: (menuItem: MenuItem) => void;
  updateMenuItem: (menuItem: MenuItem) => void;
  deleteMenuItem: (menuItemId: string) => void;
  addCategory: (category: Category) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>(activeOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [menuItemsList, setMenuItemsList] = useState<MenuItem[]>(menuItems);
  const [categoriesList, setCategoriesList] = useState<Category[]>(menuCategories);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date() } 
          : order
      )
    );
    
    toast(`Order status updated to ${status}`);
  };

  const selectOrder = (order: Order | null) => {
    setSelectedOrder(order);
  };

  const selectTable = (table: Table | null) => {
    setSelectedTable(table);
  };

  const selectCategory = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const addOrderItem = (menuItem: MenuItem, quantity: number) => {
    toast(`Added ${quantity}x ${menuItem.name} to order`);
  };

  const removeOrderItem = (orderItemId: string) => {
    toast(`Item removed from order`);
  };

  const addMenuItem = (menuItem: MenuItem) => {
    setMenuItemsList(prev => [...prev, menuItem]);
    toast(`Added new dish: ${menuItem.name}`);
  };

  const updateMenuItem = (menuItem: MenuItem) => {
    setMenuItemsList(prev => 
      prev.map(item => item.id === menuItem.id ? menuItem : item)
    );
    toast(`Updated dish: ${menuItem.name}`);
  };

  const deleteMenuItem = (menuItemId: string) => {
    setMenuItemsList(prev => prev.filter(item => item.id !== menuItemId));
    toast(`Dish deleted successfully`);
  };

  const addCategory = (category: Category) => {
    setCategoriesList(prev => [...prev, category]);
    toast(`Added new category: ${category.name}`);
  };

  return (
    <RestaurantContext.Provider
      value={{
        user: currentUser,
        orders,
        tables,
        menuItems: menuItemsList,
        categories: categoriesList,
        reservations,
        customers,
        activeOrderDetails,
        currentView,
        selectedOrder,
        selectedTable,
        selectedCategory,
        setCurrentView,
        updateOrderStatus,
        selectOrder,
        selectTable,
        selectCategory,
        addOrderItem,
        removeOrderItem,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addCategory,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
