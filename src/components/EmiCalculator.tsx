import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fmt = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const EmiCalculator = () => {
  const [amount, setAmount] = useState(5000000); // ₹50L
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8.4);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const P = amount;
    const r = rate / 12 / 100;
    const n = years * 12;
    if (P <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayable: 0 };
    }
    const e = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tp = e * n;
    return { emi: e, totalInterest: tp - P, totalPayable: tp };
  }, [amount, years, rate]);

  return (
    <div className="relative animate-fade-up">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-warm opacity-20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-warm">
        <div className="bg-gradient-soft p-6 sm:p-8">
          <div className="rounded-2xl bg-background/80 p-6 backdrop-blur">
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">EMI Calculator</p>
              <p className="text-[11px] text-muted-foreground">Monthly</p>
            </div>
            <p className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
              ₹ {fmt(emi)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              on ₹{fmt(amount)} · {years} yrs · {rate}% p.a.
            </p>

            <div className="mt-6 space-y-5">
              {/* Loan amount */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Loan amount</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                    className="h-7 w-32 text-right text-sm"
                  />
                </div>
                <Slider
                  value={[amount]}
                  min={100000}
                  max={20000000}
                  step={50000}
                  onValueChange={(v) => setAmount(v[0])}
                  className="mt-2"
                />
              </div>

              {/* Tenure */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Tenure (years)</Label>
                  <span className="text-sm font-medium">{years}</span>
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(v) => setYears(v[0])}
                  className="mt-2"
                />
              </div>

              {/* Rate */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Interest rate (%)</Label>
                  <span className="text-sm font-medium">{rate.toFixed(2)}</span>
                </div>
                <Slider
                  value={[rate]}
                  min={6}
                  max={15}
                  step={0.05}
                  onValueChange={(v) => setRate(Number(v[0].toFixed(2)))}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/60 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total interest</p>
                <p className="mt-1 font-serif text-lg font-semibold">₹ {fmt(totalInterest)}</p>
              </div>
              <div className="rounded-xl bg-secondary/60 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total payable</p>
                <p className="mt-1 font-serif text-lg font-semibold">₹ {fmt(totalPayable)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
