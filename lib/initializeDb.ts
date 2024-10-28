import prisma from '@/lib/prisma';
import { categories } from '@/lib/constants';

export async function initializeCategories() {
   try {
      await prisma.$transaction(async (tx) => {
         for (const category of categories) {
            await tx.category.upsert({
               where: { id: category.id },
               update: {
                  name: category.name,
                  icon: category.icon.toString(),
                  color: category.color,
               },
               create: {
                  id: category.id,
                  name: category.name,
                  icon: category.icon.toString(),
                  color: category.color,
               },
            });
         }
      });

      console.log('Categories initialized successfully');
   } catch (error) {
      console.error('Failed to initialize categories:', error);
   }
}