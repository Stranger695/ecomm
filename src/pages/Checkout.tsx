import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { formatCurrency } = useSettingsStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = totalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^\+?[\d\s-]{10,}$/.test(value)) error = 'Please enter a valid phone number';
        break;
      case 'address':
        if (!value.trim()) error = 'Street address is required';
        break;
      case 'city':
        if (!value.trim()) error = 'City is required';
        break;
      case 'state':
        if (!value.trim()) error = 'State/Province is required';
        break;
      case 'country':
        if (!value.trim()) error = 'Country is required';
        break;
      case 'postalCode':
        if (!value.trim()) error = 'Postal code is required';
        break;
      case 'cardNumber':
        if (paymentMethod === 'card') {
          if (!value.trim()) error = 'Card number is required';
          else if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) error = 'Please enter a valid 16-digit card number';
        }
        break;
      case 'expiryDate':
        if (paymentMethod === 'card') {
          if (!value.trim()) error = 'Expiry date is required';
          else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) error = 'Please use MM/YY format';
        }
        break;
      case 'cvc':
        if (paymentMethod === 'card') {
          if (!value.trim()) error = 'CVC is required';
          else if (!/^\d{3,4}$/.test(value)) error = 'Please enter a valid 3 or 4 digit CVC';
        }
        break;
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to top to show errors if any
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      
      // Redirect after success
      setTimeout(() => {
        navigate('/dashboard/orders');
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
          <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-success" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">Order Confirmed!</h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-md">
          Thank you for your purchase. Your order has been received and is being processed. You will be redirected to your orders page shortly.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Shipping Info */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6 flex items-center gap-2">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-accent" /> Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">First Name</label>
                  <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.firstName ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.firstName && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Last Name</label>
                  <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.lastName ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.lastName && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Email Address</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="email" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.email ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.email && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Phone Number</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="tel" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.phone ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.phone && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Street Address</label>
                  <input 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.address ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.address && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">City</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.city ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.city && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">State / Province</label>
                  <input 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.state ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.state && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Country</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-white ${errors.country ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                  </select>
                  {errors.country && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.country}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Postal Code</label>
                  <input 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text" 
                    className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errors.postalCode ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                  />
                  {errors.postalCode && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6 flex items-center gap-2">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-accent" /> Payment Method
              </h2>
              
              <div className="space-y-3 md:space-y-4">
                <label className={`flex items-center p-3 md:p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4 text-accent focus:ring-accent border-gray-300" 
                  />
                  <span className="ml-3 font-medium text-primary text-sm md:text-base">Credit / Debit Card (Stripe)</span>
                </label>
                
                <label className={`flex items-center p-3 md:p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-accent focus:ring-accent border-gray-300" 
                  />
                  <span className="ml-3 font-medium text-primary text-sm md:text-base">Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Card Number</label>
                    <input 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-white ${errors.cardNumber ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                    />
                    {errors.cardNumber && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.cardNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Expiry Date</label>
                    <input 
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      type="text" 
                      placeholder="MM/YY" 
                      className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-white ${errors.expiryDate ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                    />
                    {errors.expiryDate && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">CVC</label>
                    <input 
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      type="text" 
                      placeholder="123" 
                      className={`w-full px-4 py-2.5 md:py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-white ${errors.cvc ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`} 
                    />
                    {errors.cvc && <p className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.cvc}</p>}
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-base md:text-lg transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed min-h-[50px]"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Pay {formatCurrency(total.toFixed(2))}
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 sticky top-24">
            <h2 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 md:gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 bg-gray-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-primary line-clamp-2">{item.name}</p>
                    <p className="text-sm md:text-sm font-bold text-gray-600">{formatCurrency((item.price * item.quantity).toFixed(2))}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Subtotal</span>
                <span className="font-medium text-primary">{formatCurrency(subtotal.toFixed(2))}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Shipping</span>
                <span className="font-medium text-primary">{shipping === 0 ? 'Free' : formatCurrency(shipping.toFixed(2))}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Estimated Tax</span>
                <span className="font-medium text-primary">{formatCurrency(tax.toFixed(2))}</span>
              </div>
              
              <div className="border-t border-gray-100 pt-3 md:pt-4 mt-3 md:mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold text-primary">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-primary">{formatCurrency(total.toFixed(2))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
