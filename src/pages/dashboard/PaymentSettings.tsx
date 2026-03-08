import React, { useState } from 'react';
import { CreditCard, Save, CheckCircle, Plus, Trash2, Edit2, X, Wallet, Banknote, AlertCircle, Smartphone } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  provider: 'stripe' | 'paypal' | 'cod' | 'bkash' | 'nagad' | 'custom';
  config: Record<string, string>;
}

export const PaymentSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      name: 'Stripe (Credit Cards)',
      description: 'Accept major credit and debit cards.',
      enabled: true,
      provider: 'stripe',
      config: { publishableKey: 'pk_test_123456789', secretKey: 'sk_test_123456789' }
    },
    {
      id: '2',
      name: 'PayPal',
      description: 'Accept payments via PayPal accounts.',
      enabled: false,
      provider: 'paypal',
      config: { clientId: '', secret: '' }
    },
    {
      id: '3',
      name: 'bKash',
      description: 'Pay with your bKash wallet.',
      enabled: true,
      provider: 'bkash',
      config: { merchantNumber: '01700000000', appKey: '', appSecret: '' }
    },
    {
      id: '4',
      name: 'Nagad',
      description: 'Pay with your Nagad wallet.',
      enabled: true,
      provider: 'nagad',
      config: { merchantNumber: '01800000000', publicKey: '', privateKey: '' }
    },
    {
      id: '5',
      name: 'Cash on Delivery (COD)',
      description: 'Allow customers to pay upon delivery.',
      enabled: true,
      provider: 'cod',
      config: {}
    }
  ]);

  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<PaymentMethod>>({
    name: '',
    description: '',
    provider: 'custom',
    enabled: true,
    config: {}
  });

  const handleSaveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleToggle = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(methods => methods.filter(m => m.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingMethod(null);
    setFormData({
      name: '',
      description: '',
      provider: 'custom',
      enabled: true,
      config: {}
    });
    setIsModalOpen(true);
  };

  const openEditModal = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({ ...method });
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMethod) {
      setPaymentMethods(methods => 
        methods.map(m => m.id === editingMethod.id ? { ...m, ...formData } as PaymentMethod : m)
      );
    } else {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        name: formData.name || 'New Payment Method',
        description: formData.description || '',
        enabled: formData.enabled || false,
        provider: formData.provider as any || 'custom',
        config: formData.config || {}
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    }
    setIsModalOpen(false);
  };

  const handleConfigChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      config: { ...prev.config, [key]: value }
    }));
  };

  const getIcon = (provider: string) => {
    switch (provider) {
      case 'stripe': return <CreditCard size={20} className="md:w-6 md:h-6" />;
      case 'paypal': return <Wallet size={20} className="md:w-6 md:h-6" />;
      case 'bkash': return <Smartphone size={20} className="md:w-6 md:h-6" />;
      case 'nagad': return <Smartphone size={20} className="md:w-6 md:h-6" />;
      case 'cod': return <Banknote size={20} className="md:w-6 md:h-6" />;
      default: return <CreditCard size={20} className="md:w-6 md:h-6" />;
    }
  };

  const getColor = (provider: string) => {
    switch (provider) {
      case 'stripe': return 'bg-indigo-50 text-indigo-600';
      case 'paypal': return 'bg-blue-50 text-blue-600';
      case 'bkash': return 'bg-pink-50 text-pink-600';
      case 'nagad': return 'bg-orange-50 text-orange-600';
      case 'cod': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Payment Settings</h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">Configure available payment methods for your store.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors text-sm md:text-base"
        >
          <Plus size={18} />
          Add Method
        </button>
      </div>

      <div className="space-y-4 md:space-y-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="p-4 md:p-5 border border-gray-200 rounded-xl transition-all hover:border-primary/20 hover:shadow-sm">
            <div className="flex items-start md:items-center justify-between gap-4 mb-4">
              <div className="flex items-start md:items-center gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${getColor(method.provider)}`}>
                  {getIcon(method.provider)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">{method.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={method.enabled} 
                    onChange={() => handleToggle(method.id)} 
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
                  <button 
                    onClick={() => openEditModal(method)}
                    className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(method.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Config Preview / Quick Edit for specific providers could go here if expanded */}
            {method.enabled && Object.keys(method.config).length > 0 && (
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {Object.entries(method.config).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs md:text-sm font-medium text-gray-500 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="text-sm md:text-base text-gray-900 truncate font-mono bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {key.toLowerCase().includes('secret') || key.toLowerCase().includes('key') ? '••••••••••••••••' : value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {paymentMethods.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No Payment Methods</h3>
            <p className="text-gray-500 mb-4">Add a payment method to start accepting payments.</p>
            <button 
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Plus size={18} />
              Add Method
            </button>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button 
            onClick={handleSaveSettings}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors font-medium w-full md:w-auto justify-center text-sm md:text-base"
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleModalSubmit} className="p-4 md:p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Method Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="e.g. Credit Card"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Description shown to customers"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider Type</label>
                  <select 
                    value={formData.provider}
                    onChange={(e) => setFormData({...formData, provider: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  >
                    <option value="custom">Custom</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>

                {/* Dynamic Config Fields based on Provider */}
                {formData.provider === 'stripe' && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard size={16} /> Stripe Configuration
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Publishable Key</label>
                      <input 
                        type="text" 
                        value={formData.config?.publishableKey || ''}
                        onChange={(e) => handleConfigChange('publishableKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Secret Key</label>
                      <input 
                        type="password" 
                        value={formData.config?.secretKey || ''}
                        onChange={(e) => handleConfigChange('secretKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>
                )}

                {formData.provider === 'paypal' && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Wallet size={16} /> PayPal Configuration
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Client ID</label>
                      <input 
                        type="text" 
                        value={formData.config?.clientId || ''}
                        onChange={(e) => handleConfigChange('clientId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Secret</label>
                      <input 
                        type="password" 
                        value={formData.config?.secret || ''}
                        onChange={(e) => handleConfigChange('secret', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}

                {formData.provider === 'bkash' && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Smartphone size={16} /> bKash Configuration
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Merchant Number</label>
                      <input 
                        type="text" 
                        value={formData.config?.merchantNumber || ''}
                        onChange={(e) => handleConfigChange('merchantNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="017xxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">App Key</label>
                      <input 
                        type="text" 
                        value={formData.config?.appKey || ''}
                        onChange={(e) => handleConfigChange('appKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">App Secret</label>
                      <input 
                        type="password" 
                        value={formData.config?.appSecret || ''}
                        onChange={(e) => handleConfigChange('appSecret', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}

                {formData.provider === 'nagad' && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Smartphone size={16} /> Nagad Configuration
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Merchant Number</label>
                      <input 
                        type="text" 
                        value={formData.config?.merchantNumber || ''}
                        onChange={(e) => handleConfigChange('merchantNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="018xxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Public Key</label>
                      <input 
                        type="text" 
                        value={formData.config?.publicKey || ''}
                        onChange={(e) => handleConfigChange('publicKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Private Key</label>
                      <input 
                        type="password" 
                        value={formData.config?.privateKey || ''}
                        onChange={(e) => handleConfigChange('privateKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="methodEnabled"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="methodEnabled" className="text-sm text-gray-700">Enable this payment method</label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {editingMethod ? 'Save Changes' : 'Add Method'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
