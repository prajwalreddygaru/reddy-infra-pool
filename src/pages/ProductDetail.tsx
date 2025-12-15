import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TrendingDown, 
  Truck, 
  Shield, 
  Clock, 
  Minus, 
  Plus, 
  ShoppingCart,
  ChevronRight,
  Info
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { products, formatCurrency, calculateSavings, getDaysUntilDispatch } from '@/lib/mockData';
import { useAppStore } from '@/lib/store';
import { toast } from '@/hooks/use-toast';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useAppStore();
  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(product?.moq || 1);

  if (!product) {
    return (
      <AppLayout showBack>
        <div className="page-container px-4 py-8 text-center">
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </AppLayout>
    );
  }

  const savings = calculateSavings(product.retailPrice, product.pooledPrice);
  const totalRetail = product.retailPrice * quantity;
  const totalPooled = product.pooledPrice * quantity;
  const totalSavings = totalRetail - totalPooled;
  const daysUntilDispatch = getDaysUntilDispatch();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} ${product.unit}s of ${product.name} added`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <AppLayout showBack showNav={false}>
      <div className="page-container pb-32">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/3] bg-secondary"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.emiAvailable && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
              EMI Available
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h1 className="text-xl font-bold text-foreground mt-1">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="price-tag text-3xl">{formatCurrency(product.pooledPrice)}</span>
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.retailPrice)}
              </span>
              <span className="text-sm text-muted-foreground">/{product.unit}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="savings-badge text-sm">
                <TrendingDown className="w-4 h-4" />
                Save {savings}% with Pool Pricing
              </span>
            </div>

            <div className="mt-2 p-2 bg-muted rounded-lg inline-flex items-center gap-1">
              <span className="mock-badge">ESTIMATED</span>
              <span className="text-xs text-muted-foreground">Price may vary</span>
            </div>
          </motion.div>

          {/* Pool Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 p-4 bg-card border border-border rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Current Pool Status</span>
              <span className="text-sm text-accent font-medium">
                {Math.round((product.currentPoolQty / product.targetPoolQty) * 100)}% filled
              </span>
            </div>
            <div className="pool-progress h-3">
              <motion.div
                className="pool-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${(product.currentPoolQty / product.targetPoolQty) * 100}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
              <span>{product.currentPoolQty.toLocaleString()} pooled</span>
              <span>Target: {product.targetPoolQty.toLocaleString()} {product.unit}s</span>
            </div>
          </motion.div>

          {/* Quantity Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Quantity</span>
              <span className="text-sm text-muted-foreground">MOQ: {product.moq} {product.unit}s</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(product.moq, quantity - product.moq))}
                className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                disabled={quantity <= product.moq}
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-foreground">{quantity}</span>
                <span className="text-sm text-muted-foreground ml-1">{product.unit}s</span>
              </div>
              <button
                onClick={() => setQuantity(quantity + product.moq)}
                className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Price Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-xl"
          >
            <h3 className="font-medium text-foreground flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-accent" />
              Price Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Retail Total</span>
                <span className="text-muted-foreground line-through">{formatCurrency(totalRetail)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pool Price Total</span>
                <span className="font-medium text-foreground">{formatCurrency(totalPooled)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-accent/20">
                <span className="font-medium text-accent">Your Savings</span>
                <span className="font-bold text-accent">{formatCurrency(totalSavings)}</span>
              </div>
            </div>
          </motion.div>

          {/* Delivery Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 space-y-3"
          >
            <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Next Dispatch in {daysUntilDispatch} days</p>
                <p className="text-xs text-muted-foreground">Expected delivery: {product.deliveryDays} days after dispatch</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <Truck className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders above ₹50,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Quality Guaranteed</p>
                <p className="text-xs text-muted-foreground">Direct from authorized distributors</p>
              </div>
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <h3 className="font-medium text-foreground mb-3">Specifications</h3>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {Object.entries(product.specs).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex justify-between px-4 py-3 ${
                    index !== Object.keys(product.specs).length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-sm text-muted-foreground">{key}</span>
                  <span className="text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pooling Benefit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <h3 className="font-medium text-foreground mb-2">Why Pool Orders?</h3>
            <p className="text-sm text-muted-foreground">
              By combining your order with other buyers, we negotiate factory-direct pricing. 
              More volume means lower costs for everyone. The pool closes before each dispatch 
              cycle, ensuring predictable delivery schedules.
            </p>
            <button className="text-sm text-primary font-medium mt-2 flex items-center gap-1">
              Learn more <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 btn-primary"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
