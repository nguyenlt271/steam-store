import React from "react";
import {
  Pagination as PaginationProvider,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
function Pagination({ currentPage, totalPages, onPageChange }: IProps) {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <PaginationProvider>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            unselectable={currentPage === 1 ? "on" : undefined}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPages().map((page) =>
          page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1 ? (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            Math.abs(page - currentPage) === 2 && (
              <PaginationItem key={`ellipsis-${page}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            unselectable={currentPage === totalPages ? "on" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationProvider>
  );
}

export default Pagination;
