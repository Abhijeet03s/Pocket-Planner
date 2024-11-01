import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';

export async function POST(req: Request) {
   const session = await getServerSession(authOptions);
   if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   try {
      const { amount, month } = await req.json();

      const budget = await prisma.budget.upsert({
         where: {
            userId_month: {
               userId: session.user.id,
               month,
            },
         },
         update: {
            amount,
         },
         create: {
            userId: session.user.id,
            month,
            amount,
         },
      });

      return NextResponse.json(budget);
   } catch (error) {
      console.error('Failed to set budget:', error);
      return NextResponse.json({ error: 'Failed to set budget' }, { status: 500 });
   }
}

export async function GET(req: Request) {
   const session = await getServerSession(authOptions);
   if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const { searchParams } = new URL(req.url);
   const month = searchParams.get('month');

   if (!month) {
      return NextResponse.json({ error: 'Month parameter is required' }, { status: 400 });
   }

   try {
      const budget = await prisma.budget.findUnique({
         where: {
            userId_month: {
               userId: session.user.id,
               month,
            },
         },
      });

      return NextResponse.json(budget);
   } catch (error) {
      console.error('Failed to fetch budget:', error);
      return NextResponse.json({ error: 'Failed to fetch budget' }, { status: 500 });
   }
}