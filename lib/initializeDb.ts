import prisma from '@/lib/prisma';

export async function initializeCategories() {
   try {
      const defaultCategories = [
         { id: 'food_dining', name: 'Food & Dining', icon: '🍔', color: '#FF5733' },
         { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#33FF57' },
         { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#33A1FF' },
         { id: 'entertainment', name: 'Entertainment', icon: '🎥', color: '#FF33A1' },
         { id: 'bills_utilities', name: 'Bills & Utilities', icon: '💰', color: '#3333FF' },
         { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#FF3333' },
         { id: 'education', name: 'Education', icon: '🎓', color: '#33FF33' },
         { id: 'travel', name: 'Travel', icon: '🌍', color: '#3333FF' },
         { id: 'others', name: 'Others', icon: '💸', color: '#FF3333' },
      ];

      for (const category of defaultCategories) {
         await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: category,
         });
      }

      console.log('Categories initialized successfully');
   } catch (error) {
      console.error('Error initializing categories:', error);
      throw error;
   }
}