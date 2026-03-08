import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, Clock } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { ProductCard } from '../components/ProductCard';

const featuredProducts = [
  { 
    id: '1', 
    name: 'Premium Wireless Headphones', 
    price: 299, 
    image: 'https://picsum.photos/seed/headphones/400/400', 
    images: [
      'https://picsum.photos/seed/headphones/400/400',
      'https://picsum.photos/seed/headphonesview2/400/400',
      'https://picsum.photos/seed/headphonesview3/400/400',
    ],
    category: 'Electronics',
    stock: 20
  },
  { 
    id: '2', 
    name: 'Minimalist Smartwatch', 
    price: 199, 
    image: 'https://picsum.photos/seed/watch/400/400', 
    images: [
      'https://picsum.photos/seed/watch/400/400',
      'https://picsum.photos/seed/watchview2/400/400',
      'https://picsum.photos/seed/watchview3/400/400',
    ],
    category: 'Accessories',
    stock: 15
  },
  { 
    id: '3', 
    name: 'Ergonomic Office Chair', 
    price: 450, 
    image: 'https://picsum.photos/seed/chair/400/400', 
    images: [
      'https://picsum.photos/seed/chair/400/400',
      'https://picsum.photos/seed/chairview2/400/400',
      'https://picsum.photos/seed/chairview3/400/400',
    ],
    category: 'Furniture',
    stock: 8
  },
  { 
    id: '4', 
    name: 'Mechanical Keyboard', 
    price: 150, 
    image: 'https://picsum.photos/seed/keyboard/400/400', 
    images: [
      'https://picsum.photos/seed/keyboard/400/400',
      'https://picsum.photos/seed/keyboardview2/400/400',
      'https://picsum.photos/seed/keyboardview3/400/400',
    ],
    category: 'Electronics',
    stock: 30
  },
];

export function Home() {
  const { formatCurrency } = useSettingsStore();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080?blur=2" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-16 md:py-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight"
          >
            Elevate Your <span className="text-accent">Lifestyle</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto px-4"
          >
            Discover premium products curated for modern living. Experience seamless shopping with fast delivery and secure payments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-orange-600 text-white px-6 py-4 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/30 min-h-[44px]"
            >
              Shop Now <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-background border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 md:mb-6">
                <Truck className="w-5 h-5 md:w-8 md:h-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">Fast Delivery</h3>
              <p className="text-sm md:text-base text-gray-600">Get your orders delivered swiftly with our optimized logistics network.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-background border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 md:mb-6">
                <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">Secure Payments</h3>
              <p className="text-sm md:text-base text-gray-600">Your transactions are protected with enterprise-grade encryption.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-background border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 md:mb-6">
                <Clock className="w-5 h-5 md:w-8 md:h-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">24/7 Support</h3>
              <p className="text-sm md:text-base text-gray-600">Our customer service team is always ready to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-6 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2 md:mb-4">Featured Products</h2>
              <p className="text-sm md:text-base text-gray-600">Handpicked items for exceptional quality.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-accent font-semibold hover:underline text-sm md:text-base">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-6 md:mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline text-sm">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
