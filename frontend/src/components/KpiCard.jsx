/**
 * Individual KPI Summary Metric Card
 */
export default function KpiCard({ title, value, subtitle, icon: Icon, accentColor = "brand" }) {
  const accentStyles = {
    brand: "bg-brand-50 text-brand-500 border-brand-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    teal: "bg-teal-50 text-teal-600 border-teal-100",
  };

  const badgeClass = accentStyles[accentColor] || accentStyles.brand;

  return (
    <div className="bg-white rounded-2xl p-5 border border-brand-100/70 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all duration-200 flex flex-col justify-between group">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-muted">
          {title}
        </span>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 ${badgeClass}`}>
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl lg:text-[1.75rem] font-extrabold text-charcoal tracking-tight font-sans">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-light font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
