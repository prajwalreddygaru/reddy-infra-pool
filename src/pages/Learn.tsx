import { motion } from 'framer-motion';
import { Users, Truck, Clock, TrendingDown, ArrowRight, Package, Factory, Store } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Learn() {
  return (
    <AppLayout title="How It Works" showBack>
      <div className="page-container px-4 py-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Smart Procurement, Better Prices
          </h1>
          <p className="text-muted-foreground">
            Understand how pooling saves you money
          </p>
        </motion.div>

        {/* Retail vs Pooled Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Retail vs Pooled Pricing
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Store className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Retail</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Individual orders</p>
                <p>• Dealer margins</p>
                <p>• Higher logistics cost</p>
                <p>• Unpredictable pricing</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">Example</p>
                <p className="font-mono font-bold text-lg text-foreground">₹420/bag</p>
              </div>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Factory className="w-5 h-5 text-accent" />
                <span className="font-medium text-accent">Pooled</span>
              </div>
              <div className="space-y-2 text-sm text-accent/80">
                <p>• Aggregated volume</p>
                <p>• Factory-direct</p>
                <p>• Optimized logistics</p>
                <p>• Locked-in pricing</p>
              </div>
              <div className="mt-4 pt-3 border-t border-accent/20">
                <p className="text-xs text-accent/70">Example</p>
                <p className="font-mono font-bold text-lg text-accent">₹365/bag</p>
                <p className="text-xs text-accent font-medium">Save 13%</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How Pooling Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            How Pooling Works
          </h2>
          <div className="relative">
            {[
              {
                icon: Users,
                title: 'Buyers Pool Orders',
                description: 'Multiple contractors and builders add their requirements to the pool.',
              },
              {
                icon: Package,
                title: 'Volume Accumulates',
                description: 'As more orders join, the combined volume increases bargaining power.',
              },
              {
                icon: Factory,
                title: 'Factory-Direct Pricing',
                description: 'We negotiate bulk pricing directly with manufacturers.',
              },
              {
                icon: Truck,
                title: 'Coordinated Dispatch',
                description: 'Scheduled deliveries reduce logistics costs for everyone.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-4 pb-6 last:pb-0"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  {index < 3 && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-medium text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Logistics Cost Structure */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            Logistics Cost Breakdown
          </h2>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Individual Orders</span>
                  <span className="text-sm font-medium text-foreground">₹15-20/km per tonne</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-muted-foreground/50 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Pooled Dispatch</span>
                  <span className="text-sm font-medium text-accent">₹8-12/km per tonne</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-accent" />
              <span className="text-sm text-accent font-medium">Up to 40% logistics savings</span>
            </div>
          </div>
        </motion.section>

        {/* Why Waiting Saves Money */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Why Timing Matters
          </h2>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Market Timing</p>
                  <p className="text-sm text-muted-foreground">
                    We monitor price fluctuations and time purchases strategically
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Volume Accumulation</p>
                  <p className="text-sm text-muted-foreground">
                    Larger pools mean better negotiating leverage
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Route Optimization</p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled cycles allow for efficient delivery routes
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-primary/20">
              <p className="text-sm text-primary font-medium flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Patience can save you 10-15% more
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a href="/categories" className="btn-primary inline-flex">
            Start Saving Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </AppLayout>
  );
}
