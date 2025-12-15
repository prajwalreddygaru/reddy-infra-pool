import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNav?: boolean;
  showHeader?: boolean;
}

export function AppLayout({
  children,
  title,
  showBack = false,
  showSearch = false,
  showNav = true,
  showHeader = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header title={title} showBack={showBack} showSearch={showSearch} />}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={showNav ? 'pb-20' : ''}
      >
        {children}
      </motion.main>
      {showNav && <BottomNav />}
    </div>
  );
}
