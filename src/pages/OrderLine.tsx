
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Printer, CreditCard, Trash2 } from 'lucide-react';

const OrderLine = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tables } = useRestaurant();
  
  // Get tableId from URL state
  const tableId = location.state?.tableId;
  const selectedTable = tables.find(table => table.id === tableId);

  useEffect(() => {
    // If no tableId was provided, redirect back to manage tables
    if (!tableId) {
      navigate('/manage-table');
    }
  }, [tableId, navigate]);

  const handleBack = () => {
    navigate('/manage-table');
  };

  if (!selectedTable) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tables
          </Button>
          <div className="font-medium">
            Table: <span className="text-teal-600">{selectedTable.number}</span>
          </div>
          <div className="text-sm text-gray-500">
            Capacity: {selectedTable.capacity} | Status: {selectedTable.status}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" /> Save Order
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" size="sm">
            <CreditCard className="mr-2 h-4 w-4" /> Payment
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 grid grid-cols-3 gap-6">
        {/* Order Summary Section */}
        <div className="col-span-1 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-medium">Order Summary</h3>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <p className="text-gray-500 text-center py-8">No items added to this order yet.</p>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Categories & Items */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-medium">Menu Items</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item} 
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => console.log(`Item ${item} clicked`)}
                >
                  <div className="font-medium">Menu Item {item}</div>
                  <div className="text-sm text-gray-500">$10.99</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLine;
