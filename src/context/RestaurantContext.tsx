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
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>(activeOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date() } 
          : order
      )
    );
    
    toast.success(`Order status updated to ${status}`);
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

  return (
    <RestaurantContext.Provider
      value={{
        user: currentUser,
        orders,
        tables,
        menuItems,
        categories: menuCategories,
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
