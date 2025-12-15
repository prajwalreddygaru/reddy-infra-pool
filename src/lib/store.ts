import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './mockData';

interface CartItem {
  product: Product;
  quantity: number;
}

interface UserState {
  isOnboarded: boolean;
  phone: string;
  userType: string;
  city: string;
  name: string;
}

interface AppState {
  user: UserState;
  cart: CartItem[];
  setUser: (user: Partial<UserState>) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartSavings: () => number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        isOnboarded: false,
        phone: '',
        userType: '',
        city: '',
        name: '',
      },
      cart: [],

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.product.pooledPrice * item.quantity,
          0
        );
      },

      getCartSavings: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) =>
            total + (item.product.retailPrice - item.product.pooledPrice) * item.quantity,
          0
        );
      },
    }),
    {
      name: 'reddy-infra-storage',
    }
  )
);
