
import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Search, Plus, Grid2X2, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const ManageDishes = () => {
  const { categories, menuItems, selectedCategory, selectCategory } = useRestaurant();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter items by selected category and search term
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory 
      ? item.category === selectedCategory.name || item.subcategory === selectedCategory.name
      : true;
    
    const matchesSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });

  const currentCategoryName = selectedCategory ? selectedCategory.name : 'All Dishes';
  
  // Count items in each category for the display
  const getItemsInCategory = (categoryName: string) => {
    return menuItems.filter(item => 
      item.category === categoryName || item.subcategory === categoryName
    ).length;
  };

  const handleAddNewDish = () => {
    toast("Opening new dish form");
    // This would typically open a modal or redirect to a form
  };

  const handleAddNewCategory = () => {
    toast("Opening new category form");
    // This would typically open a modal for category creation
  };

  const handleSelectAll = (checked: boolean) => {
    // Implementation for selecting all visible dishes
    toast(checked ? "Selected all dishes" : "Deselected all dishes");
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar - Categories */}
      <div className="w-72 bg-white rounded-l-lg border-r border-gray-100 overflow-y-auto">
        <div className="px-4 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold">Dishes Category</h2>
        </div>

        <div className="py-2">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => selectCategory(category)}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedCategory?.id === category.id ? 'bg-teal-50 text-teal-600' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <span className="text-gray-500 text-sm">{category.count}</span>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 mt-auto sticky bottom-0 bg-white border-t border-gray-100">
          <Button 
            onClick={handleAddNewCategory} 
            className="w-full flex items-center justify-center gap-2"
            variant="default"
          >
            <Plus size={16} />
            Add New Category
          </Button>
        </div>
      </div>

      {/* Main content - Dishes */}
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Manage Dishes</h1>
          <div className="relative w-60">
            <input
              type="search"
              placeholder="Search dishes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-medium">{currentCategoryName} ({filteredItems.length})</h2>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 rounded-md">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid2X2 size={20} className={viewMode === 'grid' ? 'text-teal-600' : 'text-gray-500'} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List size={20} className={viewMode === 'list' ? 'text-teal-600' : 'text-gray-500'} />
                </button>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter
              </Button>
              
              <Button onClick={handleAddNewDish} className="flex items-center gap-2 bg-teal-600 text-white hover:bg-teal-700">
                <Plus size={16} />
                Add New Dishes
              </Button>
            </div>
          </div>

          {/* Empty state for adding first dish */}
          {filteredItems.length === 0 && selectedCategory && (
            <div className="border-2 border-dashed border-teal-300 rounded-lg p-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                <Plus size={24} className="text-teal-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">Add New Dish to {selectedCategory.name}</h3>
              <p className="text-gray-500 mb-4">Click button below to add your first dish</p>
              <Button onClick={handleAddNewDish} className="bg-teal-600 text-white hover:bg-teal-700">
                Add New Dish
              </Button>
            </div>
          )}

          {/* Dishes grid */}
          {filteredItems.length > 0 && (
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-3'}`}>
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`
                    menu-item bg-white rounded-lg border border-gray-100 overflow-hidden
                    ${viewMode === 'grid' ? '' : 'flex items-center'}
                  `}
                >
                  <div className={`${viewMode === 'grid' ? '' : 'flex items-center p-3 w-full'}`}>
                    <div className={`${viewMode === 'grid' ? 'p-3' : 'flex-none mr-3'}`}>
                      <Checkbox id={`check-${item.id}`} className="mr-2" />
                    </div>
                    
                    {viewMode === 'grid' ? (
                      <>
                        <div className="relative pb-[100%]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-gray-500 text-sm">{item.category}</p>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-teal-600 font-medium mt-1">${item.price.toFixed(2)}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 flex-none">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <p className="text-gray-500 text-sm">{item.category}</p>
                          <h3 className="font-medium">{item.name}</h3>
                        </div>
                        <div className="flex-none">
                          <p className="text-teal-600 font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDishes;
