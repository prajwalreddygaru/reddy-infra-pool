import { motion } from 'framer-motion';
import { Clock, TrendingDown, Users, Truck, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { categories, products, educationCards, getDaysUntilDispatch, getHoursUntilDispatch, formatCurrency, calculateSavings } from '@/lib/mockData';
import { useState, useEffect } from 'react';

const categoryIcons: Record<string, React.ReactNode> = {
  'building-2': <span className="text-2xl">🏗️</span>,
  'layers': <span className="text-2xl">🔩</span>,
  'zap': <span className="text-2xl">⚡</span>,
  'droplets': <span className="text-2xl">🚰</span>,
  'wrench': <span className="text-2xl">🔧</span>,
};

export default function Home() {
  const [hours, setHours] = useState(getHoursUntilDispatch());
  const days = getDaysUntilDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(getHoursUntilDispatch());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get top products from different categories for trending section
  const trendingProducts = [
    products.find(p => p.category === 'cement'),
    products.find(p => p.category === 'steel'),
    products.find(p => p.category === 'electrical'),
    products.find(p => p.category === 'plumbing'),
    products.find(p => p.category === 'hardware'),
  ].filter(Boolean).slice(0, 5) as typeof products;

  return (
    <AppLayout showSearch>
      <div className="page-container">
        {/* Dispatch Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium opacity-90">Next Dispatch</span>
              </div>
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={days}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold"
                >
                  {days}
                </motion.span>
                <span className="text-lg opacity-90">days</span>
              </div>
              <p className="text-xs opacity-75 mt-1">{hours} hours remaining</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center"
            >
              <Clock className="w-8 h-8" />
            </motion.div>
          </div>
          <p className="text-xs mt-3 opacity-80">
            Pool your orders now to lock in bulk pricing
          </p>
        </motion.div>

        {/* Categories */}
        <section className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Categories</h2>
            <Link to="/categories" className="text-sm text-primary font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    {categoryIcons[category.icon]}
                  </div>
                  <span className="text-xs font-medium text-foreground text-center leading-tight">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Bulk Deals */}
        <section className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Trending Bulk Deals</h2>
            </div>
          </div>
          <div className="space-y-3">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="card-interactive flex gap-4 p-4"
                >
                  <div className="w-20 h-20 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="price-tag text-lg">{formatCurrency(product.pooledPrice)}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(product.retailPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="savings-badge">
                        <TrendingDown className="w-3 h-3" />
                        Save {calculateSavings(product.retailPrice, product.pooledPrice)}%
                      </span>
                      {product.emiAvailable && (
                        <span className="text-xs text-muted-foreground">EMI Available</span>
                      )}
                    </div>
                    {/* Pool Progress */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{Math.round((product.currentPoolQty / product.targetPoolQty) * 100)}% pooled</span>
                        <span>{product.currentPoolQty}/{product.targetPoolQty} {product.unit}s</span>
                      </div>
                      <div className="pool-progress">
                        <motion.div
                          className="pool-progress-bar"
                          initial={{ width: 0 }}
                          animate={{ width: `${(product.currentPoolQty / product.targetPoolQty) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">How Price Pooling Works</h2>
          </div>
          <div className="space-y-3">
            {educationCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link
                  to="/learn"
                  className="card-interactive p-4 flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    {card.icon === 'users' && <Users className="w-5 h-5 text-accent" />}
                    {card.icon === 'truck' && <Truck className="w-5 h-5 text-accent" />}
                    {card.icon === 'clock' && <Clock className="w-5 h-5 text-accent" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{card.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mock Data Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mx-4 mt-6 mb-4 p-3 bg-muted rounded-xl"
        >
          <p className="text-xs text-muted-foreground text-center">
            <span className="mock-badge mr-1">DEMO</span>
            All prices shown are estimated/indicative. Actual prices may vary based on market conditions.
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
}
