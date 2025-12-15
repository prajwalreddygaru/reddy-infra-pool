import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Search } from 'lucide-react';
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

  const getDefaultTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Reddy Infra';
    if (path === '/categories') return 'Categories';
    if (path === '/cart') return 'Cart';
    if (path === '/orders') return 'My Orders';
    if (path === '/profile') return 'Profile';
    if (path === '/learn') return 'Learn';
    if (path.startsWith('/category/')) return 'Products';
    if (path.startsWith('/product/')) return 'Product Details';
    return 'Reddy Infra';
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
