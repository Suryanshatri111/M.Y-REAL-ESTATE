import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/banks";
import { EmiCalculator } from "@/components/EmiCalculator";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Trusted Home Loan Advisors
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Your dream home,<br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">comfortably financed.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {COMPANY.name} compares offers from India's leading banks to find you the lowest rate,
            fastest approval, and a process that feels like home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-warm">
              <a href="#enquiry">Get a free quote <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#banks">View partner banks</a>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 12+ partner banks</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Zero processing hassle</span>
          </div>
        </div>

        <EmiCalculator />
      </div>
    </section>
  );
};
