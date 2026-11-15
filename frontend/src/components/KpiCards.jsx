import { Users, Banknote, AlertCircle, CheckCircle2, UserCheck } from "lucide-react";
import KpiCard from "./KpiCard";
import { formatCurrency, formatNumber } from "../utils/formatters";

/**
 * KPI Cards Grid displaying summary metrics
 */
export default function KpiCards({ summary, loading = false }) {
  const safeData = summary || {
    totalRegistrations: 0,
    totalPayments: 0,
    uncollectedPayments: 0,
    confirmed: 0,
    checkedIn: 0,
  };

  const cards = [
    {
      id: "totalRegistrations",
      title: "Total Registrations",
      value: loading ? "—" : formatNumber(safeData.totalRegistrations),
      subtitle: "All registered entries",
      icon: Users,
      accentColor: "brand",
    },
    {
      id: "totalPayments",
      title: "Total Payments",
      value: loading ? "—" : formatCurrency(safeData.totalPayments),
      subtitle: "Collected fees (active)",
      icon: Banknote,
      accentColor: "emerald",
    },
    {
      id: "uncollectedPayments",
      title: "Uncollected Payments",
      value: loading ? "—" : formatCurrency(safeData.uncollectedPayments),
      subtitle: "Outstanding balances",
      icon: AlertCircle,
      accentColor: "amber",
    },
    {
      id: "confirmed",
      title: "Confirmed",
      value: loading ? "—" : formatNumber(safeData.confirmed),
      subtitle: "Ready for entry",
      icon: CheckCircle2,
      accentColor: "indigo",
    },
    {
      id: "checkedIn",
      title: "Checked In",
      value: loading ? "—" : formatNumber(safeData.checkedIn),
      subtitle: "On-site at Coliseum",
      icon: UserCheck,
      accentColor: "teal",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <KpiCard
          key={card.id}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          accentColor={card.accentColor}
        />
      ))}
    </div>
  );
}
