import { Car, ShieldCheck } from "lucide-react";
import RegistrationsPage from "./pages/RegistrationsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-brand-100/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-pill">
              <Car className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-charcoal block leading-tight">
                AutoVista <span className="text-brand-500 font-bold">2027</span>
              </span>
              <span className="text-[11px] text-muted font-semibold tracking-wide uppercase block">
                Car Show Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Sorsogon Coliseum
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RegistrationsPage />
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-100/60 bg-white/40 py-6 mt-12 text-center text-xs text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2027 AutoVista Events • Sorsogon City Coliseum. All rights reserved.</p>
          <p className="font-medium">Car Show Registration System — Collaborative Dashboard</p>
        </div>
      </footer>
    </div>
  );
}
