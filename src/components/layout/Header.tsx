import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useSettingsStore } from '../../store/settingsStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);
  
  const { user, signOut } = useAuthStore();
  const totalItems = useCartStore((state) => state.totalItems());
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we should hide the header
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2 md:py-3'
          : 'bg-white py-3 md:py-4',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Package className="w-6 h-6 md:w-8 md:h-8 text-accent" />
          <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">Nexus</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-primary hover:text-accent font-medium transition-colors">Home</Link>
          <Link to="/shop" className="text-primary hover:text-accent font-medium transition-colors">Shop</Link>
          <Link to="/track-order" className="text-primary hover:text-accent font-medium transition-colors">Track Order</Link>
          <Link to="/about" className="text-primary hover:text-accent font-medium transition-colors">About</Link>
          <Link to="/contact" className="text-primary hover:text-accent font-medium transition-colors">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '250px' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden mr-1 hidden md:block"
                >
                  <form onSubmit={handleSearchSubmit} className="flex w-full">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm bg-gray-50"
                    />
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              className="text-primary hover:text-accent transition-colors flex items-center justify-center z-10 p-3 rounded-full hover:bg-gray-100 min-w-[44px] min-h-[44px]"
              onClick={() => {
                if (isSearchOpen && searchQuery.trim()) {
                  handleSearchSubmit();
                } else {
                  setIsSearchOpen(!isSearchOpen);
                }
              }}
            >
              {isSearchOpen && !searchQuery.trim() ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative text-primary hover:text-accent transition-colors p-3 rounded-full hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span 
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Profile / Auth */}
          {user ? (
            <div className="relative ml-2">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm shadow-sm border border-secondary/20">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-xl -mt-2 mb-2">
                      <p className="text-sm font-semibold text-primary">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <span className="inline-block px-2 py-0.5 mt-2 text-[10px] uppercase tracking-wider bg-accent/10 text-accent font-bold rounded-full">
                        {user.role.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      Dashboard
                    </Link>
                    
                    {['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role) && (
                      <Link
                        to="/dashboard/products"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Package className="w-4 h-4 text-gray-400" />
                        Manage Products
                      </Link>
                    )}
                    
                    <Link
                      to="/dashboard/orders"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <ShoppingCart className="w-4 h-4 text-gray-400" />
                      My Orders
                    </Link>

                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors ml-2">
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary p-3 rounded-full hover:bg-gray-100 ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Search */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <form onSubmit={handleSearchSubmit} className="flex w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-l-lg border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-base bg-white h-[44px]"
                  />
                  <button 
                    type="submit"
                    className="bg-accent text-white px-5 py-2 rounded-r-lg hover:bg-accent/90 transition-colors flex items-center justify-center h-[44px] min-w-[44px]"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>
            </div>
            <nav className="flex flex-col py-2 px-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-medium px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-base">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-medium px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-base">Shop</Link>
              <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-medium px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-base">Track Order</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-medium px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-base">About</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-medium px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-base">Contact</Link>
              {!user && (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-medium px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 mt-2 border-t border-gray-100 text-base">
                  <User className="w-5 h-5" /> Login / Register
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
