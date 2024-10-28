'use client';

import { useState, useEffect } from 'react';
import { Pie, PieChart } from "recharts";
import { format } from 'date-fns';
import { categories } from '@/lib/constants';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";

type SpendingSummary = {
   categoryId: string;
   total: number;
}

const chartConfig = categories.reduce((config, category) => ({
   ...config,
   [category.id]: {
      label: category.name,
      color: category.textColor,
   },
}), {
   total: {
      label: "Total",
   },
}) satisfies ChartConfig;

export function SpendingPieChart() {
   const [data, setData] = useState<SpendingSummary[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const currentDate = new Date();
      const monthString = format(currentDate, 'yyyy-MM');

      fetch(`/api/expenses/summary?month=${monthString}`)
         .then(res => res.json())
         .then(summaryData => {
            setData(summaryData);
            setIsLoading(false);
         })
         .catch(error => {
            console.error('Failed to fetch spending summary:', error);
            setIsLoading(false);
         });
   }, []);

   const chartData = data.map(item => {
      const category = categories.find(cat => cat.id === item.categoryId);
      return {
         category: category?.id || 'unknown',
         amount: item.total,
         fill: category?.textColor || '#666',
         fillOpacity: 0.85,
      };
   });

   if (isLoading) {
      return (
         <Card>
            <CardHeader className="items-center pb-2">
               <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
               <div className="flex items-center justify-center h-[250px]">
                  <div className="animate-pulse text-muted-foreground">Loading...</div>
               </div>
            </CardContent>
         </Card>
      );
   }

   if (chartData.length === 0) {
      return (
         <Card>
            <CardHeader className="items-center pb-2">
               <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
               <div className="flex items-center justify-center h-[250px]">
                  <p className="text-muted-foreground">No spending data for this month</p>
               </div>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card className="flex flex-col">
         <CardHeader className="items-center pb-2">
            <CardTitle>Spending Overview</CardTitle>
         </CardHeader>
         <CardContent className="flex-1 pb-0">
            <ChartContainer
               config={chartConfig}
               className="mx-auto aspect-square max-h-[250px]"
            >
               <PieChart>
                  <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                     data={chartData}
                     dataKey="amount"
                     nameKey="category"
                     innerRadius={60}
                     outerRadius={100}
                     paddingAngle={2}
                     strokeWidth={2}
                     stroke="hsl(var(--background))"
                  >
                  </Pie>
               </PieChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
