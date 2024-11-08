import { Download } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import * as XLSX from 'xlsx';
import { format, parseISO } from 'date-fns';
import { categories, paymentModes } from '@/lib/constants';
import { DateRange } from 'react-day-picker';
import { Expense } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

interface ExportButtonProps {
   expenses: Array<Expense & { amount: Decimal }>;
   dateRange?: DateRange;
}

export function ExportButton({ expenses, dateRange }: ExportButtonProps) {
   const formatDate = (date: Date | string) => {
      if (typeof date === 'string') {
         return format(parseISO(date), 'MMM dd, yyyy');
      }
      return format(date, 'MMM dd, yyyy');
   };

   const getDateRangeString = () => {
      if (!dateRange?.from || !dateRange?.to) return 'All_Expenses';
      return `${format(dateRange.from, 'yyyy-MM-dd')}_to_${format(dateRange.to, 'yyyy-MM-dd')}`;
   };

   const formatAmount = (amount: Decimal) => {
      return Number(amount.toString()).toLocaleString('en-IN', {
         style: 'currency',
         currency: 'INR',
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      });
   };

   const getCategoryName = (categoryId: string) => {
      return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
   };

   const getPaymentModeName = (paymentMode: string) => {
      return paymentModes.find(mode => mode.id === paymentMode)?.name || 'Other';
   };

   const exportToExcel = () => {
      const worksheetData = expenses.map(expense => {
         try {
            return {
               Date: formatDate(expense.date),
               Category: getCategoryName(expense.categoryId),
               Amount: formatAmount(expense.amount),
               'Payment Mode': getPaymentModeName(expense.paymentMode),
               Description: expense.description || '-'
            };
         } catch (error) {
            console.error('Error processing expense:', expense, error);
            return {
               Date: 'Error',
               Category: 'Error',
               Amount: 'Error',
               'Payment Mode': 'Error',
               Description: 'Error processing expense'
            };
         }
      });

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

      // Auto-size columns
      const colWidths = [
         { wch: 12 }, // Date
         { wch: 15 }, // Category
         { wch: 15 }, // Amount
         { wch: 15 }, // Payment Mode
         { wch: 30 }, // Description
      ];
      worksheet['!cols'] = colWidths;

      XLSX.writeFile(workbook, `expenses_${getDateRangeString()}.xlsx`);
   };

   return (
      <Button variant="outline" size="sm" onClick={exportToExcel}>
         <Download className="h-4 w-4 mr-2" />
         Export to Excel
      </Button>
   );
}