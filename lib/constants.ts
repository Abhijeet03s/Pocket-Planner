import { ShoppingBag, Gift, Pizza, Home, Car, Heart, Briefcase, Music, Shirt, Scissors, BookOpen, Plane, Package } from 'lucide-react';

export const categories = [
   { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: '#E9F7EF', textColor: '#27AE60' },
   { id: 'gifts', name: 'Gifts', icon: Gift, color: '#F4ECF7', textColor: '#8E44AD' },
   { id: 'food', name: 'Food', icon: Pizza, color: '#FDEDEC', textColor: '#E74C3C' },
   { id: 'housing', name: 'Housing', icon: Home, color: '#EBF5FB', textColor: '#3498DB' },
   { id: 'transportation', name: 'Transportation', icon: Car, color: '#FEF5E7', textColor: '#F39C12' },
   { id: 'healthcare', name: 'Healthcare', icon: Heart, color: '#F2D7D5', textColor: '#C0392B' },
   { id: 'work', name: 'Work', icon: Briefcase, color: '#E8F6F3', textColor: '#16A085' },
   { id: 'entertainment', name: 'Entertainment', icon: Music, color: '#F9EBEA', textColor: '#CB4335' },
   { id: 'clothing', name: 'Clothing', icon: Shirt, color: '#F5EEF8', textColor: '#9B59B6' },
   { id: 'personal', name: 'Personal Care', icon: Scissors, color: '#EAF2F8', textColor: '#2980B9' },
   { id: 'education', name: 'Education', icon: BookOpen, color: '#FDF2E9', textColor: '#D35400' },
   { id: 'travel', name: 'Travel', icon: Plane, color: '#E5E8E8', textColor: '#2C3E50' },
   { id: 'other', name: 'Other', icon: Package, color: '#EAECEE', textColor: '#7F8C8D' },
];

export const paymentModes = [
   { id: 'cash', name: 'Cash', icon: 'wallet' },
   { id: 'credit-card', name: 'Credit Card', icon: 'credit-card' },
   { id: 'debit-card', name: 'Debit Card', icon: 'credit-card' },
   { id: 'upi', name: 'UPI', icon: 'smartphone' },
   { id: 'net-banking', name: 'Net Banking', icon: 'laptop' },
   { id: 'bank-transfer', name: 'Bank Transfer', icon: 'building-bank' },
   { id: 'other', name: 'Other', icon: 'more-horizontal' },
];
