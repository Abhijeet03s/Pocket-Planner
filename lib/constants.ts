import { Home, User, CreditCard } from 'lucide-react';

export const categories = [
   { id: 'food_dining', name: 'Food & Dining', icon: '🍔', color: '#FF5733', textColor: '#FFFFFF' },
   { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#33FF57', textColor: '#FFFFFF' },
   { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#33A1FF', textColor: '#FFFFFF' },
   { id: 'entertainment', name: 'Entertainment', icon: '🎥', color: '#FF33A1', textColor: '#FFFFFF' },
   { id: 'bills_utilities', name: 'Bills & Utilities', icon: '💰', color: '#3333FF', textColor: '#FFFFFF' },
   { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#FF3333', textColor: '#FFFFFF' },
   { id: 'education', name: 'Education', icon: '🎓', color: '#33FF33', textColor: '#FFFFFF' },
   { id: 'travel', name: 'Travel', icon: '🌍', color: '#3333FF', textColor: '#FFFFFF' },
   { id: 'others', name: 'Others', icon: '💸', color: '#FF3333', textColor: '#FFFFFF' },
] as const;

export const paymentModes = [
   { id: 'cash', name: 'Cash', icon: '🤑' },
   { id: 'credit_card', name: 'Credit Card', icon: '💳' },
   { id: 'debit_card', name: 'Debit Card', icon: '💳' },
   { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
   { id: 'paypal', name: 'PayPal', icon: '💰' },
] as const;

export const links = [
   { href: "/dashboard", label: "Dashboard", icon: Home },
   { href: "/dashboard/expenses", label: "Expenses", icon: CreditCard },
   { href: "/dashboard/profile", label: "Profile", icon: User },
] as const;
