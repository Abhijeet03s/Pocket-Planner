'use client';

import { Card } from "@/app/components/ui/card";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { categories } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { Loader } from "@/app/components/ui/loader";
import { ExpenseData, SpendingPieChartTooltipProps, SpendingPieChartData, CustomLabelProps } from "@/lib/types";
import { ExportButton } from './ExportButton';

export function SpendingPieChart() {
   const currentMonth = format(new Date(), 'yyyy-MM');
   const displayMonth = format(new Date(), 'MMMM yyyy');

   const { data, isLoading, isError, error } = useQuery<ExpenseData[], Error, SpendingPieChartData[]>({
      queryKey: ['spending-summary', currentMonth],
      queryFn: async () => {
         const response = await fetch(`/api/expenses/summary?month=${currentMonth}`);
         if (!response.ok) {
            console.error('Failed to fetch spending summary:', response.statusText);
            return [];
         }
         return response.json();
      },
      select: (summaryData) => {
         return summaryData.map((item) => {
            const category = categories.find(cat => cat.id === item.categoryId);
            return {
               name: category?.id || 'unknown',
               value: item.total,
               fill: category?.color || '#666',
               category: category?.name || 'Unknown'
            };
         });
      }
   });

   const { data: expenses = [] } = useQuery({
      queryKey: ['expenses', currentMonth],
      queryFn: async () => {
         const response = await fetch(`/api/expenses?month=${currentMonth}`);
         if (!response.ok) {
            console.error('Failed to fetch expenses:', response.statusText);
            return [];
         }
         return response.json();
      },
   });

   const totalSpending = data?.reduce((sum, item) => sum + item.value, 0) || 0;

   const CustomTooltip = ({ active, payload }: SpendingPieChartTooltipProps) => {
      if (!active || !payload?.length) return null;
      const data = payload[0].payload;

      const percentage = totalSpending > 0 ? (data.value / totalSpending) * 100 : 0;

      return (
         <div className="bg-white p-3 rounded-lg shadow-md border min-w-[200px]">
            <p className="font-semibold text-base mb-1.5" style={{ color: data.fill }}>
               {data.category}
            </p>
            <div className="space-y-1.5 text-sm">
               <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium">₹{data.value.toLocaleString()}</span>
               </div>
               <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Percentage:</span>
                  <span className="font-medium">{percentage.toFixed(1)}%</span>
               </div>
            </div>
         </div>
      );
   };

   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomLabelProps) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return percent > 0.03 ? (
         <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-medium"
         >
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      ) : null;
   };

   if (isLoading) {
      return (
         <Card className="w-full h-[400px] flex items-center justify-center">
            <Loader color="blue" />
         </Card>
      );
   }

   if (isError) {
      return (
         <Card className="w-full h-[400px] flex items-center justify-center">
            <p className="text-red-500">Failed to load spending data: {error.message}</p>
         </Card>
      );
   }

   if (!data || data.length === 0) {
      return (
         <Card className="w-full h-[400px] flex items-center justify-center">
            <p className="text-gray-500">No spending data available for this month.</p>
         </Card>
      );
   }

   return (
      <Card className="w-full">
         <div className="p-6">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h2 className="text-xl font-semibold">Spending by Category</h2>
                  <p className="text-sm text-gray-500 mt-1">{displayMonth}</p>
               </div>
               <ExportButton
                  expenses={expenses}
                  dateRange={{
                     from: startOfMonth(new Date()),
                     to: endOfMonth(new Date())
                  }}
               />
            </div>

            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={2}
                        dataKey="value"
                     >
                        {data.map((entry: SpendingPieChartData, index: number) => (
                           <Cell
                              key={`cell-${index}`}
                              fill={entry.fill}
                              stroke="white"
                              strokeWidth={2}
                           />
                        ))}
                     </Pie>
                     <Tooltip content={<CustomTooltip />} />
                     <Legend
                        align="right"
                        verticalAlign="middle"
                        layout="vertical"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => {
                           const category = categories.find(cat => cat.id === value);
                           return (
                              <span className="text-sm text-gray-600">
                                 {category?.name || value}
                              </span>
                           );
                        }}
                        wrapperStyle={{
                           paddingLeft: '20px',
                        }}
                     />
                  </PieChart>
               </ResponsiveContainer>
            </div>
         </div>
      </Card>
   );
}