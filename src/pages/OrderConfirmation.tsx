import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Home, Calendar, ArrowRight } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppStore } from '@/lib/store';
import { formatCurrency, getNextDispatchDate } from '@/lib/mockData';
import { useEffect, useState } from 'react';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartSavings, clearCart } = useAppStore();
  const [orderId] = useState(`ORD-${Date.now().toString().slice(-8)}`);

  const total = getCartTotal();
  const savings = getCartSavings();
  const dispatchDate = getNextDispatchDate();
  const deliveryDate = new Date(dispatchDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const timeline = [
    { status: 'Pooled', icon: Package, date: 'Today', active: true, completed: true },
    { status: 'Confirmed', icon: CheckCircle2, date: dispatchDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }), active: false, completed: false },
    { status: 'Dispatched', icon: Truck, date: dispatchDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }), active: false, completed: false },
    { status: 'Delivered', icon: Home, date: deliveryDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }), active: false, completed: false },
  ];

  useEffect(() => {
    // Clear cart after showing confirmation
    const timer = setTimeout(() => {
      clearCart();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout showHeader={false} showNav={false}>
      <div className="min-h-screen bg-background p-4">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex flex-col items-center pt-12 pb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-foreground"
          >
            Order Pooled!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mt-1"
          >
            Your order has been added to the pool
          </motion.p>
        </motion.div>

        {/* Order ID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-4 mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-bold text-foreground">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-bold text-xl text-foreground">{formatCurrency(total)}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-accent font-medium">You saved</span>
              <span className="text-sm text-accent font-bold">{formatCurrency(savings)}</span>
            </div>
          </div>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-4 mb-4"
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Order Timeline
          </h3>
          <div className="relative">
            {timeline.map((step, index) => (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 pb-6 last:pb-0"
              >
                {/* Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-12 bg-border" style={{ transform: `translateY(${index * 72}px)` }}>
                    {step.completed && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="w-full bg-accent"
                      />
                    )}
                  </div>
                )}
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed
                      ? 'bg-accent text-accent-foreground'
                      : step.active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <p className={`font-medium ${step.completed || step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.status}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.date}</p>
                </div>
                {step.completed && (
                  <span className="text-xs font-medium px-2 py-1 rounded bg-accent/10 text-accent">
                    Done
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Items Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card border border-border rounded-xl p-4 mb-4"
        >
          <h3 className="font-semibold text-foreground mb-3">Items in Pool</h3>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-foreground">
                  {formatCurrency(item.product.pooledPrice * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="p-3 bg-muted rounded-xl mb-6"
        >
          <p className="text-xs text-muted-foreground text-center">
            <span className="mock-badge mr-1">INFO</span>
            Order will be confirmed once the pool target is reached. You'll receive updates via SMS.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <button
            onClick={() => navigate('/orders')}
            className="btn-primary w-full"
          >
            View My Orders
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary w-full"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
