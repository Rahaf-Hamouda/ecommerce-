import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Check, ArrowLeft, Lock, Sparkles, Smartphone, Wallet, ShieldCheck, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: '', phone: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const generateOrderNumber = () => 'ELG-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

  const handleShippingSubmit = (e) => { e.preventDefault(); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setOrderNumber(generateOrderNumber());
    clearCart();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 3) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="max-w-lg mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-28 h-28 bg-gradient-to-br from-sage-400 to-sage-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative"
          >
            <Check className="w-14 h-14 text-white" strokeWidth={3} />
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ delay: 0.5, duration: 0.6 }} className="absolute -top-2 -right-2">
              <span className="text-3xl">&#127881;</span>
            </motion.div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-400 mb-8">Thank you for your purchase. Your confirmation is on its way.</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl border border-rose-50 p-6 shadow-soft mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-50 rounded-xl"><Package className="w-5 h-5 text-rose-500" /></div>
              <div>
                <p className="text-xs text-gray-400">Order Number</p>
                <p className="font-mono font-bold text-gray-800">{orderNumber}</p>
              </div>
            </div>
            <div className="border-t border-rose-50 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Payment Method</span><span className="font-medium text-gray-700 capitalize">{paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'apple' ? 'Apple Pay' : 'Digital Wallet'}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="font-medium text-sage-600 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Confirmed</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Estimated Delivery</span><span className="font-medium text-gray-700">{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl border border-rose-50 p-6 shadow-soft mb-8">
            <p className="text-sm font-semibold text-gray-800 mb-4">Order Tracking</p>
            <div className="flex items-center justify-between">
              {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((s, i) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-gradient-to-br from-rose-500 to-blush-500 text-white shadow-glow' : 'bg-gray-100 text-gray-300'}`}>
                    {i === 0 ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] mt-2 ${i === 0 ? 'text-rose-500 font-medium' : 'text-gray-300'}`}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="bg-cream-50 rounded-2xl p-4 mb-8"><p className="text-xs text-gray-400">Demo mode — no real payment is processed</p></div>

          <Link to="/">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold px-8 py-4 rounded-full shadow-glow inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="text-6xl mb-6">&#128722;</div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">Your Bag is Empty</h1>
        <Link to="/products" className="text-rose-500 hover:text-rose-600 transition-colors">&larr; Continue Shopping</Link>
      </div>
    );
  }

  const inputClass = "w-full border border-rose-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white transition-all placeholder:text-gray-300";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-rose-500 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Bag
      </Link>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-10">
        {[{ num: 1, label: 'Shipping' }, { num: 2, label: 'Payment' }].map((s, i) => (
          <div key={s.num} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s.num ? 'bg-gradient-to-br from-rose-500 to-blush-500 text-white shadow-glow' : 'bg-gray-100 text-gray-400'}`}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${step >= s.num ? 'text-gray-800' : 'text-gray-400'}`}>{s.label}</span>
            </div>
            {i === 0 && <div className={`w-12 h-0.5 rounded-full mx-2 ${step > 1 ? 'bg-rose-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleShippingSubmit} className="bg-white rounded-3xl border border-rose-50 p-7 shadow-soft"
              >
                <h2 className="font-display text-lg font-bold text-gray-900 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">First Name</label><input type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Jane" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Last Name</label><input type="text" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith" className={inputClass} /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Email Address</label><input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" className={inputClass} /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Phone Number</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className={inputClass} /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Street Address</label><input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="123 Rose Street" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">City</label><input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="New York" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Postal Code</label><input type="text" name="zip" value={form.zip} onChange={handleChange} required placeholder="10001" className={inputClass} /></div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold py-4 rounded-full transition-colors mt-7 shadow-glow"
                >Continue to Payment &rarr;</motion.button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                onSubmit={handlePaymentSubmit} className="bg-white rounded-3xl border border-rose-50 p-7 shadow-soft"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-bold text-gray-900">Payment</h2>
                  <button type="button" onClick={() => setStep(1)} className="text-xs text-rose-400 hover:text-rose-500 font-medium">&larr; Edit Shipping</button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[{ id: 'card', icon: CreditCard, label: 'Credit Card' }, { id: 'apple', icon: Smartphone, label: 'Apple Pay' }, { id: 'wallet', icon: Wallet, label: 'Digital Wallet' }].map(m => (
                    <motion.button key={m.id} type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setPaymentMethod(m.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === m.id ? 'border-rose-400 bg-rose-50 shadow-glow' : 'border-gray-100 hover:border-rose-200'}`}
                    >
                      <m.icon className={`w-6 h-6 ${paymentMethod === m.id ? 'text-rose-500' : 'text-gray-400'}`} />
                      <span className={`text-xs font-medium ${paymentMethod === m.id ? 'text-rose-600' : 'text-gray-500'}`}>{m.label}</span>
                    </motion.button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-6">
                    <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Card Number</label>
                      <div className="relative"><input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" required maxLength="19" className={inputClass} /><CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Expiration Date</label><input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM / YY" required maxLength="7" className={inputClass} /></div>
                      <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Security Code</label>
                        <div className="relative"><input type="text" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" required maxLength="4" className={inputClass} /><Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" /></div>
                      </div>
                    </div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Name on Card</label><input type="text" placeholder="JANE SMITH" className={inputClass} /></div>
                  </div>
                )}

                {paymentMethod !== 'card' && (
                  <div className="bg-rose-50 rounded-2xl p-6 text-center mb-6">
                    <p className="text-sm text-gray-600">{paymentMethod === 'apple' ? "You'll be redirected to Apple Pay to complete your purchase" : "You'll be redirected to your digital wallet"}</p>
                    <p className="text-xs text-gray-400 mt-2">(Demo — no real redirect will occur)</p>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-cream-50 rounded-xl p-3 mb-6">
                  <ShieldCheck className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <p className="text-xs text-gray-500">Your payment information is encrypted and secure</p>
                </div>

                <motion.button whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.4)' }} whileTap={{ scale: 0.98 }} type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold py-4 rounded-full transition-colors shadow-glow flex items-center justify-center gap-2"
                ><Lock className="w-4 h-4" /> Place Order</motion.button>
                <p className="text-[10px] text-gray-300 text-center mt-3">Demo mode — no real payment is processed</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-rose-50 p-7 shadow-soft sticky top-28"
          >
            <h2 className="font-display text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto no-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p><p className="text-[11px] text-gray-400">Qty: {item.quantity}</p></div>
                  <span className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-rose-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span className="font-medium text-gray-700">${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Shipping</span><span className="font-medium text-sage-600">Complimentary</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Estimated Tax</span><span className="font-medium text-gray-700">${(cartTotal * 0.08).toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-rose-100 pt-3"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-gray-900 text-xl">${(cartTotal * 1.08).toFixed(2)}</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
