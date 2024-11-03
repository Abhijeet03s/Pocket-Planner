'use client';

interface LoaderProps {
   color?: string;
}

export function Loader({ color = 'blue' }: LoaderProps) {
   return (
      <div className="h-full flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className={`w-8 h-8 border-4 border-${color}-600 border-t-transparent rounded-full animate-spin`} />
            <p className="text-sm text-gray-500">Loading chart data...</p>
         </div>
      </div>
   );
}