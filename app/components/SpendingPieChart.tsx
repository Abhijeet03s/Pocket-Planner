/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { format } from 'date-fns';
import { categories } from '@/lib/constants';

type SpendingSummary = {
   categoryId: string;
   total: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return percent > 0.05 ? (
      <text
         x={x}
         y={y}
         fill="white"
         textAnchor="middle"
         dominantBaseline="central"
      >
         {`${(percent * 100).toFixed(0)}%`}
      </text>
   ) : null;
};

const CustomTooltip = ({ active, payload }: { active: boolean, payload: any }) => {
   if (active && payload && payload.length) {
      const category = categories.find(cat => cat.id === payload[0].name);
      return (
         <div className="bg-white p-4 rounded-lg shadow-lg border">
            <p className="font-medium" style={{ color: payload[0].payload.fill }}>
               {category?.name || payload[0].name}
            </p>
            <p className="text-gray-600">
               ${payload[0].value.toLocaleString()}
            </p>
         </div>
      );
   }
   return null;
};

export function SpendingPieChart() {
   const [data, setData] = useState<SpendingSummary[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
         name: category?.id || 'unknown',
         value: item.total,
         fill: category?.textColor || '#666',
      };
   });

   const onPieEnter = (index: number) => {
      setActiveIndex(index);
   };

   const onPieLeave = () => {
      setActiveIndex(null);
   };

   if (isLoading) {
      return (
         <div className="w-full h-[400px] flex items-center justify-center bg-white rounded-xl shadow-sm">
            <div className="animate-pulse text-gray-400">Loading...</div>
         </div>
      );
   }

   if (chartData.length === 0) {
      return (
         <div className="w-full h-[400px] flex items-center justify-center bg-white rounded-xl shadow-sm">
            <p className="text-gray-400">No spending data for this month</p>
         </div>
      );
   }

   return (
      <div className="w-full h-[400px] bg-white rounded-xl shadow-sm p-4">
         <h2 className="text-xl font-semibold text-center mb-4">Spending Overview</h2>
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
               <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  animationBegin={0}
                  animationDuration={1000}
               >
                  {chartData.map((entry, index) => (
                     <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                        stroke="white"
                        strokeWidth={2}
                     />
                  ))}
               </Pie>
               <Tooltip content={<CustomTooltip active={true} payload={[]} />} />
               <Legend
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
                  formatter={(value) => {
                     const category = categories.find(cat => cat.id === value);
                     const item = chartData.find(d => d.name === value);
                     return (
                        <span className="text-sm">
                           {category?.name || value}
                           <span className="ml-2 text-gray-500">
                              ${item?.value.toLocaleString()}
                           </span>
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
   );
}
