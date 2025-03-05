
import React from 'react';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types';

interface CustomerInfoProps {
  order: Order;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ order }) => {
  const getOrderStatusStyle = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.New:
        return "bg-blue-100 text-blue-800";
      case OrderStatus.InKitchen:
        return "bg-yellow-100 text-yellow-800";
      case OrderStatus.Ready: 
        return "bg-green-100 text-green-800";
      case OrderStatus.Served:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">
            {order.customerName || 'Guest Customer'}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(order.createdAt)} • {formatTime(order.createdAt)}
          </p>
          <p className="mt-1">Table {order.tableNumber} • {order.items.length} items</p>
        </div>
        
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getOrderStatusStyle(order.status)}`}>
            {order.status}
          </span>
          {order.paymentStatus && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.paymentStatus === PaymentStatus.Paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order.paymentStatus}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
