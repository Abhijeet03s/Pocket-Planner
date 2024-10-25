import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';

export async function DELETE(
   req: Request,
   { params }: { params: { id: string } }
) {
   const session = await getServerSession(authOptions);
   if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   try {
      await prisma.expense.delete({
         where: { id: params.id, userId: session.user.id },
      });

      return NextResponse.json({ message: 'Expense deleted successfully' });
   } catch (error) {
      console.error('Failed to delete expense:', error);
      return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
   }
}