import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';

export async function GET() {
   const session = await getServerSession(authOptions);
   if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   try {
      const user = await prisma.user.findUnique({
         where: { id: session.user.id },
         select: { createdAt: true }
      });

      const totalExpenses = await prisma.expense.count({
         where: { userId: session.user.id }
      });

      const categoriesUsed = await prisma.expense.findMany({
         where: { userId: session.user.id },
         select: { categoryId: true },
         distinct: ['categoryId']
      });

      return NextResponse.json({
         memberSince: user?.createdAt || new Date(),
         totalExpenses,
         categoriesUsed: categoriesUsed.length
      });
   } catch (error) {
      console.error('Failed to fetch user stats:', error);
      return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 });
   }
}