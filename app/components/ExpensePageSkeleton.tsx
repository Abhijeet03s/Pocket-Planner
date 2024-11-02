import { Card } from "@/app/components/ui/card";

export function ExpensePageSkeleton() {
   return (
      <div>
         <div className="flex justify-between items-center py-6">
            <div className="h-9 w-64 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
         </div>
         <Card className="p-6">
            <div className="space-y-6">
               <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                  <div className="space-y-2">
                     <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                     <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                     <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                     <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
               </div>

               <div className="bg-white rounded-lg border shadow-sm">
                  <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-t-lg border-b">
                     {Array(6).fill(null).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                     ))}
                  </div>

                  <div className="divide-y">
                     {Array(5).fill(null).map((_, i) => (
                        <div key={i} className="grid grid-cols-6 gap-4 p-4 items-center">
                           <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                           </div>
                           <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                           <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                           <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                           <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                           <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
}