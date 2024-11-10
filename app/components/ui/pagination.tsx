import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
   const canGoPrevious = currentPage > 1;
   const canGoNext = currentPage < totalPages;

   return (
      <div className="flex items-center justify-between px-2">
         <div className="flex items-center gap-1">
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(1)}
               disabled={!canGoPrevious}
            >
               <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(currentPage - 1)}
               disabled={!canGoPrevious}
            >
               <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-4">
               <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
               </span>
            </div>
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(currentPage + 1)}
               disabled={!canGoNext}
            >
               <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(totalPages)}
               disabled={!canGoNext}
            >
               <ChevronsRight className="h-4 w-4" />
            </Button>
         </div>
      </div>
   );
}