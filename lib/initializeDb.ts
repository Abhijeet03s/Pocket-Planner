import prisma from '@/lib/prisma';

export async function initializeCategories() {
   try {
      const defaultCategories = [
         { id: 'food_dining', name: 'Food & Dining', icon: '🍔', color: '#EF4444', bgColor: '#FEE2E2' },
         { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#3B82F6', bgColor: '#DBEAFE' },
         { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#8B5CF6', bgColor: '#EDE9FE' },
         { id: 'entertainment', name: 'Entertainment', icon: '🎥', color: '#EC4899', bgColor: '#FCE7F3' },
         { id: 'bills_utilities', name: 'Bills & Utilities', icon: '💰', color: '#F59E0B', bgColor: '#FEF3C7' },
         { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#10B981', bgColor: '#D1FAE5' },
         { id: 'education', name: 'Education', icon: '🎓', color: '#6366F1', bgColor: '#E0E7FF' },
         { id: 'travel', name: 'Travel', icon: '🌍', color: '#14B8A6', bgColor: '#CCFBF1' },
         { id: 'gifts', name: 'Gifts', icon: '🎁', color: '#F472B6', bgColor: '#FCE7F3' },
         { id: 'clothing', name: 'Clothing', icon: '👕', color: '#6B7280', bgColor: '#F3F4F6' },
         { id: 'personal_care', name: 'Personal Care', icon: '✂️', color: '#9333EA', bgColor: '#F3E8FF' },
         { id: 'business', name: 'Business', icon: '💼', color: '#2563EB', bgColor: '#DBEAFE' },
         { id: 'subscriptions', name: 'Subscriptions', icon: '💳', color: '#DC2626', bgColor: '#FEE2E2' },
         { id: 'others', name: 'Others', icon: '📦', color: '#4B5563', bgColor: '#F3F4F6' },
      ];

      for (const category of defaultCategories) {
         await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: category,
         });
      }
   } catch (error) {
      console.error('Error initializing categories:', error);
      throw error;
   }
}