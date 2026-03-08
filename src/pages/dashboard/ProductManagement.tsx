import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

// Mock data
const initialProducts = [
  { id: 1, name: 'Wireless Headphones', price: 199.99, stock: 45, category: 'Electronics', status: 'Active' },
  { id: 2, name: 'Smart Watch', price: 299.99, stock: 12, category: 'Electronics', status: 'Low Stock' },
  { id: 3, name: 'Running Shoes', price: 129.99, stock: 0, category: 'Sports', status: 'Out of Stock' },
];

export const ProductManagement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const { formatCurrency } = useSettingsStore();

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">Manage your inventory and product details.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center text-sm md:text-base">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:text-base"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100 text-xs md:text-sm text-gray-500">
              <th className="pb-3 font-medium">Product Name</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Stock</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 md:py-4 font-medium text-gray-900">{product.name}</td>
                <td className="py-3 md:py-4 text-gray-600">{product.category}</td>
                <td className="py-3 md:py-4 text-gray-900">{formatCurrency(product.price)}</td>
                <td className="py-3 md:py-4 text-gray-600">{product.stock}</td>
                <td className="py-3 md:py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${
                    product.status === 'Active' ? 'bg-green-100 text-green-700' :
                    product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3 md:py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
