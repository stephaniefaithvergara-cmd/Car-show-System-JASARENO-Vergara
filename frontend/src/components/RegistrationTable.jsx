import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";
import { formatCurrency, formatDate } from "../utils/formatters";

/**
 * Type Pill styling helper
 */
function TypeBadge({ type }) {
  const typeConfigs = {
    vip: "bg-purple-50 text-purple-700 border-purple-200",
    competitor: "bg-blue-50 text-blue-700 border-blue-200",
    exhibitor: "bg-brand-50 text-brand-700 border-brand-200",
  };

  const key = (type || "").toLowerCase();
  const classes = typeConfigs[key] || "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}>
      {type}
    </span>
  );
}

/**
 * Responsive registrations data table
 */
export default function RegistrationTable({ items = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-100/80 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[840px]">
          <thead>
            <tr className="bg-brand-50/40 border-b border-brand-100/80 text-[11px] font-bold uppercase tracking-wider text-muted">
              <th scope="col" className="py-3.5 px-4">Reg No.</th>
              <th scope="col" className="py-3.5 px-4">Date</th>
              <th scope="col" className="py-3.5 px-4">Participant</th>
              <th scope="col" className="py-3.5 px-4">Car Details</th>
              <th scope="col" className="py-3.5 px-4">Type</th>
              <th scope="col" className="py-3.5 px-4">Status</th>
              <th scope="col" className="py-3.5 px-4 text-right">Fee / Paid</th>
              <th scope="col" className="py-3.5 px-4 text-center">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100/40 text-sm">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-brand-50/30 transition-colors duration-150 group"
              >
                {/* Registration Number */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100">
                    {item.registrationNumber}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 whitespace-nowrap text-xs text-muted font-medium">
                  {formatDate(item.registrationDate)}
                </td>

                {/* Participant */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-charcoal group-hover:text-brand-700 transition-colors">
                    {item.participantName}
                  </div>
                  <div className="text-xs text-muted flex items-center gap-1.5 flex-wrap">
                    {item.email && <span>{item.email}</span>}
                    {item.email && item.contactNumber && <span>•</span>}
                    {item.contactNumber && <span>{item.contactNumber}</span>}
                  </div>
                </td>

                {/* Car Details */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-charcoal text-sm">
                    {item.carMakeModel}
                  </div>
                  <div className="mt-0.5">
                    <span className="font-mono text-[11px] font-medium text-charcoal/70 bg-canvas-subtle px-1.5 py-0.5 rounded border border-muted-border inline-block">
                      {item.plateNumber}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <TypeBadge type={item.registrationType} />
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>

                {/* Fee / Paid (Right-aligned currency) */}
                <td className="py-3.5 px-4 whitespace-nowrap text-right">
                  <div className="font-bold text-charcoal font-sans text-sm">
                    {formatCurrency(item.registrationFee)}
                  </div>
                  <div className="text-xs text-muted font-medium">
                    Paid: <span className="text-charcoal-dark font-semibold">{formatCurrency(item.amountPaid)}</span>
                  </div>
                </td>

                {/* Payment Badge */}
                <td className="py-3.5 px-4 whitespace-nowrap text-center">
                  <PaymentBadge status={item.paymentStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
