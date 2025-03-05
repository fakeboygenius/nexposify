
import React from 'react';
import { Button } from '@/components/ui/button';

interface OrderActionsProps {
  type: 'top' | 'bottom';
}

const OrderActions: React.FC<OrderActionsProps> = ({ type }) => {
  if (type === 'top') {
    return (
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="ml-1">History</span>
        </Button>
        <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="ml-1">Discount</span>
        </Button>
        <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 10h18M8 3v6M16 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="ml-1">Coupon</span>
        </Button>
        <Button variant="outline" size="sm" className="border-gray-200 bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9h8M8 13h5M8 17h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="ml-1">Note</span>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9h12M6 12h12M6 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Print
        </Button>
        <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit Items
        </Button>
        <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Note
        </Button>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Split Bill
        </Button>
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7 15h.01M12 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default OrderActions;
