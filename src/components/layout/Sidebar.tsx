
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  ListOrdered, 
  Utensils, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  CreditCard,
  ShoppingBag,
  Truck,
  Search,
  Tag,
  Ticket
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRestaurant } from '@/context/RestaurantContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink
      to={to}
      className={cn(
        "sidebar-item flex items-center gap-3 px-3 py-2 rounded-md transition-colors", 
        isActive ? "bg-teal-50 text-teal-700" : "hover:bg-gray-100",
        collapsed && "justify-center p-2"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={cn("flex items-center gap-2 px-4 py-6", collapsed ? "justify-center" : "")}>
      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
        <span className="text-white font-bold text-xl">S</span>
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">SambaPOS</span>
          <span className="text-gray-400 text-xs">Restaurant POS</span>
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "min-h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-60"
    )}>
      <Logo collapsed={collapsed} />
      
      <div className="flex flex-col flex-1 mt-6 space-y-1 px-2">
        <SidebarLink 
          to="/" 
          icon={<LayoutGrid size={20} />} 
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink 
          to="/pos" 
          icon={<CreditCard size={20} />} 
          label="Tables"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/order-line" 
          icon={<ListOrdered size={20} />} 
          label="Order Line"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/pos?tab=tickets" 
          icon={<Ticket size={20} />} 
          label="Customer Tickets"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/customers" 
          icon={<Users size={20} />} 
          label="Customers"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/delivery" 
          icon={<Truck size={20} />} 
          label="Delivery"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/loyalty" 
          icon={<Tag size={20} />} 
          label="SambaCard"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/manage-dishes" 
          icon={<Utensils size={20} />} 
          label="Menu Items"
          collapsed={collapsed} 
        />
      </div>
      
      <div className="mt-auto flex flex-col space-y-1 px-2 pb-8">
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={20} />} 
          label="Settings"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/help" 
          icon={<HelpCircle size={20} />} 
          label="Help Center"
          collapsed={collapsed} 
        />
        <NavLink
          to="/logout"
          className={cn(
            "sidebar-item flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors",
            collapsed && "justify-center p-2"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </NavLink>
      </div>

      <button 
        onClick={toggleCollapse}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-md z-10"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>
  );
};

export default Sidebar;
