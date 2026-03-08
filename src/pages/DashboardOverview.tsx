import { useAuthStore } from '../store/authStore';
import { DollarSign, ShoppingBag, Users, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useSettingsStore } from '../store/settingsStore';

const data = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 139 },
  { name: 'Mar', sales: 2000, orders: 980 },
  { name: 'Apr', sales: 2780, orders: 390 },
  { name: 'May', sales: 1890, orders: 480 },
  { name: 'Jun', sales: 2390, orders: 380 },
  { name: 'Jul', sales: 3490, orders: 430 },
];

export function DashboardOverview() {
  const { user } = useAuthStore();
  const { formatCurrency } = useSettingsStore();

  const stats = [
    { title: 'Total Revenue', value: formatCurrency(45231.89), icon: DollarSign, trend: '+20.1%', color: 'bg-blue-50 text-blue-600' },
    { title: 'Total Orders', value: '2,350', icon: ShoppingBag, trend: '+15.2%', color: 'bg-green-50 text-green-600' },
    { title: 'Active Users', value: '12,234', icon: Users, trend: '+5.4%', color: 'bg-purple-50 text-purple-600' },
    { title: 'Conversion Rate', value: '3.24%', icon: TrendingUp, trend: '+1.2%', color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">Dashboard Overview</h1>
          <p className="text-sm md:text-base text-gray-600">Welcome back, {user?.name}. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div className={`p-2 md:p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-sm md:text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm md:text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-xl md:text-2xl font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base md:text-lg font-bold text-primary mb-4 md:mb-6">Revenue Overview</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base md:text-lg font-bold text-primary mb-4 md:mb-6">Order Trends</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="orders" stroke="#F97316" strokeWidth={3} dot={{ r: 4, fill: '#F97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-bold text-primary">Recent Orders</h3>
            <button className="text-sm font-medium text-accent hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 text-sm md:text-sm text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 md:py-4 font-medium text-primary">#ORD-{1000 + i}</td>
                    <td className="py-3 md:py-4 text-gray-600">Customer {i}</td>
                    <td className="py-3 md:py-4 text-gray-600">Premium Product {i}</td>
                    <td className="py-3 md:py-4 font-medium text-primary">{formatCurrency((Math.random() * 500).toFixed(2))}</td>
                    <td className="py-3 md:py-4">
                      <span className="px-2 py-1 rounded-full text-xs md:text-xs font-medium bg-blue-50 text-blue-600">
                        Processing
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base md:text-lg font-bold text-primary mb-4 md:mb-6">System Alerts</h3>
          <div className="space-y-3 md:space-y-4">
            <div className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-orange-50 border border-orange-100">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm md:text-sm font-semibold text-orange-800">Low Stock Alert</p>
                <p className="text-xs md:text-xs text-orange-600 mt-1">5 products are running low on inventory.</p>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm md:text-sm font-semibold text-red-800">Suspicious Activity</p>
                <p className="text-xs md:text-xs text-red-600 mt-1">Multiple failed login attempts detected from IP 192.168.1.1.</p>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-blue-50 border border-blue-100">
              <Package className="w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm md:text-sm font-semibold text-blue-800">Pending Deliveries</p>
                <p className="text-xs md:text-xs text-blue-600 mt-1">12 orders are waiting to be assigned to delivery men.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
