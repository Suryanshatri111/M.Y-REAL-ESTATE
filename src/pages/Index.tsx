import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BanksSection } from "@/components/BanksSection";
import { AboutSection } from "@/components/AboutSection";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "M.Y Real Estate — Home Loan Enquiry & Advisors";
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "M.Y Real Estate by Yogesh Kumar Sharma — compare home loans from India's leading banks. Fast approvals, lowest rates. Call +91 9314999166.");
    document.head.appendChild(meta);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <BanksSection />
        <AboutSection />
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
