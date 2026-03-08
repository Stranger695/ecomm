import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  CreditCard,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const DASHBOARD_ITEMS = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER'] },
  { name: 'Products', path: '/dashboard/products', icon: Package, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'] },
  { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCart, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'DELIVERY_MAN', 'USER'] },
  { name: 'Users', path: '/dashboard/users', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Payments', path: '/dashboard/payments', icon: CreditCard, roles: ['SUPER_ADMIN'] },
  { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
];

export function DashboardLayout() {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = user?.role || 'USER';
  const navItems = DASHBOARD_ITEMS.filter(item => item.roles.includes(role));

  // Check if current path is allowed for the user's role
  const isAllowed = DASHBOARD_ITEMS.some(item => {
    // Exact match for /dashboard, otherwise check if path starts with the item path
    if (item.path === '/dashboard') {
      return location.pathname === '/dashboard' && item.roles.includes(role);
    }
    return location.pathname.startsWith(item.path) && item.roles.includes(role);
  });

  // If the path is not allowed, redirect to the dashboard overview
  // But wait, what if the user is not allowed to see the overview?
  // In our case, all roles have access to /dashboard.
  if (!isAllowed && location.pathname !== '/dashboard') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shrink-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <Package className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold text-primary">Nexus</span>
          </Link>
          <button className="lg:hidden text-gray-500 p-2 hover:bg-gray-100 rounded-full" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
          <div className="p-4 overflow-y-auto">
            <div className="mb-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm font-semibold text-primary truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ').toLowerCase()}</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-gray-400")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-error hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:hidden sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-primary">Dashboard</span>
          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
