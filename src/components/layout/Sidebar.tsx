
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, ListOrdered, Utensils, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRestaurant } from '@/context/RestaurantContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn("sidebar-item", isActive && "active")
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-6">
      <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
        <span className="text-white font-bold text-xl">C</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-teal-600">CulinaTech</span>
        <span className="text-gray-400 text-xs">Station</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <Logo />
      
      <div className="flex flex-col flex-1 mt-6 space-y-1 px-2">
        <SidebarLink 
          to="/" 
          icon={<LayoutGrid size={20} />} 
          label="Dashboard" 
        />
        <SidebarLink 
          to="/order-line" 
          icon={<ListOrdered size={20} />} 
          label="Order Line" 
        />
        <SidebarLink 
          to="/manage-table" 
          icon={<LayoutGrid size={20} />} 
          label="Manage Table" 
        />
        <SidebarLink 
          to="/manage-dishes" 
          icon={<Utensils size={20} />} 
          label="Manage Dishes" 
        />
        <SidebarLink 
          to="/customers" 
          icon={<Users size={20} />} 
          label="Customers" 
        />
      </div>
      
      <div className="mt-auto flex flex-col space-y-1 px-2 pb-8">
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
        />
        <SidebarLink 
          to="/help" 
          icon={<HelpCircle size={20} />} 
          label="Help Center" 
        />
        <NavLink
          to="/logout"
          className="sidebar-item text-gray-600 hover:text-red-500"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
