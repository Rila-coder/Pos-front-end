"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  className?: string;
}

interface PaginationWithItemsProps extends PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (string | number)[] = [];
    let l: number;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={cn("flex items-center justify-center gap-0.5 sm:gap-1", className)}>
      {showFirstLast && (
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      )}
      
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 sm:h-8 sm:w-8"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        page === "..." ? (
          <span key={`dots-${index}`} className="px-1 sm:px-2 text-muted-foreground text-xs sm:text-sm">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 text-xs sm:text-sm"
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 sm:h-8 sm:w-8"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>

      {showFirstLast && (
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      )}
    </nav>
  );
}

export function PaginationWithItems({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showFirstLast = true,
  showItemsPerPage = true,
  itemsPerPageOptions = [12, 24, 36, 48],
  className,
}: PaginationWithItemsProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4", className)}>
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4">
        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-sm text-muted-foreground">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="h-7 w-14 sm:h-8 sm:w-16 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-[10px] sm:text-sm text-muted-foreground">per page</span>
          </div>
        )}
        <span className="text-[10px] sm:text-sm text-muted-foreground">
          Showing {startItem}-{endItem} of {totalItems} items
        </span>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showFirstLast={showFirstLast}
      />
    </div>
  );
}