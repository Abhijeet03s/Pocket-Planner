'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

type Expense = {
   id: string;
   amount: string;
   description: string;
   date: string;
};

export function ExpenseList() {
   const [expenses, setExpenses] = useState<Expense[]>([]);
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');


   const fetchExpenses = useCallback(async () => {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const response = await fetch(`/api/expenses?${queryParams.toString()}`);
      if (response.ok) {
         const data = await response.json();
         setExpenses(data);
      }
   }, [startDate, endDate]);

   useEffect(() => {
      fetchExpenses();
   }, [startDate, endDate, fetchExpenses]);

   return (
      <div>
         <div className="mb-4">
            <input
               type="date"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
               className="mr-2"
            />
            <input
               type="date"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
            />
         </div>
         <ul>
            {expenses.map((expense) => (
               <li key={expense.id} className="mb-2">
                  <span className="font-bold">${parseFloat(expense.amount).toFixed(2)}</span> -
                  {expense.description} -
                  {format(new Date(expense.date), 'MM/dd/yyyy')}
               </li>
            ))}
         </ul>
      </div>
   );
}
