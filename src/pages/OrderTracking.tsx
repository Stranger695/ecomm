import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../store/settingsStore';

// Mock data for tracking
const mockOrders: Record<string, any> = {
  'ORD-1001': {
    id: 'ORD-1001',
    status: 'Pending',
    date: '2026-03-07',
    estimatedDelivery: '2026-03-12',
    items: [
      { name: 'Premium Wireless Headphones', quantity: 1, price: 199.99 }
    ]
  },
  'ORD-1002': {
    id: 'ORD-1002',
    status: 'Processing',
    date: '2026-03-06',
    estimatedDelivery: '2026-03-10',
    items: [
      { name: 'Mechanical Keyboard', quantity: 1, price: 149.99 },
      { name: 'Gaming Mouse', quantity: 1, price: 79.99 }
    ]
  },
  'ORD-1003': {
    id: 'ORD-1003',
    status: 'Shipped',
    date: '2026-03-05',
    estimatedDelivery: '2026-03-08',
    items: [
      { name: '4K Monitor', quantity: 1, price: 399.99 }
    ]
  },
  'ORD-1004': {
    id: 'ORD-1004',
    status: 'Delivered',
    date: '2026-03-01',
    estimatedDelivery: '2026-03-04',
    items: [
      { name: 'Smart Watch', quantity: 1, price: 249.99 }
    ]
  },
  'ORD-1005': {
    id: 'ORD-1005',
    status: 'Cancelled',
    date: '2026-03-06',
    estimatedDelivery: 'N/A',
    items: [
      { name: 'Bluetooth Speaker', quantity: 1, price: 59.99 }
    ]
  }
};

const timelineSteps = [
  { id: 'Pending', label: 'Order Placed', icon: Clock, description: 'We have received your order.' },
  { id: 'Processing', label: 'Processing', icon: Package, description: 'Your order is being prepared.' },
  { id: 'Shipped', label: 'Shipped', icon: Truck, description: 'Your order is on the way.' },
  { id: 'Delivered', label: 'Delivered', icon: CheckCircle, description: 'Your order has been delivered.' }
];

export const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { formatCurrency } = useSettingsStore();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSearching(true);
    setTrackedOrder(null);

    // Simulate API call
    setTimeout(() => {
      const order = mockOrders[orderId.trim().toUpperCase()];
      if (order) {
        setTrackedOrder(order);
      } else {
        setError('Order not found. Please check your Order ID and try again.');
      }
      setIsSearching(false);
    }, 600);
  };

  const getCurrentStepIndex = (status: string) => {
    if (status === 'Cancelled') return -1;
    return timelineSteps.findIndex(step => step.id === status);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Track Your Order</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Enter your order ID below to see the current status and estimated delivery time.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8 mb-8">
        <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter Order ID (e.g., ORD-1001)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm md:text-base"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !orderId.trim()}
            className="px-6 py-4 md:px-8 md:py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap text-sm md:text-base min-h-[50px]"
          >
            {isSearching ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 mt-4 text-sm"
          >
            {error}
          </motion.p>
        )}
      </div>

      {trackedOrder && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-4 md:p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Order #{trackedOrder.id}</h2>
                <p className="text-sm md:text-base text-gray-500 mt-1">Placed on {trackedOrder.date}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm md:text-sm text-gray-500 uppercase tracking-wider font-medium">Estimated Delivery</p>
                <p className="text-lg md:text-xl font-bold text-primary mt-1">{trackedOrder.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-12">
            {trackedOrder.status === 'Cancelled' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Order Cancelled</h3>
                <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
                  This order has been cancelled. If you have any questions, please contact our support team.
                </p>
              </div>
            ) : (
              <div className="relative pl-4 md:pl-0">
                {/* Timeline Line */}
                <div className="absolute left-9 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 md:-translate-x-1/2"></div>
                
                {/* Timeline Steps */}
                <div className="space-y-8 md:space-y-12 relative">
                  {timelineSteps.map((step, index) => {
                    const currentIndex = getCurrentStepIndex(trackedOrder.status);
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const Icon = step.icon;

                    return (
                      <div key={step.id} className={`relative flex flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Content */}
                        <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right text-left'}`}>
                          <h3 className={`text-base md:text-lg font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </h3>
                          <p className={`mt-1 text-sm md:text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                            {step.description}
                          </p>
                          {isCurrent && (
                            <span className="inline-block mt-2 px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary text-xs md:text-xs font-medium rounded-full">
                              Current Status
                            </span>
                          )}
                        </div>

                        {/* Icon */}
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                          <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-white flex items-center justify-center z-10 transition-colors duration-500 ${
                            isCompleted ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                          } ${isCurrent ? 'ring-2 md:ring-4 ring-primary/20' : ''}`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Order Items Summary */}
          <div className="p-4 md:p-8 border-t border-gray-100 bg-gray-50/50">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">Items in this order</h3>
            <div className="space-y-3">
              {trackedOrder.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      <Package className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base text-gray-900">{item.name}</p>
                      <p className="text-sm md:text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-sm md:text-base text-gray-900">{formatCurrency(item.price.toFixed(2))}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
