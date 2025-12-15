import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, Truck, Clock, CreditCard, Wallet } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppStore } from '@/lib/store';
import { formatCurrency, getDaysUntilDispatch, getNextDispatchDate } from '@/lib/mockData';
import { toast } from '@/hooks/use-toast';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, getCartSavings, clearCart } = useAppStore();

  const total = getCartTotal();
  const savings = getCartSavings();
  const daysUntilDispatch = getDaysUntilDispatch();
  const dispatchDate = getNextDispatchDate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add products to your cart to proceed',
        variant: 'destructive',
      });
      return;
    }
    // Navigate to confirmation
    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    return (
      <AppLayout title="Cart">
        <div className="page-container px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm mx-auto"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add products to your cart and start saving with pooled pricing
            </p>
            <button
              onClick={() => navigate('/categories')}
              className="btn-primary"
            >
              Browse Categories
            </button>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Cart" showNav={false}>
      <div className="page-container pb-48">
        {/* Dispatch Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Next dispatch in {daysUntilDispatch} days
              </p>
              <p className="text-sm text-muted-foreground">
                {dispatchDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cart Items */}
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Pool Items ({cart.length})</h2>
            <button
              onClick={() => {
                clearCart();
                toast({ title: 'Cart cleared' });
              }}
              className="text-sm text-destructive font-medium"
            >
              Clear all
            </button>
          </div>

          {cart.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-interactive p-4"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                      <h3 className="font-medium text-foreground">{item.product.name}</h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="price-tag">{formatCurrency(item.product.pooledPrice)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            Math.max(item.product.moq, item.quantity - item.product.moq)
                          )
                        }
                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
                        disabled={item.quantity <= item.product.moq}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + item.product.moq)
                        }
                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(item.product.pooledPrice * item.quantity)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 mt-2"
        >
          <h3 className="font-semibold text-foreground mb-3">Payment Options</h3>
          <div className="space-y-2">
            <button className="w-full p-4 rounded-xl border-2 border-primary bg-primary/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-foreground">Pay Now</p>
                <p className="text-sm text-muted-foreground">Full payment upfront</p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              </div>
            </button>
            <button className="w-full p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-foreground">EMI Option</p>
                <p className="text-sm text-muted-foreground">Pay in installments</p>
              </div>
              <span className="mock-badge">COMING SOON</span>
            </button>
          </div>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-4 mt-4 p-4 bg-muted rounded-xl"
        >
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Free delivery on orders above ₹50,000
            </p>
          </div>
        </motion.div>

        {/* Price Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-4 mt-4 p-3 bg-warning/10 border border-warning/20 rounded-xl"
        >
          <p className="text-xs text-muted-foreground text-center">
            <span className="mock-badge mr-1">NOTE</span>
            All prices shown are indicative. Final prices will be confirmed at dispatch.
          </p>
        </motion.div>

        {/* Bottom Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-accent font-medium">Your Savings</span>
              <span className="text-accent font-medium">-{formatCurrency(savings)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-xl text-foreground">{formatCurrency(total)}</span>
            </div>
          </div>
          <button onClick={handleCheckout} className="btn-primary w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
