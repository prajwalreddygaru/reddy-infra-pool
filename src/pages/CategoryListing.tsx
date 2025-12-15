import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { TrendingDown, Filter, SortDesc } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { products, categories, formatCurrency, calculateSavings } from '@/lib/mockData';

export default function CategoryListing() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);

  if (!category) {
    return (
      <AppLayout showBack>
        <div className="page-container px-4 py-8 text-center">
          <p className="text-muted-foreground">Category not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={category.name} showBack showSearch>
      <div className="page-container">
        {/* Filters */}
        <div className="sticky top-14 z-30 bg-background border-b border-border">
          <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto">
            <button className="btn-secondary py-2 px-3 text-sm flex items-center gap-1.5 flex-shrink-0">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="btn-secondary py-2 px-3 text-sm flex items-center gap-1.5 flex-shrink-0">
              <SortDesc className="w-4 h-4" />
              Sort
            </button>
            <button className="py-2 px-3 text-sm rounded-full bg-accent/10 text-accent font-medium flex-shrink-0">
              Best Savings
            </button>
            <button className="py-2 px-3 text-sm rounded-full bg-secondary text-secondary-foreground flex-shrink-0">
              EMI Available
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="px-4 py-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            {categoryProducts.length} products available
          </p>

          {categoryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="card-interactive block p-4"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <h3 className="font-medium text-foreground">{product.name}</h3>
                      </div>
                      {product.emiAvailable && (
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-primary/10 text-primary rounded">
                          EMI
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="price-tag text-xl">{formatCurrency(product.pooledPrice)}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(product.retailPrice)}
                      </span>
                      <span className="text-xs text-muted-foreground">/{product.unit}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="savings-badge">
                        <TrendingDown className="w-3 h-3" />
                        {calculateSavings(product.retailPrice, product.pooledPrice)}% off
                      </span>
                      <span className="text-xs text-muted-foreground">
                        MOQ: {product.moq} {product.unit}s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pool Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                    <span className="font-medium text-foreground">
                      {Math.round((product.currentPoolQty / product.targetPoolQty) * 100)}% of pool filled
                    </span>
                    <span>
                      {product.currentPoolQty.toLocaleString()}/{product.targetPoolQty.toLocaleString()}
                    </span>
                  </div>
                  <div className="pool-progress h-2.5">
                    <motion.div
                      className="pool-progress-bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${(product.currentPoolQty / product.targetPoolQty) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="w-full mt-4 py-2.5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  + Add to Pool
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-muted-foreground">No products available in this category</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
