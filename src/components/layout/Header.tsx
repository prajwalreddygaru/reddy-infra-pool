import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Search, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function Header({
  title,
  showBack = false,
  showSearch = false,
  showNotifications = true,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const getDefaultTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'reddyinfra.in';
    if (path === '/categories') return 'Categories';
    if (path === '/cart') return 'Cart';
    if (path === '/orders') return 'My Orders';
    if (path === '/profile') return 'Profile';
    if (path === '/learn') return 'Learn';
    if (path.startsWith('/category/')) return 'Products';
    if (path.startsWith('/product/')) return 'Product Details';
    return 'reddyinfra.in';
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border"
    >
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {isHome && !showBack && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
          <h1 className="text-lg font-semibold text-foreground">
            {title || getDefaultTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          {showNotifications && (
            <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
