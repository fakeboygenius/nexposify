
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search menu, orders and more...",
  className = ""
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="absolute left-3 text-gray-400">
        <Search size={18} />
      </div>
      <input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
      />
    </div>
  );
};

export default SearchBar;
