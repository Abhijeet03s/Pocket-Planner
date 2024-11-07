'use client';

import { createElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Calendar } from '@/app/components/ui/calendar';
import { cn } from '@/lib/utils';
import { categories, paymentModes } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogClose } from "@/app/components/ui/dialog";
import { paymentIcons } from "@/lib/types";
import { satoshi } from "@/app/fonts/font";

const expenseSchema = z.object({
   amount: z.number({
      required_error: "Amount is required",
      invalid_type_error: "Please enter a valid number",
   }).positive("Amount must be greater than 0"),
   description: z.string().optional(),
   date: z.date({
      required_error: "Date is required",
      invalid_type_error: "Please select a valid date",
   }),
   categoryId: z.string({
      required_error: "Category is required",
   }).min(1, "Please select a category"),
   paymentMode: z.string({
      required_error: "Payment mode is required",
   }).min(1, "Please select a payment mode"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

type ExpenseFormProps = {
   onSuccess?: () => void;
};

export function ExpenseForm({ onSuccess }: ExpenseFormProps) {
   const queryClient = useQueryClient();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue,
      clearErrors,
   } = useForm<ExpenseFormData>({
      resolver: zodResolver(expenseSchema),
   });
   const [date, setDate] = useState<Date | undefined>(undefined);
   const { toast } = useToast();

   const mutation = useMutation({
      mutationFn: async (data: ExpenseFormData) => {
         const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               amount: data.amount.toString(),
               description: "",
               date: data.date.toISOString(),
               categoryId: data.categoryId,
               paymentMode: data.paymentMode,
            }),
         });

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create expense');
         }

         return response.json();
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['expenses'] });
         toast({
            title: "Success",
            description: "Expense created successfully",
         });
         reset();
         setDate(new Date());
         onSuccess?.();
      },
      onError: (error: Error) => {
         toast({
            title: "Error",
            description: error.message || "Failed to create expense",
            variant: "destructive",
         });
      }
   });

   const onSubmit = (data: ExpenseFormData) => {
      mutation.mutate(data);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${satoshi.variable} font-satoshi font-medium`}>
         <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
               Amount
            </label>
            <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
               <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  {...register('amount', { valueAsNumber: true })}
                  className={cn(
                     "text-lg pl-7 [appearance:textfield]",
                     "[&::-webkit-outer-spin-button]:appearance-none",
                     "[&::-webkit-inner-spin-button]:appearance-none",
                     errors.amount && "border-red-500"
                  )}
               />
            </div>
            {errors.amount && (
               <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
         </div>

         <div className="grid gap-4">
            <div className="space-y-2">
               <label className="text-sm font-medium leading-none">
                  Category
               </label>
               <Select
                  onValueChange={(value) => {
                     setValue('categoryId', value);
                     clearErrors('categoryId');
                  }}
               >
                  <SelectTrigger className={cn(
                     "w-full",
                     errors.categoryId && "border-red-500"
                  )}>
                     <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                     {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                           <div className="flex items-center gap-2">
                              <div className="p-1 rounded" style={{ backgroundColor: category.color }}>
                                 {createElement(category.icon, {
                                    size: 16,
                                    style: { color: category.textColor }
                                 })}
                              </div>
                              <span className="font-medium">{category.name}</span>
                           </div>
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               {errors.categoryId && (
                  <p className="text-sm text-red-500">{errors.categoryId.message}</p>
               )}
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium leading-none">
                  Payment Mode
               </label>
               <Select
                  onValueChange={(value) => {
                     setValue('paymentMode', value);
                     clearErrors('paymentMode');
                  }}
               >
                  <SelectTrigger className={cn(
                     "w-full",
                     errors.paymentMode && "border-red-500"
                  )}>
                     <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                     {paymentModes.map((mode) => (
                        <SelectItem key={mode.id} value={mode.id}>
                           <div className="flex items-center gap-2">
                              {createElement(paymentIcons[mode.icon as keyof typeof paymentIcons], {
                                 size: 16,
                                 className: "text-gray-600"
                              })}
                              <span className="font-medium">{mode.name}</span>
                           </div>
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               {errors.paymentMode && (
                  <p className="text-sm text-red-500">{errors.paymentMode.message}</p>
               )}
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium leading-none">
                  Date
               </label>
               <Popover>
                  <PopoverTrigger asChild>
                     <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                           "w-full justify-start text-left font-normal",
                           !date && "text-muted-foreground",
                           errors.date && "border-red-500"
                        )}
                     >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                     <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                           setDate(newDate || new Date());
                           setValue('date', newDate || new Date());
                           if (newDate) clearErrors('date');
                        }}
                        initialFocus={true}
                     />
                  </PopoverContent>
               </Popover>
               {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
               )}
            </div>
         </div>

         <div className="flex justify-end gap-3 pt-4 border-t">
            <DialogClose asChild>
               <Button type="button" variant="outline">
                  Cancel
               </Button>
            </DialogClose>
            <Button
               type="submit"
               disabled={mutation.isPending}
               className="min-w-[120px]"
            >
               {mutation.isPending ? (
                  <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Adding...
                  </>
               ) : (
                  'Add Expense'
               )}
            </Button>
         </div>
      </form>
   );
}
