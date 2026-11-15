import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination component with page-size selector, numbered page buttons, and count info
 */
export default function Pagination({
  page = 1,
  pageSize = 10,
  totalCount = 0,
  totalPages = 0,
  onPageChange,
  onPageSizeChange,
  loading = false,
}) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  // Generate page numbers array (with boundary checks)
  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages || totalPages === 0;

  return (
    <div className="bg-white rounded-2xl p-4 border border-brand-100/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left: Summary text and Page Size Selector */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
        <div>
          Showing{" "}
          <span className="text-charcoal font-bold">
            {totalCount === 0 ? 0 : `${start}-${end}`}
          </span>{" "}
          of <span className="text-charcoal font-bold">{totalCount}</span> registrations
        </div>

        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={loading}
            aria-label="Items per page"
            className="px-2.5 py-1 text-xs rounded-lg border border-muted-border bg-canvas/50 text-charcoal font-semibold focus:outline-none focus:ring-2 focus:ring-brand-400/40 cursor-pointer disabled:opacity-50"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>per page</span>
        </div>
      </div>

      {/* Right: Prev, numbered buttons, Next */}
      <div className="flex items-center gap-1.5">
        {/* Prev Button */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={isFirstPage || loading}
          aria-label="Previous page"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-muted-border text-charcoal hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 disabled:opacity-40 disabled:pointer-events-none transition-all duration-150 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Prev</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isActive = p === page;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                disabled={loading}
                aria-current={isActive ? "page" : undefined}
                className={`min-w-8 h-8 px-2 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-brand-500 text-white shadow-pill border border-brand-600"
                    : "text-charcoal border border-transparent hover:border-brand-200 hover:bg-brand-50 text-muted hover:text-charcoal"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={isLastPage || loading}
          aria-label="Next page"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-muted-border text-charcoal hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 disabled:opacity-40 disabled:pointer-events-none transition-all duration-150 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
