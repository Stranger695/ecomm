import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';

export function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { formatCurrency } = useSettingsStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
          <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">Your cart is empty</h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.
        </p>
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all active:scale-95 shadow-lg shadow-primary/20 text-sm md:text-base"
        >
          Start Shopping <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Link to={`/product/${item.id}`} className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </Link>
              
              <div className="flex-grow w-full">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/product/${item.id}`} className="font-semibold text-primary hover:text-accent transition-colors line-clamp-2 text-sm md:text-base mr-2">
                    {item.name}
                  </Link>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-error p-3 rounded-lg hover:bg-red-50 transition-colors shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm md:text-sm text-gray-500 mb-3 md:mb-4">{item.category}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base md:text-lg text-primary">{formatCurrency(item.price)}</span>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-[44px]">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-gray-500 hover:text-primary px-3 h-full flex items-center justify-center transition-colors min-w-[44px]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-primary text-base">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-primary px-3 h-full flex items-center justify-center transition-colors min-w-[44px]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 sticky top-24">
            <h2 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6">Order Summary</h2>
            
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Subtotal</span>
                <span className="font-medium text-primary">{formatCurrency(totalPrice().toFixed(2))}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Shipping</span>
                <span className="font-medium text-primary">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Tax</span>
                <span className="font-medium text-primary">Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-100 pt-3 md:pt-4 mt-3 md:mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold text-primary">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-primary">{formatCurrency(totalPrice().toFixed(2))}</span>
                </div>
                <p className="text-xs md:text-xs text-gray-500 mt-1 text-right">Including VAT</p>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="w-full bg-accent hover:bg-orange-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-base md:text-lg transition-all active:scale-95 shadow-lg shadow-accent/20 min-h-[50px]"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            
            <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-sm md:text-sm text-gray-500">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
