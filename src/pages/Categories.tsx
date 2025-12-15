import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { categories, products } from '@/lib/mockData';

const categoryIcons: Record<string, string> = {
  'building-2': '🏗️',
  'layers': '🔩',
  'zap': '⚡',
  'droplets': '🚰',
  'wrench': '🔧',
};

export default function Categories() {
  return (
    <AppLayout>
      <div className="page-container px-4 py-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground mb-4"
        >
          Browse materials by category
        </motion.p>

        <div className="space-y-3">
          {categories.map((category, index) => {
            const categoryProducts = products.filter((p) => p.category === category.id);
            const avgSavings = categoryProducts.length > 0
              ? Math.round(
                  categoryProducts.reduce(
                    (sum, p) => sum + ((p.retailPrice - p.pooledPrice) / p.retailPrice) * 100,
                    0
                  ) / categoryProducts.length
                )
              : 0;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="card-interactive flex items-center gap-4 p-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl">
                    {categoryIcons[category.icon]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.productCount} products
                    </p>
                    {avgSavings > 0 && (
                      <p className="text-xs text-accent font-medium mt-0.5">
                        Avg. {avgSavings}% savings with pooling
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
