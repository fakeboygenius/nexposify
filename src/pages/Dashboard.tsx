
import React from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  PieChart, 
  Zap, 
  Gift, 
  TrendingUp, 
  Star, 
  AlertTriangle, 
  Package, 
  Clock, 
  Utensils, 
  Users, 
  ArrowRight,
  LayoutGrid,
  Ticket,
  CreditCard,
  CircleDollarSign,
  ShoppingCart,
  BookOpen,
} from 'lucide-react';

const Dashboard = () => {
  const { orders, tables, menuItems } = useRestaurant();
  const navigate = useNavigate();

  // Calculate some basic stats
  const totalOrders = orders.length;
  const activeTablesCount = tables.filter(table => table.status !== 'available').length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
  
  const popularItems = menuItems
    .slice(0, 3)
    .map(item => ({ name: item.name, sales: Math.floor(Math.random() * 50) + 10 }));

  return (
    <div className="space-y-8 p-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Restaurant Dashboard</h1>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1">
          Free Plan
        </Badge>
      </div>
      
      {/* SambaPOS-style Order Flow Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Utensils className="text-teal-500" size={20} /> 
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <OrderFlowCard 
            title="Tables" 
            description="View and manage all tables"
            icon={<LayoutGrid size={24} className="text-blue-500" />}
            onClick={() => navigate('/pos')}
          />
          <OrderFlowCard 
            title="New Order" 
            description="Create a new order ticket"
            icon={<Ticket size={24} className="text-green-500" />}
            onClick={() => navigate('/pos')}
            primary
          />
          <OrderFlowCard 
            title="Order Line" 
            description="View and manage all orders"
            icon={<ShoppingCart size={24} className="text-purple-500" />}
            onClick={() => navigate('/order-line')}
          />
          <OrderFlowCard 
            title="Payments" 
            description="Process and view payments"
            icon={<CreditCard size={24} className="text-amber-500" />}
            onClick={() => navigate('/pos?tab=payment')}
          />
        </div>
      </Card>
      
      {/* Key Metrics */}
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
          icon={<Utensils className="text-amber-500" />}
          trend="$4.20 more than last week"
          color="amber"
        />
      </div>
      
      {/* Upgrade Banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-yellow-300" />
              <h2 className="text-xl font-bold">Upgrade to Premium</h2>
            </div>
            <p className="text-blue-100 max-w-xl">
              Unlock advanced analytics, inventory management, and customer loyalty features to optimize your restaurant operations.
            </p>
          </div>
          <Button variant="secondary" className="whitespace-nowrap">
            View Premium Plans
          </Button>
        </div>
      </Card>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Preview */}
        <Card className="col-span-2 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BarChart size={18} /> Sales Analytics
            </h2>
            <Badge variant="outline" className="text-blue-600 border-blue-200 flex items-center gap-1">
              <Star size={12} className="fill-blue-500 text-blue-500" />
              Premium Feature
            </Badge>
          </div>
          
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 p-6">
            <div className="text-center space-y-3">
              <BarChart size={48} className="mx-auto text-gray-300" />
              <p className="text-gray-500">Detailed sales analytics by hour, day, week, and month</p>
              <Button variant="outline" size="sm" className="mt-2">
                Unlock Analytics
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <FeaturePreview icon={<PieChart size={16} />} title="Menu Performance" />
            <FeaturePreview icon={<Clock size={16} />} title="Peak Hours" />
            <FeaturePreview icon={<TrendingUp size={16} />} title="Growth Trends" />
          </div>
        </Card>
        
        {/* Right Side */}
        <div className="space-y-6">
          {/* Popular Items */}
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Star size={18} /> Popular Items
            </h2>
            <ul className="space-y-3">
              {popularItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="secondary">{item.sales} sold</Badge>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="w-full flex justify-between items-center">
              View all items <ArrowRight size={14} />
            </Button>
          </Card>
          
          {/* Alerts */}
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-orange-600">
              <AlertTriangle size={18} /> Alerts
            </h2>
            <ul className="space-y-3">
              <li className="text-sm flex items-start gap-2 pb-2 border-b border-gray-100">
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 mt-0.5">Low Stock</Badge>
                <span>5 menu items running low on ingredients</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 mt-0.5">Reservation</Badge>
                <span>3 new reservations for tomorrow evening</span>
              </li>
            </ul>
            <Button variant="ghost" size="sm" className="w-full text-orange-600">
              Manage Alerts
            </Button>
          </Card>
        </div>
      </div>
      
      {/* Premium Features */}
      <div className="pt-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Gift size={18} className="text-purple-500" /> Premium Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PremiumFeatureCard 
            title="Inventory Management" 
            description="Track ingredients, set auto-reorder points, and reduce waste"
          />
          <PremiumFeatureCard 
            title="Customer Loyalty Program" 
            description="Create reward points, special offers, and track regular customers"
          />
          <PremiumFeatureCard 
            title="Advanced Table Management" 
            description="Optimize seating, predict wait times, and manage reservations"
          />
        </div>
      </div>
    </div>
  );
};

// New component for Order Flow cards
const OrderFlowCard = ({ title, description, icon, onClick, primary = false }) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        primary ? 'bg-teal-50 border-teal-200' : 'bg-white border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${primary ? 'bg-teal-100' : 'bg-gray-100'}`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-semibold ${primary ? 'text-teal-700' : 'text-gray-800'}`}>{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
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

const FeaturePreview = ({ icon, title }) => (
  <div className="border rounded-md p-3 flex items-center gap-2 text-sm bg-gray-50">
    {icon}
    <span>{title}</span>
  </div>
);

const PremiumFeatureCard = ({ title, description }) => (
  <Card className="p-5 border-purple-100 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
    <div className="flex items-start gap-3">
      <div className="bg-white p-2 rounded-md border border-purple-100">
        <Star className="text-purple-500" size={18} />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </Card>
);

export default Dashboard;
