import prisma from '@/lib/prisma';

export async function initializeCategories() {
   try {
      await prisma.$transaction(async (tx) => {
         const existingCategories = await tx.category.findMany();
         if (existingCategories.length > 0) {
            return;
         }

         await tx.category.createMany({
            data: [
               { name: 'Food & Dining', icon: '🍔', color: '#FF5733' },
               { name: 'Transportation', icon: '🚗', color: '#33FF57' },
               { name: 'Shopping', icon: '🛍️', color: '#33A1FF' },
               { name: 'Entertainment', icon: '🎥', color: '#FF33A1' },
               { name: 'Bills & Utilities', icon: '💰', color: '#3333FF' },
               { name: 'Healthcare', icon: '🏥', color: '#FF3333' },
               { name: 'Education', icon: '🎓', color: '#33FF33' },
               { name: 'Travel', icon: '🌍', color: '#3333FF' },
               { name: 'Others', icon: '💸', color: '#FF3333' },
            ],
         });
      });

   } catch (error) {
      console.error('Error initializing categories:', error);
      throw error;
   }
}