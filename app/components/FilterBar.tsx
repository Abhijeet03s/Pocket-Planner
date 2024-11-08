import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { categories, paymentModes } from '@/lib/constants';
import { X, Search } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { FilterValues } from '@/lib/types';

interface FilterBarProps {
   onFilterChange: (filters: FilterValues) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
   const [filters, setFilters] = useState<FilterValues>({
      category: null,
      priceSort: null,
      paymentMode: null,
      searchQuery: '',
   });

   const handleFilterChange = (key: keyof FilterValues, value: string | null) => {
      const processedValue = value === 'all' ? null : value;
      const newFilters = { ...filters, [key]: processedValue };
      setFilters(newFilters);
      onFilterChange(newFilters);
   };

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFilters = { ...filters, searchQuery: event.target.value };
      setFilters(newFilters);
      onFilterChange(newFilters);
   };

   const clearFilters = () => {
      const resetFilters: FilterValues = {
         category: null,
         priceSort: null,
         paymentMode: null,
         searchQuery: '',
      };
      setFilters(resetFilters);
      onFilterChange(resetFilters);
   };

   const hasActiveFilters =
      filters.category !== null ||
      filters.priceSort !== null ||
      filters.paymentMode !== null ||
      filters.searchQuery.trim() !== '';

   return (
      <div className="flex justify-between items-center gap-4 mb-6">
         <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
               type="text"
               placeholder="Search expenses..."
               value={filters.searchQuery}
               onChange={handleSearchChange}
               className="pl-10 w-full"
            />
         </div>
         <div className="flex items-center gap-4">
            <div>
               <Select
                  value={filters.category || "all"}
                  onValueChange={(value) => handleFilterChange('category', value)}
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Categories</SelectItem>
                     {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                           {category.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            <div>
               <Select
                  value={filters.priceSort || ""}
                  onValueChange={(value) => handleFilterChange('priceSort', value as 'high-to-low' | 'low-to-high' | null)}
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Sort by Price" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="high-to-low">Highest to Lowest</SelectItem>
                     <SelectItem value="low-to-high">Lowest to Highest</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div>
               <Select
                  value={filters.paymentMode || "all"}
                  onValueChange={(value) => handleFilterChange('paymentMode', value)}
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="All Payment Modes" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Payment Modes</SelectItem>
                     {paymentModes.map((mode) => (
                        <SelectItem key={mode.id} value={mode.id}>
                           {mode.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            {hasActiveFilters && (
               <Button
                  variant="outline"
                  size="icon"
                  onClick={clearFilters}
                  className="h-8 w-8"
               >
                  <X className="h-4 w-4" />
               </Button>
            )}
         </div>
      </div>
   );
}