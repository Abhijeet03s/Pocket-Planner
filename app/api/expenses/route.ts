import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';

export async function POST(req: Request) {
   const session = await getServerSession(authOptions);
   if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const { amount, description, date, categoryId } = await req.json();

   try {
      const expense = await prisma.expense.create({
         data: {
            amount,
            description,
            date: new Date(date),
            categoryId,
            userId: session.user.id,
         },
      });

      return NextResponse.json(expense);
   } catch (error) {
      console.error('Failed to create expense:', error);
      return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
   }
}

export async function GET(req: Request) {
   const session = await getServerSession(authOptions);
   if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const { searchParams } = new URL(req.url);
   const startDate = searchParams.get('startDate');
   const endDate = searchParams.get('endDate');
   const categoryId = searchParams.get('categoryId');

   let dateFilter = {};
   if (startDate && endDate) {
      dateFilter = {
         date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
         },
      };
   }

   let categoryFilter = {};
   if (categoryId) {
      categoryFilter = { categoryId };
   }

   try {
      const expenses = await prisma.expense.findMany({
         where: {
            userId: session.user.id,
            ...dateFilter,
            ...categoryFilter,
         },
         orderBy: {
            date: 'desc',
         },
      });

      const jsonSafeExpenses = expenses.map(expense => ({
         ...expense,
         amount: expense.amount.toString(),
         date: expense.date.toISOString(),
      }));

      return NextResponse.json(jsonSafeExpenses);
   } catch (error) {
      console.error('Failed to fetch expenses:', error);
      return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
   }
}
