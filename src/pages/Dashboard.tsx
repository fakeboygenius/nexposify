
import React from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  Users, 
  LayoutGrid,
  Ticket,
  CreditCard,
  ShoppingCart,
  Truck,
} from 'lucide-react';

const Dashboard = () => {
  const { orders, tables, menuItems } = useRestaurant();
  const navigate = useNavigate();

  // Calculate some basic stats
  const totalOrders = orders.length;
  const activeTablesCount = tables.filter(table => table.status !== 'available').length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
  
  return (
    <div className="space-y-8 p-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Restaurant Dashboard</h1>
      </div>
      
      {/* SambaPOS-style Main Menu */}
      <div className="grid grid-cols-3 gap-2">
        <MenuCard 
          title="Tables" 
          icon={<LayoutGrid size={36} className="text-blue-500" />}
          onClick={() => navigate('/pos')}
          color="bg-blue-50 border-blue-100"
        />
        <MenuCard 
          title="Customer Tickets" 
          icon={<Ticket size={36} className="text-green-500" />}
          onClick={() => navigate('/pos?tab=tickets')}
          color="bg-green-50 border-green-100"
        />
        <MenuCard 
          title="Order Line" 
          icon={<ShoppingCart size={36} className="text-purple-500" />}
          onClick={() => navigate('/order-line')}
          color="bg-purple-50 border-purple-100"
        />
        <MenuCard 
          title="Customers" 
          icon={<Users size={36} className="text-amber-500" />}
          onClick={() => navigate('/customers')}
          color="bg-amber-50 border-amber-100"
        />
        <MenuCard 
          title="Delivery" 
          icon={<Truck size={36} className="text-cyan-500" />}
          onClick={() => navigate('/delivery')}
          color="bg-cyan-50 border-cyan-100"
        />
        <MenuCard 
          title="Payments" 
          icon={<CreditCard size={36} className="text-emerald-500" />}
          onClick={() => navigate('/payments')}
          color="bg-emerald-50 border-emerald-100"
        />
      </div>
      
      {/* Key Metrics */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Today's Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Orders"
            value={totalOrders.toString()}
            icon={<Package className="text-blue-500" />}
            trend="+12% from last week"
            color="blue"
          />
          <MetricCard
            title="Active Tables"
            value={`${activeTablesCount}/${tables.length}`}
            icon={<Users className="text-green-500" />}
            trend="3 tables reserved"
            color="green"
          />
          <MetricCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={<TrendingUp className="text-purple-500" />}
            trend="+8% from yesterday"
            color="purple"
          />
          <MetricCard
            title="Avg. Order Value"
            value={`$${averageOrderValue}`}
            icon={<BarChart className="text-amber-500" />}
            trend="$4.20 more than last week"
            color="amber"
          />
        </div>
      </Card>
      
      {/* Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-orange-600 mb-4">
          <AlertTriangle size={18} /> Alerts
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 pb-2 border-b border-gray-100">
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 mt-0.5">Low Stock</Badge>
            <span>5 menu items running low on ingredients</span>
          </li>
          <li className="flex items-start gap-2 pb-2 border-b border-gray-100">
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 mt-0.5">Reservation</Badge>
            <span>3 new reservations for tomorrow evening</span>
          </li>
          <li className="flex items-start gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 mt-0.5">Orders</Badge>
            <span>2 orders waiting for more than 20 minutes</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

// Main Menu Card
const MenuCard = ({ title, icon, onClick, color }) => {
  return (
    <Card 
      className={`p-6 cursor-pointer transition-all hover:shadow-md ${color} border flex flex-col items-center justify-center aspect-square`}
      onClick={onClick}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-center">{title}</h3>
    </Card>
  );
};

const MetricCard = ({ title, value, icon, trend, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
    amber: "bg-amber-50 border-amber-100"
  };
  
  return (
    <Card className={`p-6 ${colorClasses[color]} border`}>
      <div className="flex justify-between items-start">
        {icon}
        <Badge variant="outline" className="bg-white bg-opacity-50 text-xs">24h</Badge>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">{trend}</p>
      </div>
    </Card>
  );
};

export default Dashboard;
