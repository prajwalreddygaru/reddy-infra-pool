import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Bell, 
  HelpCircle, 
  FileText, 
  Shield, 
  ChevronRight, 
  LogOut,
  Building2,
  Phone,
  Edit2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppStore } from '@/lib/store';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();

  const handleLogout = () => {
    setUser({
      isOnboarded: false,
      phone: '',
      userType: '',
      city: '',
      name: '',
    });
    navigate('/onboarding');
  };

  const menuItems = [
    { icon: MapPin, label: 'Delivery Addresses', badge: null },
    { icon: Bell, label: 'Notifications', badge: '3' },
    { icon: FileText, label: 'Invoices & Documents', badge: null },
    { icon: HelpCircle, label: 'Help & Support', badge: null },
    { icon: Shield, label: 'Privacy & Terms', badge: null },
  ];

  return (
    <AppLayout>
      <div className="page-container px-4 py-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {user.name || 'Demo User'}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                    +91 {user.phone || '9876543210'}
                  </p>
                </div>
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground capitalize">
                  {user.userType || 'Contractor'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {user.city || 'Hyderabad'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4 mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Business Details</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete your business profile to access credit facilities and priority dispatch.
          </p>
          <button className="mt-3 text-sm text-primary font-medium flex items-center gap-1">
            Complete Profile <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-muted rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Reddy Infra</p>
              <p className="text-sm text-muted-foreground">Version 1.0.0 (Demo)</p>
            </div>
            <span className="mock-badge">MVP</span>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </motion.button>

        {/* Demo Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          This is a demo version. All data shown is for demonstration purposes only.
        </motion.p>
      </div>
    </AppLayout>
  );
}
