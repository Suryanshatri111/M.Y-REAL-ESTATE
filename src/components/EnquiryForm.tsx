import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BANKS } from "@/lib/banks";
import { Send, CheckCircle2 } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  loan_amount: z.string().optional(),
  preferred_bank: z.string().optional(),
  city: z.string().trim().max(100).optional(),
  message: z.string().trim().max(1000).optional(),
});

export const EnquiryForm = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "", loan_amount: "", preferred_bank: "", city: "", message: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const payload = {
      full_name: form.full_name,
      phone: form.phone,
      email: form.email || null,
      loan_amount: form.loan_amount ? Number(form.loan_amount) : null,
      preferred_bank: form.preferred_bank || null,
      city: form.city || null,
      message: form.message || null,
    };
    const { error } = await supabase.from("enquiries").insert(payload);
    setLoading(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Enquiry submitted! We'll be in touch shortly.");
    setForm({ full_name: "", phone: "", email: "", loan_amount: "", preferred_bank: "", city: "", message: "" });
  };

  return (
    <section id="enquiry" className="container py-20">
      <div className="grid gap-10 rounded-[2rem] border border-border/60 bg-card p-8 shadow-warm md:grid-cols-5 md:p-12">
        <div className="md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get Started</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Tell us about your home loan
          </h2>
          <p className="mt-3 text-muted-foreground">
            Share a few details and our team will reach out with the best matching offers — no spam, no obligation.
          </p>
          <div className="mt-6 rounded-2xl bg-gradient-soft p-5">
            <p className="text-sm text-muted-foreground">Prefer to talk?</p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">+91 9314999166</p>
            <p className="text-xs text-muted-foreground">Yogesh Kumar Sharma · M.Y Real Estate</p>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-4 md:col-span-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="full_name">Full name *</Label>
            <Input id="full_name" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="Your name" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 …" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="loan_amount">Loan amount (₹)</Label>
            <Input id="loan_amount" type="number" value={form.loan_amount} onChange={(e) => set("loan_amount", e.target.value)} placeholder="e.g. 5000000" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Jaipur" />
          </div>
          <div className="md:col-span-2">
            <Label>Preferred bank</Label>
            <Select value={form.preferred_bank} onValueChange={(v) => set("preferred_bank", v)}>
              <SelectTrigger><SelectValue placeholder="Any bank" /></SelectTrigger>
              <SelectContent>
                {BANKS.map((b) => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Anything else we should know?" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" size="lg" disabled={loading} className="w-full shadow-warm">
              {done ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Submitted</> : <><Send className="mr-2 h-4 w-4" /> {loading ? "Submitting..." : "Submit Enquiry"}</>}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
