
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ShoppingBag, 
  Truck, 
  Car,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type OrderType = 'dine-in' | 'takeout' | 'delivery' | 'curbside' | 'reservation';

interface OrderTypeSelectorProps {
  selectedType: OrderType;
  onTypeChange: (type: OrderType) => void;
}

const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div className="text-sm font-medium text-gray-700">Order Type:</div>
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={selectedType === 'dine-in' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('dine-in')}
          className="flex items-center gap-1 min-w-24"
        >
          <Users size={14} />
          <span>Dine In</span>
        </Button>
        <Button 
          variant={selectedType === 'takeout' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('takeout')}
          className="flex items-center gap-1 min-w-24"
        >
          <ShoppingBag size={14} />
          <span>Takeout</span>
        </Button>
        <Button 
          variant={selectedType === 'delivery' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('delivery')}
          className="flex items-center gap-1 min-w-24"
        >
          <Truck size={14} />
          <span>Delivery</span>
        </Button>
        <Button 
          variant={selectedType === 'curbside' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('curbside')}
          className="flex items-center gap-1 min-w-24"
        >
          <Car size={14} />
          <span>Curbside</span>
        </Button>
        <Button 
          variant={selectedType === 'reservation' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onTypeChange('reservation')}
          className="flex items-center gap-1 min-w-24"
        >
          <Clock size={14} />
          <span>Reservation</span>
        </Button>
      </div>
      
      {/* Additional options based on order type */}
      {selectedType === 'dine-in' && (
        <div className="mt-2 bg-blue-50 p-2 rounded-md border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Table Options:</div>
            <div className="flex gap-2">
              <Button size="xs" variant="ghost" className="h-7 text-xs">
                Merge Tables
              </Button>
              <Button size="xs" variant="ghost" className="h-7 text-xs">
                Split Table
              </Button>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline" className="text-xs flex items-center gap-1 h-7">
                  <span>Assign Seats</span>
                  <ChevronDown size={12} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-44">
                <div className="text-sm font-medium mb-2">Select Seats</div>
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((seat) => (
                    <button
                      key={seat}
                      className="p-1 text-xs border rounded hover:bg-gray-100"
                    >
                      Seat {seat}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline" className="text-xs flex items-center gap-1 h-7">
                  <span>Course Timing</span>
                  <ChevronDown size={12} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-44">
                <div className="text-sm font-medium mb-2">Serve Courses</div>
                <div className="space-y-1">
                  {['Appetizers', 'Mains', 'Desserts'].map((course) => (
                    <button
                      key={course}
                      className="w-full p-1 text-xs text-left border rounded hover:bg-gray-100"
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
      
      {selectedType === 'delivery' && (
        <div className="mt-2 bg-orange-50 p-2 rounded-md border border-orange-100">
          <div className="text-sm font-medium mb-1">Delivery Options:</div>
          <div className="flex gap-2">
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Assign Driver
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Delivery Time
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Delivery Address
            </Button>
          </div>
        </div>
      )}
      
      {selectedType === 'takeout' && (
        <div className="mt-2 bg-green-50 p-2 rounded-md border border-green-100">
          <div className="text-sm font-medium mb-1">Takeout Options:</div>
          <div className="flex gap-2">
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Pickup Time
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Packaging Options
            </Button>
          </div>
        </div>
      )}
      
      {selectedType === 'curbside' && (
        <div className="mt-2 bg-purple-50 p-2 rounded-md border border-purple-100">
          <div className="text-sm font-medium mb-1">Curbside Options:</div>
          <div className="flex gap-2">
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Vehicle Details
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Pickup Time
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Parking Spot
            </Button>
          </div>
        </div>
      )}
      
      {selectedType === 'reservation' && (
        <div className="mt-2 bg-yellow-50 p-2 rounded-md border border-yellow-100">
          <div className="text-sm font-medium mb-1">Reservation Details:</div>
          <div className="flex gap-2">
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Time Slot
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Party Size
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-xs">
              Special Requests
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTypeSelector;
