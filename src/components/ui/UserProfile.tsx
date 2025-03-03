
import React from 'react';
import { Bell } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';

const UserProfile = () => {
  const { user } = useRestaurant();

  return (
    <div className="flex items-center space-x-4">
      <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
        <Bell size={20} className="text-gray-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-100">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{user.name}</span>
          <span className="text-xs text-gray-500">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
