import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Globe, Mail, Phone, MapPin, ShieldAlert, DollarSign, Smartphone } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: '$ (USD)' },
  { code: 'EUR', symbol: '€', label: '€ (EUR)' },
  { code: 'GBP', symbol: '£', label: '£ (GBP)' },
  { code: 'JPY', symbol: '¥', label: '¥ (JPY)' },
  { code: 'INR', symbol: '₹', label: '₹ (INR)' },
  { code: 'BDT', symbol: '৳', label: '৳ (BDT)' },
  { code: 'BDT_TK', symbol: 'TK', label: 'TK (BDT)' },
];

export const WebsiteSettings = () => {
  const { currency, currencySymbol, currencyPosition, setCurrency, setCurrencyPosition } = useSettingsStore();
  const [saved, setSaved] = useState(false);
  const [fakeOrderDetection, setFakeOrderDetection] = useState(true);
  const [deviceBlock, setDeviceBlock] = useState(false);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('USD');
  const [selectedCurrencyPosition, setSelectedCurrencyPosition] = useState<'left' | 'right'>('left');

  useEffect(() => {
    // Find the matching currency code based on the current symbol in store
    const current = CURRENCIES.find(c => c.symbol === currencySymbol);
    if (current) {
      setSelectedCurrencyCode(current.code);
    }
    setSelectedCurrencyPosition(currencyPosition || 'left');
  }, [currencySymbol, currencyPosition]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save currency settings
    const selected = CURRENCIES.find(c => c.code === selectedCurrencyCode);
    if (selected) {
      setCurrency(selected.code.replace('_TK', ''), selected.symbol);
    }
    setCurrencyPosition(selectedCurrencyPosition);

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-4xl">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Website Settings</h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">Configure global settings for your e-commerce platform.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 md:space-y-8">
        {/* General Info */}
        <div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="text-primary" size={20} />
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base" defaultValue="Nexus" />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Store Tagline</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base" defaultValue="Premium E-commerce Destination" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Store Description</label>
              <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm md:text-base" defaultValue="We are a premium e-commerce destination committed to delivering quality products with exceptional service." />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Currency Settings */}
        <div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="text-primary" size={20} />
            Currency Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
              <select 
                value={selectedCurrencyCode}
                onChange={(e) => setSelectedCurrencyCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Currency Position</label>
              <select 
                value={selectedCurrencyPosition}
                onChange={(e) => setSelectedCurrencyPosition(e.target.value as 'left' | 'right')}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base"
              >
                <option value="left">Left ({CURRENCIES.find(c => c.code === selectedCurrencyCode)?.symbol || '$'}99.00)</option>
                <option value="right">Right (99.00{CURRENCIES.find(c => c.code === selectedCurrencyCode)?.symbol || '$'})</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Security Settings */}
        <div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="text-primary" size={20} />
            Security & Fraud Prevention
          </h3>
          <div className="space-y-4">
            <div className="flex items-start md:items-center justify-between p-4 border border-gray-200 rounded-xl gap-4">
              <div className="flex items-start md:items-center gap-3">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Fake Order Detection</h4>
                  <p className="text-xs md:text-sm text-gray-500">Automatically flag suspicious orders based on IP and behavior.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" className="sr-only peer" checked={fakeOrderDetection} onChange={() => setFakeOrderDetection(!fakeOrderDetection)} />
                <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-start md:items-center justify-between p-4 border border-gray-200 rounded-xl gap-4">
              <div className="flex items-start md:items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Device Blocking</h4>
                  <p className="text-xs md:text-sm text-gray-500">Block specific devices or IP addresses from accessing the store.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" className="sr-only peer" checked={deviceBlock} onChange={() => setDeviceBlock(!deviceBlock)} />
                <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Contact Info */}
        <div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="text-primary" size={20} />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base" defaultValue="support@nexus.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="tel" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Business Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea rows={2} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm md:text-base" defaultValue="123 Commerce St, Suite 100, Tech City, TC 90210" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors font-medium w-full md:w-auto justify-center text-sm md:text-base"
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Saved Successfully!' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
