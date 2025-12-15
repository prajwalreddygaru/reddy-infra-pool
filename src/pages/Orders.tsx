import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, Clock, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockOrders, formatCurrency } from '@/lib/mockData';

const statusConfig = {
  pooled: {
    label: 'Pooled',
    icon: Clock,
    color: 'status-pooled',
  },
  confirmed: {
    label: 'Confirmed',
    icon: CheckCircle2,
    color: 'status-confirmed',
  },
  dispatched: {
    label: 'Dispatched',
    icon: Truck,
    color: 'status-dispatched',
  },
  delivered: {
    label: 'Delivered',
    icon: Package,
    color: 'status-delivered',
  },
};

export default function Orders() {
  return (
    <AppLayout>
      <div className="page-container px-4 py-4">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{mockOrders.length}</p>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
            <p className="text-sm text-accent">Total Savings</p>
            <p className="text-2xl font-bold text-accent">
              {formatCurrency(mockOrders.reduce((sum, o) => sum + o.poolSavings, 0))}
            </p>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map((order, index) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-interactive overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-foreground">{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <span className="flex items-center gap-1">
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ordered on {order.createdAt.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {/* Items */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items.slice(0, 2).map((item) => (
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
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-sm text-muted-foreground">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>

                  {/* Timeline Preview */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Dispatch</p>
                        <p className="font-medium text-foreground">
                          {order.dispatchDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex-1 h-0.5 bg-border mx-3 relative">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-accent rounded"
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              order.status === 'pooled'
                                ? '25%'
                                : order.status === 'confirmed'
                                ? '50%'
                                : order.status === 'dispatched'
                                ? '75%'
                                : '100%',
                          }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Delivery</p>
                        <p className="font-medium text-foreground">
                          {order.deliveryDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold text-lg text-foreground">{formatCurrency(order.total)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.status === 'delivered' && (
                        <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                          <Download className="w-5 h-5 text-muted-foreground" />
                        </button>
                      )}
                      <button className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mock Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-3 bg-muted rounded-xl"
        >
          <p className="text-xs text-muted-foreground text-center">
            <span className="mock-badge mr-1">DEMO</span>
            These are sample orders for demonstration purposes
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
}
