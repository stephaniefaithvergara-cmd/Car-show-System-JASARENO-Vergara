import { useState, useEffect } from "react";
import {
  AlertTriangle,
  RotateCcw,
  Loader2,
  Inbox,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import KpiCards from "../components/KpiCards";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import Pagination from "../components/Pagination";

// Active data provider: Connected to C# .NET Minimal API (http://localhost:5205)
// To toggle to sample data, switch import to: from "../api/sample-data"
import { getRegistrations, getSummary } from "../api/registrationsApi";

/**
 * Main Registrations Dashboard Page
 * Manages state for filters, pagination, API data, loading and error states
 */
export default function RegistrationsPage() {
  const [filters, setFilters] = useState({
    participantName: "",
    type: "All",
    status: "All",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const [registrationsData, setRegistrationsData] = useState({
    items: [],
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch registrations according to current filters & pagination
  useEffect(() => {
    let ignore = false;

    async function loadRegistrations() {
      try {
        const data = await getRegistrations({
          participantName: filters.participantName,
          type: filters.type === "All" ? "" : filters.type,
          status: filters.status === "All" ? "" : filters.status,
          page,
          pageSize,
        });
        if (!ignore) {
          setRegistrationsData(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err
              : new Error("Cannot reach the API. Please ensure the backend is running.")
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadRegistrations();

    return () => {
      ignore = true;
    };
  }, [filters, page, pageSize, refreshIndex]);

  // Fetch summary metrics
  useEffect(() => {
    let ignore = false;

    async function loadSummary() {
      try {
        const data = await getSummary();
        if (!ignore) {
          setSummaryData(data);
        }
      } catch (err) {
        console.error("Failed to fetch registration summary:", err);
      } finally {
        if (!ignore) {
          setSummaryLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      ignore = true;
    };
  }, [refreshIndex]);

  // Filter change resets page to 1
  const handleFilterChange = (key, value) => {
    setLoading(true);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  // Clear all filters and reset page to 1
  const handleClearFilters = () => {
    setLoading(true);
    setFilters({
      participantName: "",
      type: "All",
      status: "All",
    });
    setPage(1);
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setLoading(true);
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setLoading(true);
    setPageSize(newSize);
    setPage(1);
  };

  const handleRetry = () => {
    setLoading(true);
    setSummaryLoading(true);
    setRefreshIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Event Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 border border-brand-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AutoVista Events • Sorsogon City Coliseum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight font-sans">
            Car Show 2027 Registration
          </h1>
          <p className="text-sm text-muted mt-1 font-medium">
            Manage exhibitor, competitor, and VIP participant registrations, fee tracking, and gate check-ins.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleRetry}
            disabled={loading || summaryLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-charcoal bg-white hover:bg-brand-50 border border-brand-200/80 shadow-card hover:border-brand-300 disabled:opacity-50 transition-all cursor-pointer"
            title="Refresh dashboard data"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-brand-600 ${
                loading || summaryLoading ? "animate-spin" : ""
              }`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Section */}
      <section aria-label="Registration Statistics">
        <KpiCards summary={summaryData} loading={summaryLoading} />
      </section>

      {/* Filter Toolbar */}
      <section aria-label="Registration Filters">
        <RegistrationFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </section>

      {/* Main Content: Loading, Error, Empty, or Table */}
      <section aria-label="Registrations Table">
        {error ? (
          /* Error State */
          <div className="bg-white rounded-2xl p-10 border border-rose-200/80 shadow-card text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h3 className="text-lg font-bold text-charcoal">
                Cannot reach the API...
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                {error.message ||
                  "Unable to connect to the registration service. Please verify that the C# API is running on http://localhost:5205."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-pill transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Try again</span>
            </button>
          </div>
        ) : loading ? (
          /* Loading State */
          <div className="bg-white rounded-2xl p-14 border border-brand-100/80 shadow-card text-center space-y-3">
            <Loader2 className="w-9 h-9 text-brand-500 animate-spin mx-auto stroke-[2.2]" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-charcoal">
                Loading registrations...
              </h3>
              <p className="text-xs text-muted">
                Retrieving participants and payment statuses
              </p>
            </div>
          </div>
        ) : registrationsData.items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 border border-brand-100/80 shadow-card text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 border border-brand-100 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h3 className="text-lg font-bold text-charcoal">
                No registrations match your filters
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                Try searching with a different participant name or resetting the category and status filters.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 shadow-pill transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Clear filters</span>
            </button>
          </div>
        ) : (
          /* Populated Table + Pagination */
          <div className="space-y-4">
            <RegistrationTable items={registrationsData.items} />
            <Pagination
              page={page}
              pageSize={pageSize}
              totalCount={registrationsData.totalCount}
              totalPages={registrationsData.totalPages}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              loading={loading}
            />
          </div>
        )}
      </section>
    </div>
  );
}
