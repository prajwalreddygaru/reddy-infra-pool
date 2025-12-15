// Mock data for Reddy Infra procurement app

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  retailPrice: number;
  pooledPrice: number;
  unit: string;
  moq: number;
  currentPoolQty: number;
  targetPoolQty: number;
  specs: Record<string, string>;
  emiAvailable: boolean;
  deliveryDays: number;
}

export interface Order {
  id: string;
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  status: 'pooled' | 'confirmed' | 'dispatched' | 'delivered';
  createdAt: Date;
  dispatchDate: Date;
  deliveryDate: Date;
  total: number;
  poolSavings: number;
}

export interface EducationCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'cement',
    name: 'Cement',
    icon: 'building-2',
    productCount: 24,
    image: '/cement.jpg',
  },
  {
    id: 'steel',
    name: 'Steel',
    icon: 'layers',
    productCount: 18,
    image: '/steel.jpg',
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'zap',
    productCount: 42,
    image: '/electrical.jpg',
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'droplets',
    productCount: 36,
    image: '/plumbing.jpg',
  },
  {
    id: 'hardware',
    name: 'Hardware',
    icon: 'wrench',
    productCount: 85,
    image: '/hardware.jpg',
  },
];

export const products: Product[] = [
  {
    id: 'cement-001',
    name: 'UltraTech PPC Cement',
    brand: 'UltraTech',
    category: 'cement',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400',
    retailPrice: 420,
    pooledPrice: 365,
    unit: 'bag (50kg)',
    moq: 100,
    currentPoolQty: 2450,
    targetPoolQty: 5000,
    specs: {
      'Type': 'Portland Pozzolana Cement',
      'Grade': '53 Grade',
      'Weight': '50 kg',
      'Setting Time': '30 mins initial',
      'Compressive Strength': '53 MPa at 28 days',
    },
    emiAvailable: true,
    deliveryDays: 7,
  },
  {
    id: 'cement-002',
    name: 'ACC Gold Cement',
    brand: 'ACC',
    category: 'cement',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400',
    retailPrice: 435,
    pooledPrice: 378,
    unit: 'bag (50kg)',
    moq: 100,
    currentPoolQty: 1800,
    targetPoolQty: 5000,
    specs: {
      'Type': 'OPC Cement',
      'Grade': '53 Grade',
      'Weight': '50 kg',
      'Setting Time': '28 mins initial',
      'Compressive Strength': '53 MPa at 28 days',
    },
    emiAvailable: true,
    deliveryDays: 7,
  },
  {
    id: 'cement-003',
    name: 'Ambuja Plus Cement',
    brand: 'Ambuja',
    category: 'cement',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400',
    retailPrice: 410,
    pooledPrice: 355,
    unit: 'bag (50kg)',
    moq: 100,
    currentPoolQty: 3200,
    targetPoolQty: 5000,
    specs: {
      'Type': 'Portland Pozzolana Cement',
      'Grade': '53 Grade',
      'Weight': '50 kg',
      'Setting Time': '32 mins initial',
      'Compressive Strength': '53 MPa at 28 days',
    },
    emiAvailable: false,
    deliveryDays: 5,
  },
  {
    id: 'steel-001',
    name: 'Tata Tiscon TMT Bar',
    brand: 'Tata Steel',
    category: 'steel',
    image: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=400',
    retailPrice: 72500,
    pooledPrice: 65800,
    unit: 'tonne',
    moq: 5,
    currentPoolQty: 35,
    targetPoolQty: 100,
    specs: {
      'Grade': 'Fe 500D',
      'Diameter': '8mm, 10mm, 12mm, 16mm, 20mm',
      'Length': '12m standard',
      'Rib Pattern': 'Parallel rib pattern',
      'Elongation': '>16%',
    },
    emiAvailable: true,
    deliveryDays: 10,
  },
  {
    id: 'steel-002',
    name: 'JSW NeoSteel TMT',
    brand: 'JSW Steel',
    category: 'steel',
    image: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=400',
    retailPrice: 71000,
    pooledPrice: 64200,
    unit: 'tonne',
    moq: 5,
    currentPoolQty: 48,
    targetPoolQty: 100,
    specs: {
      'Grade': 'Fe 550D',
      'Diameter': '8mm, 10mm, 12mm, 16mm, 20mm, 25mm',
      'Length': '12m standard',
      'Corrosion Resistance': 'CRS Technology',
      'Elongation': '>14.5%',
    },
    emiAvailable: true,
    deliveryDays: 10,
  },
  {
    id: 'electrical-001',
    name: 'Havells Lifeline Plus Wire',
    brand: 'Havells',
    category: 'electrical',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    retailPrice: 4850,
    pooledPrice: 4280,
    unit: 'coil (90m)',
    moq: 20,
    currentPoolQty: 180,
    targetPoolQty: 500,
    specs: {
      'Size': '2.5 sq mm',
      'Conductor': 'Electrolytic Grade Copper',
      'Insulation': 'FR PVC',
      'Voltage Grade': '1100V',
      'Length': '90 meters',
    },
    emiAvailable: false,
    deliveryDays: 5,
  },
  {
    id: 'plumbing-001',
    name: 'Ashirvad CPVC Pipes',
    brand: 'Ashirvad',
    category: 'plumbing',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
    retailPrice: 285,
    pooledPrice: 248,
    unit: 'pipe (3m)',
    moq: 100,
    currentPoolQty: 650,
    targetPoolQty: 1000,
    specs: {
      'Size': '1 inch (25mm)',
      'Material': 'CPVC',
      'Length': '3 meters',
      'Pressure Rating': 'SDR 11',
      'Temperature': 'Up to 93°C',
    },
    emiAvailable: false,
    deliveryDays: 4,
  },
  {
    id: 'hardware-001',
    name: 'Godrej Navtal Lock Set',
    brand: 'Godrej',
    category: 'hardware',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    retailPrice: 1850,
    pooledPrice: 1620,
    unit: 'set',
    moq: 50,
    currentPoolQty: 320,
    targetPoolQty: 500,
    specs: {
      'Type': 'Cylindrical Lock',
      'Material': 'Brass + Stainless Steel',
      'Keys': '3 keys included',
      'Finish': 'Satin Nickel',
      'Warranty': '7 years',
    },
    emiAvailable: false,
    deliveryDays: 5,
  },
];

export const educationCards: EducationCard[] = [
  {
    id: 'pooling',
    title: 'Why Pool Orders?',
    description: 'Aggregating orders across buyers gives you factory-direct pricing. More volume = lower costs for everyone.',
    icon: 'users',
  },
  {
    id: 'logistics',
    title: 'Logistics Savings',
    description: 'Coordinated dispatch reduces per-unit freight costs by up to 40%. Scheduled deliveries mean predictable timelines.',
    icon: 'truck',
  },
  {
    id: 'timing',
    title: 'Strategic Timing',
    description: 'Our dispatch cycles are timed with market fluctuations. Patience often means 10-15% additional savings.',
    icon: 'clock',
  },
];

export const cities = [
  'Hyderabad',
  'Bengaluru',
  'Chennai',
  'Mumbai',
  'Pune',
  'Ahmedabad',
  'Delhi NCR',
  'Kolkata',
  'Jaipur',
  'Lucknow',
];

export const userTypes = [
  { id: 'contractor', label: 'Contractor', description: 'Building projects for clients' },
  { id: 'builder', label: 'Builder / Developer', description: 'Real estate development' },
  { id: 'retailer', label: 'Material Retailer', description: 'Selling construction materials' },
  { id: 'architect', label: 'Architect / Engineer', description: 'Design and planning' },
  { id: 'individual', label: 'Individual Buyer', description: 'Personal construction needs' },
];

// Calculate next dispatch date (every Monday and Thursday)
export function getNextDispatchDate(): Date {
  const now = new Date();
  const day = now.getDay();
  let daysUntilDispatch: number;

  if (day < 1) {
    daysUntilDispatch = 1; // Sunday -> Monday
  } else if (day < 4) {
    daysUntilDispatch = 4 - day; // Mon-Wed -> Thursday
  } else if (day === 4) {
    daysUntilDispatch = 4; // Thursday -> Next Monday
  } else {
    daysUntilDispatch = 8 - day; // Fri-Sat -> Next Monday
  }

  const dispatchDate = new Date(now);
  dispatchDate.setDate(dispatchDate.getDate() + daysUntilDispatch);
  dispatchDate.setHours(10, 0, 0, 0);
  return dispatchDate;
}

export function getDaysUntilDispatch(): number {
  const now = new Date();
  const dispatch = getNextDispatchDate();
  const diffTime = dispatch.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getHoursUntilDispatch(): number {
  const now = new Date();
  const dispatch = getNextDispatchDate();
  const diffTime = dispatch.getTime() - now.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60));
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    items: [
      { product: products[0], quantity: 200 },
      { product: products[3], quantity: 10 },
    ],
    status: 'dispatched',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    dispatchDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    total: 730000,
    poolSavings: 85000,
  },
  {
    id: 'ORD-2024-002',
    items: [
      { product: products[1], quantity: 150 },
    ],
    status: 'pooled',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    dispatchDate: getNextDispatchDate(),
    deliveryDate: new Date(getNextDispatchDate().getTime() + 7 * 24 * 60 * 60 * 1000),
    total: 56700,
    poolSavings: 8550,
  },
  {
    id: 'ORD-2024-003',
    items: [
      { product: products[5], quantity: 50 },
      { product: products[6], quantity: 200 },
    ],
    status: 'delivered',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    dispatchDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    deliveryDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    total: 263600,
    poolSavings: 35900,
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateSavings(retailPrice: number, pooledPrice: number): number {
  return Math.round(((retailPrice - pooledPrice) / retailPrice) * 100);
}
