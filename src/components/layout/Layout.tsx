
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from '@/components/ui/SearchBar';
import UserProfile from '@/components/ui/UserProfile';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="w-1/3">
            <SearchBar />
          </div>
          <UserProfile />
        </div>
        
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
