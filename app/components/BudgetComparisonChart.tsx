'use client';

import { Card } from "@/app/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Loader } from "@/app/components/ui/loader";
import { BudgetComparisonChartData, BudgetComparisonChartTooltipProps } from "@/lib/types";

export function BudgetComparisonChart() {
   const { data: chartData, isLoading } = useQuery<BudgetComparisonChartData[]>({
      queryKey: ['budget-comparison'],
      queryFn: async () => {
         const response = await fetch('/api/expenses/comparison');
         if (!response.ok) {
            throw new Error('Failed to fetch comparison data');
         }
         return response.json();
      },
   });

   const CustomTooltip = ({ active, payload }: BudgetComparisonChartTooltipProps) => {
      if (!active || !payload?.length) return null;

      const spending = payload[0]?.value || 0;
      const remaining = payload[1]?.value || 0;
      const total = spending + remaining;

      return (
         <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border min-w-[200px]">
            <p className="font-semibold text-base mb-1.5">{payload[0]?.payload.month}</p>
            <div className="space-y-1.5 text-sm">
               <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Total Budget:</span>
                  <span className="font-medium">₹{total.toLocaleString()}</span>
               </div>
               <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Spent:</span>
                  <span className="font-medium text-blue-500">₹{spending.toLocaleString()}</span>
               </div>
               <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Remaining:</span>
                  <span className="font-medium text-emerald-500">₹{remaining.toLocaleString()}</span>
               </div>
            </div>
         </div>
      );
   };

   if (isLoading) {
      return (
         <Card className="w-full h-[400px] flex items-center justify-center">
            <Loader color="blue" />
         </Card>
      );
   }

   if (!chartData?.length) {
      return (
         <Card className="w-full h-[400px] flex items-center justify-center">
            <p className="text-gray-500">No data available</p>
         </Card>
      );
   }

   return (
      <Card className="w-full">
         <div className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h2 className="text-xl font-semibold">Budget Overview</h2>
                  <p className="text-sm text-gray-500 mt-1">Last 6 months comparison</p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full bg-emerald-500 opacity-80" />
                     <span className="text-sm text-gray-600">Remaining</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full bg-blue-500 opacity-80" />
                     <span className="text-sm text-gray-600">Spent</span>
                  </div>
               </div>
            </div>

            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                     <XAxis
                        dataKey="month"
                        axisLine={true}
                        tickLine={true}
                        fontSize={12}
                        tick={{ fill: '#666' }}
                     />
                     <YAxis
                        axisLine={true}
                        tickLine={true}
                        fontSize={12}
                        tick={{ fill: '#666' }}
                        tickFormatter={(value) => `₹${value.toLocaleString()}`}
                     />
                     <Tooltip
                        content={<CustomTooltip />}
                        cursor={false}
                     />
                     <Bar
                        dataKey="spending"
                        stackId="a"
                        fill="#3b82f6"
                        radius={[0, 0, 0, 0]}
                        maxBarSize={40}
                        opacity={0.8}
                     />
                     <Bar
                        dataKey="remaining"
                        stackId="a"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                        opacity={0.8}
                     />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </Card>
   );
}