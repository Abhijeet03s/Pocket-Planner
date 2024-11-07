import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';
import { subMonths, format } from 'date-fns';

export async function GET() {
   const session = await getServerSession(authOptions);
   if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   try {
      const currentDate = new Date();
      const months = Array.from({ length: 6 }, (_, i) => {
         const date = subMonths(currentDate, i);
         return format(date, 'yyyy-MM');
      }).reverse();

      const result = await Promise.all(
         months.map(async (month) => {
            const [year, monthNum] = month.split('-');
            const startDate = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
            const endDate = new Date(parseInt(year), parseInt(monthNum), 0);

            // Get budget for the month
            const budget = await prisma.budget.findUnique({
               where: {
                  userId_month: {
                     userId: session.user.id,
                     month,
                  },
               },
            });

            // Get total spending for the month
            const spending = await prisma.expense.aggregate({
               where: {
                  userId: session.user.id,
                  date: {
                     gte: startDate,
                     lte: endDate,
                  },
               },
               _sum: {
                  amount: true,
               },
            });

            const totalBudget = budget ? Number(budget.amount) : 0;
            const totalSpending = spending._sum.amount ? Number(spending._sum.amount) : 0;
            const remaining = Math.max(totalBudget - totalSpending, 0);

            return {
               month: format(startDate, 'MMM'),
               spending: totalSpending,
               remaining,
               total: totalBudget,
            };
         })
      );

      return NextResponse.json(result);
   } catch (error) {
      console.error('Failed to fetch comparison data:', error);
      return NextResponse.json({ error: 'Failed to fetch comparison data' }, { status: 500 });
   }
} 