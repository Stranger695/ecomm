import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';

export function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const { formatCurrency } = useSettingsStore();

  // Mock product data based on ID
  const product = {
    id: id || 'prod-1',
    name: 'Premium Wireless Headphones with Active Noise Cancellation',
    price: 299.99,
    image: `https://picsum.photos/seed/${id || 'headphones'}/800/800`,
    images: [
      `https://picsum.photos/seed/${id || 'headphones'}/800/800`,
      `https://picsum.photos/seed/${(id || 'headphones') + 'view2'}/800/800`,
      `https://picsum.photos/seed/${(id || 'headphones') + 'view3'}/800/800`,
      `https://picsum.photos/seed/${(id || 'headphones') + 'view4'}/800/800`,
    ],
    category: 'Electronics',
    stock: 15,
    description: 'Experience pure audio bliss with our premium wireless headphones. Featuring industry-leading active noise cancellation, 30-hour battery life, and plush memory foam ear cushions for all-day comfort. The custom-tuned 40mm drivers deliver deep, rich bass and crystal-clear highs.',
    features: [
      'Active Noise Cancellation (ANC)',
      'Up to 30 hours of battery life',
      'Bluetooth 5.2 connectivity',
      'Built-in microphone for clear calls',
      'Foldable design for easy storage'
    ]
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent font-medium mb-4 md:mb-8 transition-colors text-sm md:text-base">
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        {/* Product Image Carousel */}
        <div className="bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-0 md:p-4">
          <div className="relative aspect-square rounded-none md:rounded-2xl overflow-hidden bg-gray-50 group">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 md:p-2 rounded-full shadow-md opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 md:p-2 rounded-full shadow-md opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                    currentImageIndex === idx ? 'bg-primary w-3 md:w-4' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="hidden md:grid grid-cols-4 gap-4 mt-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  currentImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent/10 text-accent px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                In Stock ({product.stock})
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2 md:mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-current opacity-50" />
              </div>
              <span className="text-gray-500 text-sm md:text-sm underline cursor-pointer hover:text-primary">128 Reviews</span>
            </div>
            <div className="text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
              {formatCurrency(product.price)}
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
              {product.description}
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <h3 className="font-semibold text-primary mb-3 md:mb-4 text-sm md:text-base">Key Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6 md:pt-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-gray-200 rounded-xl px-2 py-2 sm:w-36 bg-white h-[50px]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-primary transition-colors w-11 h-full flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-semibold text-primary text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="text-gray-500 hover:text-primary transition-colors w-11 h-full flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-secondary text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold text-base md:text-lg transition-all active:scale-95 shadow-lg shadow-primary/20 min-h-[50px]"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button className="w-[50px] h-[50px] md:w-14 md:h-14 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all bg-white shrink-0">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center gap-3 p-2 md:p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0" />
                <div>
                  <p className="text-sm md:text-sm font-semibold text-primary">Free Shipping</p>
                  <p className="text-xs md:text-xs text-gray-500">On orders over {formatCurrency(100)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 md:p-4 rounded-xl bg-gray-50 border border-gray-100">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0" />
                <div>
                  <p className="text-sm md:text-sm font-semibold text-primary">2 Year Warranty</p>
                  <p className="text-xs md:text-xs text-gray-500">Full coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
