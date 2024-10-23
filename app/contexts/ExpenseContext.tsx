'use client';

import { createContext, useContext, useState } from 'react';

type ExpenseContextType = {
   refreshTrigger: number;
   triggerRefresh: () => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
   const [refreshTrigger, setRefreshTrigger] = useState(0);

   const triggerRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
   };

   return (
      <ExpenseContext.Provider value={{ refreshTrigger, triggerRefresh }}>
         {children}
      </ExpenseContext.Provider>
   );
}

export function useExpenseContext() {
   const context = useContext(ExpenseContext);
   if (!context) {
      throw new Error('useExpenseContext must be used within an ExpenseProvider');
   }
   return context;
}