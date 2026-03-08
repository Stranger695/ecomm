import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore, Product } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const { formatCurrency } = useSettingsStore();

  // Ensure we have an array of images, fallback to single image if not present
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100 block group/image">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-xs font-semibold text-primary shadow-sm z-10">
          {product.category}
        </div>

        {/* Navigation Arrows - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 md:p-1.5 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-all transform hover:scale-110 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 md:p-1.5 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-all transform hover:scale-110 z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:gap-1.5 z-20 opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-opacity">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-primary w-2 md:w-3' : 'bg-white/70'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm md:text-base text-primary mb-1 md:mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-yellow-500 mb-2 md:mb-4">
          <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
          <span className="text-sm md:text-sm font-medium text-gray-600">4.8 (120 reviews)</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg md:text-xl font-bold text-primary">{formatCurrency(product.price)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors active:scale-95 shadow-md"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
