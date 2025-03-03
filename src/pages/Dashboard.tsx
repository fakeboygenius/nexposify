
import React from 'react';
import { useRestaurant } from '@/context/RestaurantContext';

const Dashboard = () => {
  const { orders, tables } = useRestaurant();

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Coming soon message */}
      <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-gray-200 rounded-lg">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-600 mb-2">Dashboard Coming Soon</h3>
          <p className="text-gray-500">
            The dashboard with analytics and insights is under development.
            <br />
            Please use the sidebar to navigate to other sections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
