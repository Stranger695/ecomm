import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore, Role } from '../store/authStore';
import { Package, Mail, Lock, ArrowRight } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication based on email
    let role: Role = 'USER';
    if (email.includes('superadmin')) role = 'SUPER_ADMIN';
    else if (email.includes('admin')) role = 'ADMIN';
    else if (email.includes('manager')) role = 'MANAGER';
    else if (email.includes('delivery')) role = 'DELIVERY_MAN';

    setUser({
      id: '1',
      email,
      role,
      name: email.split('@')[0],
    });

    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 md:py-12">
      <div className="max-w-md w-full space-y-6 md:space-y-8 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <Package className="w-8 h-8 md:w-10 md:h-10 text-accent" />
            <span className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Nexus</span>
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            {isLogin ? 'Enter your details to access your account.' : 'Sign up to start shopping.'}
          </p>
        </div>

        <form className="mt-6 md:mt-8 space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm md:text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm md:text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-accent hover:text-orange-600">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-base md:text-lg transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            {isLogin ? 'Sign in' : 'Sign up'} <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="mb-4">Mock Login Roles (use email):</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">superadmin@test.com</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">admin@test.com</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">manager@test.com</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">delivery@test.com</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">user@test.com</span>
            </div>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-accent hover:text-orange-600"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
