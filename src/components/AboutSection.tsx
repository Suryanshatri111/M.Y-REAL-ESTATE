import { COMPANY } from "@/lib/banks";
import { Heart, Clock, BadgeCheck } from "lucide-react";

const FEATURES = [
  { icon: Heart, title: "Personal touch", text: "Guided by Yogesh Kumar Sharma personally — every enquiry handled with care." },
  { icon: Clock, title: "Fast turnaround", text: "Pre-approvals in days, not weeks. We chase the bank so you don't have to." },
  { icon: BadgeCheck, title: "Best-rate guarantee", text: "We compare offers from 12+ banks to lock in the lowest interest rate." },
];

export const AboutSection = () => {
  return (
    <section id="about" className="bg-gradient-soft py-20">
      <div className="container grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Us</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            A warmer way to finance your home
          </h2>
          <p className="mt-4 text-muted-foreground">
            At {COMPANY.name}, we believe a home loan shouldn't feel like a maze.
            Led by <strong className="text-foreground">{COMPANY.owner}</strong>, we sit on your side of the table —
            negotiating rates, simplifying paperwork, and walking with you from enquiry to keys in hand.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-card px-5 py-3 shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Speak to {COMPANY.owner}</div>
            <a href={COMPANY.phoneHref} className="font-serif text-lg font-semibold text-primary">{COMPANY.phone}</a>
          </div>
        </div>

        <div className="grid gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-warm">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
