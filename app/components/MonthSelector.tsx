'use client';

import { format } from 'date-fns';
import { Button } from '@/app/components/ui/button';
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useState } from 'react';

interface MonthSelectorProps {
   date: DateRange | undefined;
   onDateChange: (date: DateRange | undefined) => void;
}

export function MonthSelector({ date, onDateChange }: MonthSelectorProps) {
   const [open, setOpen] = useState(false);

   const handleMonthSelect = (monthIndex: number) => {
      const year = date?.from ? date.from.getFullYear() : new Date().getFullYear();
      const start = new Date(year, monthIndex, 1);
      const end = new Date(year, monthIndex + 1, 0);
      onDateChange({ from: start, to: end });
      setOpen(false); // Close the popover after selection
   };

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className={cn(
                  "w-auto justify-start text-left font-normal",
                  !date && "text-muted-foreground"
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {date?.from ? (
                  format(date.from, "MMMM yyyy")
               ) : (
                  <span>Select month</span>
               )}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3">
               <select
                  className="w-full p-2 border rounded-md mb-2"
                  value={date?.from ? format(date.from, 'yyyy') : new Date().getFullYear()}
                  onChange={(e) => {
                     const year = parseInt(e.target.value);
                     const currentMonth = date?.from ? date.from.getMonth() : new Date().getMonth();
                     const start = new Date(year, currentMonth, 1);
                     const end = new Date(year, currentMonth + 1, 0);
                     onDateChange({ from: start, to: end });
                  }}
               >
                  {Array.from({ length: 10 }, (_, i) => {
                     const year = new Date().getFullYear() - 5 + i;
                     return (
                        <option key={year} value={year}>
                           {year}
                        </option>
                     );
                  })}
               </select>
               <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }, (_, i) => {
                     const monthDate = new Date(
                        date?.from ? date.from.getFullYear() : new Date().getFullYear(),
                        i,
                        1
                     );
                     return (
                        <Button
                           key={i}
                           variant="outline"
                           className={cn(
                              "h-9",
                              date?.from && date.from.getMonth() === i && "bg-primary text-primary-foreground"
                           )}
                           onClick={() => handleMonthSelect(i)}
                        >
                           {format(monthDate, "MMM")}
                        </Button>
                     );
                  })}
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
}