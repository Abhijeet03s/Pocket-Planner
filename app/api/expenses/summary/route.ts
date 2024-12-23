import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';

export async function GET(req: Request) {
   const session = await getServerSession(authOptions);
   if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const { searchParams } = new URL(req.url);
   const month = searchParams.get('month');
   const type = searchParams.get('type'); // 'total' or 'category-wise'

   if (!month) {
      return NextResponse.json({ error: 'Month parameter is required' }, { status: 400 });
   }

   const [year, monthNum] = month.split('-');
   const startDate = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
   const endDate = new Date(parseInt(year), parseInt(monthNum) + 1, 0);

   try {
      if (type === 'total') {
         const total = await prisma.expense.aggregate({
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

         return NextResponse.json({
            total: total._sum.amount ? Number(total._sum.amount.toString()) : 0,
         });
      }

      // Default: category-wise summary
      const spending = await prisma.expense.groupBy({
         by: ['categoryId'],
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

      const result = spending.map((item) => ({
         categoryId: item.categoryId,
         total: item._sum.amount ? Number(item._sum.amount.toString()) : 0,
      }));

      return NextResponse.json(result);
   } catch (error) {
      console.error('Failed to fetch spending summary:', error);
      return NextResponse.json({ error: 'Failed to fetch spending summary' }, { status: 500 });
   }
}