import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { DashboardOverview } from './pages/DashboardOverview';
import { ProductManagement } from './pages/dashboard/ProductManagement';
import { OrderManagement } from './pages/dashboard/OrderManagement';
import { UserManagement } from './pages/dashboard/UserManagement';
import { PaymentSettings } from './pages/dashboard/PaymentSettings';
import { Analytics } from './pages/dashboard/Analytics';
import { WebsiteSettings } from './pages/dashboard/WebsiteSettings';
import { OrderTracking } from './pages/OrderTracking';
import { useAuthStore } from './store/authStore';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user } = useAuthStore();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="track-order" element={<OrderTracking />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold text-primary mb-4">About Us</h1><p className="text-gray-600 max-w-2xl mx-auto">We are a premium e-commerce destination committed to delivering quality products with exceptional service.</p></div>} />
          <Route path="contact" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1><p className="text-gray-600 max-w-2xl mx-auto">Get in touch with our support team.</p></div>} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="payments" element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
              <PaymentSettings />
            </ProtectedRoute>
          } />
          <Route path="analytics" element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
              <WebsiteSettings />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
