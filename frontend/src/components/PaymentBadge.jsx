/**
 * Accessible badge for payment status:
 * Paid (Emerald Green), Partial (Amber/Gold), Unpaid (Rose Red)
 */
export default function PaymentBadge({ status }) {
  const normalized = (status || "").trim().toLowerCase();

  const configs = {
    paid: {
      label: "Paid",
      classes: "bg-payment-paid-bg text-payment-paid-text border-payment-paid-border",
      dot: "bg-payment-paid-dot",
    },
    partial: {
      label: "Partial",
      classes: "bg-payment-partial-bg text-payment-partial-text border-payment-partial-border",
      dot: "bg-payment-partial-dot",
    },
    unpaid: {
      label: "Unpaid",
      classes: "bg-payment-unpaid-bg text-payment-unpaid-text border-payment-unpaid-border",
      dot: "bg-payment-unpaid-dot",
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
      aria-label={`Payment Status: ${config.label}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-pill tracking-wide ${config.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
}
