import { BANKS } from "@/lib/banks";
import { Building2 } from "lucide-react";

export const BanksSection = () => {
  return (
    <section id="banks" className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Partners</span>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          We work with India's leading banks
        </h2>
        <p className="mt-3 text-muted-foreground">
          Compare offers, interest rates and EMIs from top lenders — all in one place.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {BANKS.map((bank) => (
          <div
            key={bank}
            className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-warm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-soft transition-transform group-hover:scale-110">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium leading-tight text-foreground">{bank}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
