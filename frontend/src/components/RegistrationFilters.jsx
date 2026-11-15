import { useState, useEffect } from "react";
import { Search, X, RotateCcw } from "lucide-react";
import useDebounce from "../hooks/useDebounce";

/**
 * Filter and search toolbar for registrations
 */
export default function RegistrationFilters({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const [searchTerm, setSearchTerm] = useState(filters.participantName || "");
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Sync debounced search to parent filters
  useEffect(() => {
    if (debouncedSearch !== (filters.participantName || "")) {
      onFilterChange("participantName", debouncedSearch);
    }
  }, [debouncedSearch, filters.participantName, onFilterChange]);

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
      (filters.type && filters.type !== "All") ||
      (filters.status && filters.status !== "All")
  );

  const handleClear = () => {
    setSearchTerm("");
    onClearFilters();
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-brand-100/80 shadow-card space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search participant name..."
            className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-muted-border/80 bg-canvas/50 text-charcoal placeholder-muted-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-500 transition-all duration-150"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                onFilterChange("participantName", "");
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-charcoal transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type Dropdown */}
        <div className="w-full md:w-48">
          <label htmlFor="filter-type" className="sr-only">Registration Type</label>
          <div className="relative">
            <select
              id="filter-type"
              value={filters.type || "All"}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-muted-border/80 bg-canvas/50 text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-500 transition-all duration-150 cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Exhibitor">Exhibitor</option>
              <option value="Competitor">Competitor</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="w-full md:w-48">
          <label htmlFor="filter-status" className="sr-only">Registration Status</label>
          <div className="relative">
            <select
              id="filter-status"
              value={filters.status || "All"}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-muted-border/80 bg-canvas/50 text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-500 transition-all duration-150 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="CheckedIn">Checked In</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-50 hover:bg-brand-100 border border-brand-200/80 text-brand-700 transition-all duration-150 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.2]" />
            <span>Clear filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
