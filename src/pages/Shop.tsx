import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';
import { ProductCard } from '../components/ProductCard';

const MOCK_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `prod-${i + 1}`,
  name: `Premium Product ${i + 1}`,
  price: Math.floor(Math.random() * 500) + 50,
  image: `https://picsum.photos/seed/prod${i + 1}/400/400`,
  images: [
    `https://picsum.photos/seed/prod${i + 1}/400/400`,
    `https://picsum.photos/seed/prod${i + 1}view2/400/400`,
    `https://picsum.photos/seed/prod${i + 1}view3/400/400`,
  ],
  category: ['Electronics', 'Accessories', 'Furniture', 'Clothing'][Math.floor(Math.random() * 4)],
  stock: Math.floor(Math.random() * 50) + 1,
}));

export function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const addItem = useCartStore((state) => state.addItem);
  const { formatCurrency } = useSettingsStore();

  const categories = ['All', 'Electronics', 'Accessories', 'Furniture', 'Clothing'];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-12 gap-6">
        <div>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">Shop All</h1>
          <p className="text-sm md:text-base text-gray-600">Discover our complete collection of premium products.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 md:py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm md:text-base"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 appearance-none pl-4 pr-10 py-2 md:py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white text-sm md:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 md:py-20">
          <h3 className="text-lg md:text-2xl font-bold text-primary mb-2">No products found</h3>
          <p className="text-sm md:text-base text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
