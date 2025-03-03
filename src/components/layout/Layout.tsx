
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from '@/components/ui/SearchBar';
import UserProfile from '@/components/ui/UserProfile';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-teal-600">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="w-1/3">
            <SearchBar />
          </div>
          <UserProfile />
        </div>
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-[1200px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
