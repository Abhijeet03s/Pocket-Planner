import { Home, User, CreditCard } from 'lucide-react';
import {
   Car,
   ShoppingBag,
   Heart,
   Plane,
   Pizza,
   Music,
   BookOpen,
   Package,
   Wallet,
   Building,
   Banknote,
   CircleDollarSign,
   SmartphoneNfc,
   QrCode
} from 'lucide-react';

export const categories = [
   { id: 'food_dining', name: 'Food & Dining', icon: Pizza, color: '#EF4444', bgColor: '#FEE2E2' },
   { id: 'transportation', name: 'Transportation', icon: Car, color: '#3B82F6', bgColor: '#DBEAFE' },
   { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: '#8B5CF6', bgColor: '#EDE9FE' },
   { id: 'entertainment', name: 'Entertainment', icon: Music, color: '#EC4899', bgColor: '#FCE7F3' },
   { id: 'bills_utilities', name: 'Bills & Utilities', icon: Home, color: '#F59E0B', bgColor: '#FEF3C7' },
   { id: 'healthcare', name: 'Healthcare', icon: Heart, color: '#10B981', bgColor: '#D1FAE5' },
   { id: 'education', name: 'Education', icon: BookOpen, color: '#6366F1', bgColor: '#E0E7FF' },
   { id: 'travel', name: 'Travel', icon: Plane, color: '#14B8A6', bgColor: '#CCFBF1' },
   { id: 'others', name: 'Others', icon: Package, color: '#4B5563', bgColor: '#F3F4F6' },
] as const;

export const paymentModes = [
   { id: 'cash', name: 'Cash', icon: Banknote, color: '#22C55E', bgColor: '#DCFCE7' },
   { id: 'credit_card', name: 'Credit Card', icon: CreditCard, color: '#3B82F6', bgColor: '#DBEAFE' },
   { id: 'debit_card', name: 'Debit Card', icon: SmartphoneNfc, color: '#8B5CF6', bgColor: '#EDE9FE' },
   { id: 'bank_transfer', name: 'Bank Transfer', icon: Building, color: '#F59E0B', bgColor: '#FEF3C7' },
   { id: 'upi', name: 'UPI', icon: QrCode, color: '#EF4444', bgColor: '#FEE2E2' },
   { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: '#EC4899', bgColor: '#FCE7F3' },
   { id: 'others', name: 'Others', icon: CircleDollarSign, color: '#6B7280', bgColor: '#F3F4F6' },
] as const;

export const links = [
   { href: "/dashboard", label: "Dashboard", icon: Home },
   { href: "/dashboard/expenses", label: "Expenses", icon: CreditCard },
   { href: "/dashboard/profile", label: "Profile", icon: User },
] as const;
