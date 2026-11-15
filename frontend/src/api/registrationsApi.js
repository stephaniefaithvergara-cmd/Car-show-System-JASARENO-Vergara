/**
 * Real API client communicating with the C# .NET Minimal API backend
 * Default endpoint: http://localhost:5205
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5205";

/**
 * Helper to parse ProblemDetails or fallback error responses from C# API
 * @param {Response} response
 * @returns {Promise<Error>}
 */
async function parseApiError(response) {
  try {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("problem+json")) {
      const problem = await response.json();
      let message = problem.detail || problem.title || `API Error: HTTP ${response.status}`;

      if (problem.errors && typeof problem.errors === "object") {
        const errorDetails = Object.entries(problem.errors)
          .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join(" | ");
        if (errorDetails) {
          message += ` (${errorDetails})`;
        }
      }

      const err = new Error(message);
      err.status = response.status;
      err.problem = problem;
      return err;
    }
    const text = await response.text();
    return new Error(text || `Request failed with status code ${response.status}`);
  } catch {
    return new Error(`Request failed with status code ${response.status}`);
  }
}

/**
 * Fetch paginated and filtered registrations from GET /api/registrations
 * @param {Object} params
 * @param {string} [params.participantName]
 * @param {string} [params.type]
 * @param {string} [params.status]
 * @param {number} [params.page=1]
 * @param {number} [params.pageSize=10]
 * @returns {Promise<{items: Array, page: number, pageSize: number, totalCount: number, totalPages: number}>}
 */
export async function getRegistrations({
  participantName = "",
  type = "",
  status = "",
  page = 1,
  pageSize = 10,
} = {}) {
  const queryParams = new URLSearchParams();

  if (participantName && participantName.trim()) {
    queryParams.append("participantName", participantName.trim());
  }

  if (type && type.trim() && type !== "All") {
    queryParams.append("type", type.trim());
  }

  if (status && status.trim() && status !== "All") {
    queryParams.append("status", status.trim());
  }

  queryParams.append("page", String(Math.max(1, Number(page) || 1)));
  queryParams.append("pageSize", String(Math.max(1, Number(pageSize) || 10)));

  const url = `${API_BASE_URL}/api/registrations?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw await parseApiError(response);
  }

  return response.json();
}

/**
 * Fetch KPI summary totals from GET /api/registrations/summary
 * @returns {Promise<{totalRegistrations: number, confirmed: number, checkedIn: number, pending: number, cancelled: number, totalFees: number, totalPayments: number, uncollectedPayments: number}>}
 */
export async function getSummary() {
  const url = `${API_BASE_URL}/api/registrations/summary`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw await parseApiError(response);
  }

  return response.json();
}
