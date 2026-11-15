/**
 * Accessible badge for participant registration status:
 * Pending (Amber), Confirmed (Periwinkle/Indigo), CheckedIn (Teal), Cancelled (Muted Slate)
 */
export default function StatusBadge({ status }) {
  const normalized = (status || "").trim().toLowerCase();

  const configs = {
    pending: {
      label: "Pending",
      classes: "bg-status-pending-bg text-status-pending-text border-status-pending-border",
      dot: "bg-status-pending-dot",
    },
    confirmed: {
      label: "Confirmed",
      classes: "bg-status-confirmed-bg text-status-confirmed-text border-status-confirmed-border",
      dot: "bg-status-confirmed-dot",
    },
    checkedin: {
      label: "Checked In",
      classes: "bg-status-checkedin-bg text-status-checkedin-text border-status-checkedin-border",
      dot: "bg-status-checkedin-dot",
    },
    cancelled: {
      label: "Cancelled",
      classes: "bg-status-cancelled-bg text-status-cancelled-text border-status-cancelled-border",
      dot: "bg-status-cancelled-dot",
    },
  };

  const config = configs[normalized] || {
    label: status || "Unknown",
    classes: "bg-gray-100 text-gray-700 border-gray-200",
    dot: "bg-gray-400",
  };

  return (
    <span
      role="status"
      aria-label={`Status: ${config.label}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-pill tracking-wide ${config.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
}
