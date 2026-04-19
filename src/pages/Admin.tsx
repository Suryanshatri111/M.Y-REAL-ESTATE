import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Home, LogOut, Trash2, Phone, Mail, MapPin, Calendar, Building2, IndianRupee } from "lucide-react";

interface Enquiry {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  loan_amount: number | null;
  preferred_bank: string | null;
  city: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUSES = ["new", "contacted", "in_progress", "approved", "closed"];

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    document.title = "Admin — Enquiries";
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate("/auth"); return; }
      const { data: roles } = await supabase
        .from("user_roles").select("role").eq("user_id", sess.session.user.id);
      if (!roles?.some((r) => r.role === "admin")) {
        toast.error("Admin access required.");
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }
      setAuthorized(true);
      await load();
      setLoading(false);
    };
    init();
  }, [navigate]);

  const load = async () => {
    const { data, error } = await supabase
      .from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setEnquiries(data as Enquiry[]);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Status updated"); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading || !authorized) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Loading…</div>;
  }

  const counts = STATUSES.reduce((a, s) => ({ ...a, [s]: enquiries.filter(e => e.status === s).length }), {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold">Admin Dashboard</span>
          </Link>
          <Button variant="outline" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
        </div>
      </header>

      <main className="container py-10">
        <h1 className="font-serif text-3xl font-semibold">Enquiries</h1>
        <p className="mt-1 text-muted-foreground">Manage and track all incoming home loan enquiries.</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STATUSES.map((s) => (
            <Card key={s} className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.replace("_", " ")}</p>
              <p className="mt-1 font-serif text-2xl font-semibold">{counts[s] || 0}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {enquiries.length === 0 && (
            <Card className="p-12 text-center text-muted-foreground">No enquiries yet.</Card>
          )}
          {enquiries.map((e) => (
            <Card key={e.id} className="p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-semibold">{e.full_name}</h3>
                    <Badge variant="secondary" className="capitalize">{e.status.replace("_", " ")}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> <a href={`tel:${e.phone}`} className="hover:text-primary">{e.phone}</a></span>
                    {e.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {e.email}</span>}
                    {e.city && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.city}</span>}
                    {e.loan_amount && <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> {e.loan_amount.toLocaleString("en-IN")}</span>}
                    {e.preferred_bank && <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {e.preferred_bank}</span>}
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(e.created_at).toLocaleString()}</span>
                  </div>
                  {e.message && <p className="mt-3 rounded-lg bg-muted/60 p-3 text-sm">{e.message}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Select value={e.status} onValueChange={(v) => updateStatus(e.id, v)}>
                    <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map(s => <SelectItem key={s} value={s} className="capitalize">{s.replace("_", " ")}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => remove(e.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Admin;
