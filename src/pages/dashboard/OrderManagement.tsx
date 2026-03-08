import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Package, Truck, CheckCircle2, AlertCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

// Mock data
const initialOrders = [
  { id: 'ORD-1001', customer: 'Alice Smith', date: '2026-03-07', total: 199.99, status: 'Pending', items: 2, paymentMethod: 'Credit Card', shippingAddress: '123 Main St, Cityville, ST 12345' },
  { id: 'ORD-1002', customer: 'Bob Johnson', date: '2026-03-06', total: 450.00, status: 'Processing', items: 3, paymentMethod: 'PayPal', shippingAddress: '456 Oak Ave, Townsburg, ST 67890' },
  { id: 'ORD-1003', customer: 'Charlie Brown', date: '2026-03-05', total: 89.50, status: 'Delivered', items: 1, paymentMethod: 'Cash on Delivery', shippingAddress: '789 Pine Ln, Villageton, ST 13579' },
  { id: 'ORD-1004', customer: 'Diana Prince', date: '2026-03-04', total: 1200.00, status: 'Cancelled', items: 5, paymentMethod: 'Credit Card', shippingAddress: '321 Elm St, Hamletville, ST 24680' },
  { id: 'ORD-1005', customer: 'Eve Adams', date: '2026-03-03', total: 35.00, status: 'Shipped', items: 1, paymentMethod: 'Apple Pay', shippingAddress: '654 Maple Dr, Forest City, ST 11223' },
  { id: 'ORD-1006', customer: 'Frank Wright', date: '2026-03-02', total: 210.50, status: 'Pending', items: 2, paymentMethod: 'Credit Card', shippingAddress: '987 Cedar Rd, Mountain View, ST 33445' },
  { id: 'ORD-1007', customer: 'Grace Lee', date: '2026-03-01', total: 75.25, status: 'Processing', items: 1, paymentMethod: 'PayPal', shippingAddress: '159 Birch Blvd, Riverdale, ST 55667' },
  { id: 'ORD-1008', customer: 'Henry Ford', date: '2026-02-28', total: 540.00, status: 'Delivered', items: 4, paymentMethod: 'Credit Card', shippingAddress: '753 Walnut Way, Lakeside, ST 77889' },
  { id: 'ORD-1009', customer: 'Ivy Chen', date: '2026-02-27', total: 125.99, status: 'Shipped', items: 2, paymentMethod: 'Google Pay', shippingAddress: '852 Spruce Ct, Hilltop, ST 99001' },
  { id: 'ORD-1010', customer: 'Jack Smith', date: '2026-02-26', total: 890.00, status: 'Pending', items: 3, paymentMethod: 'Bank Transfer', shippingAddress: '369 Ash Pl, Valley Forge, ST 22334' },
  { id: 'ORD-1011', customer: 'Karen Davis', date: '2026-02-25', total: 45.50, status: 'Delivered', items: 1, paymentMethod: 'Credit Card', shippingAddress: '147 Cherry Ln, Meadowbrook, ST 44556' },
  { id: 'ORD-1012', customer: 'Leo Tolstoy', date: '2026-02-24', total: 320.75, status: 'Processing', items: 2, paymentMethod: 'PayPal', shippingAddress: '258 Poplar St, Sunnyside, ST 66778' },
];

export const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { formatCurrency } = useSettingsStore();

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-indigo-100 text-indigo-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Order Management</h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">View and process customer orders.</p>
      </div>

      <div className="mb-4 md:mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:text-base"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 text-sm md:text-sm text-gray-500">
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-sm">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 md:py-4 font-medium text-gray-900">{order.id}</td>
                <td className="py-3 md:py-4 text-gray-600">{order.customer}</td>
                <td className="py-3 md:py-4 text-gray-500">{order.date}</td>
                <td className="py-3 md:py-4 text-gray-600">{order.items}</td>
                <td className="py-3 md:py-4 font-medium text-gray-900">{formatCurrency(order.total.toFixed(2))}</td>
                <td className="py-3 md:py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs md:text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 md:py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => openOrderDetails(order)}
                      className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" 
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {order.status === 'Pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Processing')}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Mark as Processing"
                      >
                        <Package size={16} />
                      </button>
                    )}
                    {order.status === 'Processing' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" 
                        title="Mark as Shipped"
                      >
                        <Truck size={16} />
                      </button>
                    )}
                    {order.status === 'Shipped' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                        title="Mark as Delivered"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    {(order.status === 'Pending' || order.status === 'Processing') && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Cancelled')}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Cancel Order"
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100 gap-4 sm:gap-0">
          <p className="text-sm md:text-sm text-gray-500 text-center sm:text-left">
            Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> of <span className="font-medium text-gray-900">{filteredOrders.length}</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm md:text-sm font-medium transition-colors ${
                    currentPage === page 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:rounded-2xl md:max-w-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Order Details</h3>
                <p className="text-sm md:text-sm text-gray-500 mt-1">{selectedOrder.id} • {selectedOrder.date}</p>
              </div>
              <button 
                onClick={closeOrderDetails}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Customer Information</h4>
                  <p className="text-sm md:text-sm text-gray-600"><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                  <p className="text-sm md:text-sm text-gray-600 mt-1"><span className="font-medium">Email:</span> customer@example.com</p>
                  <p className="text-sm md:text-sm text-gray-600 mt-1"><span className="font-medium">Phone:</span> +1 234 567 8900</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Order Information</h4>
                  <p className="text-sm md:text-sm text-gray-600"><span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                  <p className="text-sm md:text-sm text-gray-600 mt-1"><span className="font-medium">Shipping Address:</span> {selectedOrder.shippingAddress}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm md:text-sm font-medium text-gray-600">Current Status:</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs md:text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Update Order Status</h4>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'Pending')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm md:text-sm font-medium border transition-colors flex items-center gap-2 ${selectedOrder.status === 'Pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <Clock size={14} className="md:w-4 md:h-4" /> Pending
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'Processing')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm md:text-sm font-medium border transition-colors flex items-center gap-2 ${selectedOrder.status === 'Processing' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <Package size={14} className="md:w-4 md:h-4" /> Processing
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'Shipped')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm md:text-sm font-medium border transition-colors flex items-center gap-2 ${selectedOrder.status === 'Shipped' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <Truck size={14} className="md:w-4 md:h-4" /> Shipped
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'Delivered')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm md:text-sm font-medium border transition-colors flex items-center gap-2 ${selectedOrder.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <CheckCircle2 size={14} className="md:w-4 md:h-4" /> Delivered
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'Cancelled')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm md:text-sm font-medium border transition-colors flex items-center gap-2 ${selectedOrder.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <AlertCircle size={14} className="md:w-4 md:h-4" /> Cancelled
                </button>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Order Items</h4>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr className="text-xs md:text-xs text-gray-500 uppercase tracking-wider">
                      <th className="px-3 py-2 md:px-4 md:py-3 font-medium">Product</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 font-medium">Qty</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 font-medium text-right">Price</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm md:text-sm">
                    <tr>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-gray-900">Premium Wireless Headphones</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-gray-600">1</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-right text-gray-600">{formatCurrency(199.99)}</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-right font-medium text-gray-900">{formatCurrency(199.99)}</td>
                    </tr>
                    {/* Add more mock items if needed based on selectedOrder.items count */}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-3 py-2 md:px-4 md:py-3 text-right font-medium text-gray-600 text-sm md:text-sm">Subtotal</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-right font-medium text-gray-900 text-sm md:text-sm">{formatCurrency((selectedOrder.total - 10).toFixed(2))}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-3 py-2 md:px-4 md:py-3 text-right font-medium text-gray-600 text-sm md:text-sm">Shipping</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-right font-medium text-gray-900 text-sm md:text-sm">{formatCurrency(10.00)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-3 py-3 md:px-4 md:py-4 text-right font-bold text-gray-900 text-sm md:text-base">Total</td>
                      <td className="px-3 py-3 md:px-4 md:py-4 text-right font-bold text-primary text-sm md:text-base">{formatCurrency(selectedOrder.total.toFixed(2))}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={closeOrderDetails}
                className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
