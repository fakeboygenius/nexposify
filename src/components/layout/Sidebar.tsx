
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, ListOrdered, Utensils, Users, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRestaurant } from '@/context/RestaurantContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn("sidebar-item", isActive && "active")
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={cn("flex items-center gap-2 px-4 py-6", collapsed ? "justify-center" : "")}>
      <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
        <span className="text-white font-bold text-xl">C</span>
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-bold text-teal-600">CulinaTech</span>
          <span className="text-gray-400 text-xs">Station</span>
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
          to="/order-line" 
          icon={<ListOrdered size={20} />} 
          label="Order Line"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/manage-table" 
          icon={<LayoutGrid size={20} />} 
          label="Manage Table"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/manage-dishes" 
          icon={<Utensils size={20} />} 
          label="Manage Dishes"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/pos" 
          icon={<CreditCard size={20} />} 
          label="POS System"
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/customers" 
          icon={<Users size={20} />} 
          label="Customers"
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
          className="sidebar-item text-gray-600 hover:text-red-500"
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
