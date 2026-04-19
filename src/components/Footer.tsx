import { COMPANY } from "@/lib/banks";
import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/60 bg-secondary/40">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground">{COMPANY.name}</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Helping families turn houses into homes with the right loan, from the right bank, at the right rate.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {COMPANY.owner}</li>
              <li><a href={COMPANY.phoneHref} className="hover:text-primary">{COMPANY.phone}</a></li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> India</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#banks" className="hover:text-primary">Partner Banks</a></li>
              <li><a href="#enquiry" className="hover:text-primary">Submit Enquiry</a></li>
              <li><a href="#about" className="hover:text-primary">About Us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
        </div>
      </div>

      {/* Developer stamp */}
      <div className="pointer-events-none absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
        <div className="pointer-events-auto rotate-[-4deg] rounded-md border-2 border-primary/70 bg-background/80 px-3 py-1.5 font-serif text-[11px] font-semibold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
          Developed by <span className="text-accent-foreground">{COMPANY.developer}</span>
        </div>
      </div>
    </footer>
  );
};
