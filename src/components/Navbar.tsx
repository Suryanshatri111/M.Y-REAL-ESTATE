import { Link } from "react-router-dom";
import { Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/banks";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm shadow-soft">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg font-semibold text-foreground">{COMPANY.name}</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Home Loan Advisors</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
          <a href="#banks" className="hover:text-primary transition-colors">Banks</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#enquiry" className="hover:text-primary transition-colors">Enquiry</a>
          <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
        </nav>

        <Button asChild variant="default" className="hidden sm:inline-flex">
          <a href={COMPANY.phoneHref}><Phone className="mr-2 h-4 w-4" />{COMPANY.phone}</a>
        </Button>
      </div>
    </header>
  );
};
