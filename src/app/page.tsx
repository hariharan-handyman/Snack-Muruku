"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Leaf,
  Zap,
  History,
  ShoppingCart,
  ArrowRight,
  Star
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-accent/10 selection:text-accent">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="HANDYMAN Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary uppercase">HANDYMAN</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-wider text-slate-600">
            <Link href="/" className="text-primary border-b-2 border-primary py-5">Overview</Link>
            <Link href="/shop" className="hover:text-primary transition-colors py-5">Produce</Link>
            <Link href="/admin" className="hover:text-primary transition-colors py-5">Management</Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Corporate Hero Section - Centered & Professional */}
      <section className="pt-32 pb-20 border-b border-slate-100 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded text-slate-500 font-bold text-[9px] mb-8 uppercase tracking-[0.3em]">
              Operational Quality & Excellence
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight tracking-tight max-w-2xl">
              Professional Distribution of <br />
              <span className="text-accent">Premium Standardized Delicacies.</span>
            </h1>

            <p className="text-sm md:text-base text-slate-500 mb-10 max-w-xl leading-relaxed font-medium">
              Handyman Technologies bridges the gap between traditional food craft and modern retail standards through rigorous quality assurance and efficient supply chain management.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop" className="px-6 py-3 bg-primary text-white font-bold rounded shadow-lg hover:shadow-xl hover:bg-secondary transition-all text-xs uppercase tracking-widest">
                Browse Product Line
              </Link>
              <Link href="#values" className="px-6 py-3 border border-slate-200 bg-white text-primary font-bold rounded hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">
                Our Methodology
              </Link>
            </div>

            {/* Subdued Reliability Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-slate-100 pt-10">
              {[
                { label: "Compliance", val: "FSSAI Audit" },
                { label: "Community", val: "100+ Units" },
                { label: "Network", val: "Global Reach" },
                { label: "Tradition", val: "5 Generations" },
              ].map((s) => (
                <div key={s.label} className="space-y-1">
                  <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">{s.label}</p>
                  <p className="text-xs font-bold text-primary">{s.val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-accent font-bold text-[11px] uppercase tracking-widest mb-4 block">Process Integrity</span>
            <h2 className="text-3xl font-bold text-primary mb-6 tracking-tight">Industrializing tradition for the modern era.</h2>
            <p className="text-slate-500 text-sm leading-relaxed">We provide a professional supply chain and quality control framework for distributed home-production units.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Empowerment",
                desc: "Direct-to-producer revenue distribution for micro-entrepreneurs."
              },
              {
                icon: ShieldCheck,
                title: "Assurance",
                desc: "Professional hygiene audits and FSSAI-compliant standardizing."
              },
              {
                icon: Leaf,
                title: "Efficiency",
                desc: "Lean operations to maintain competitive market pricing."
              },
              {
                icon: Zap,
                title: "Velocity",
                desc: "Strategic partnerships with Tier-1 international logistics."
              },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors group">
                <item.icon className="w-8 h-8 text-primary mb-6 group-hover:text-accent transition-colors" />
                <h3 className="text-lg font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <History className="w-12 h-12 mb-10 text-white/30" />
          <h2 className="text-4xl md:text-5xl font-bold mb-8 max-w-3xl leading-tight">
            Honoring Heritage through Professional Excellence.
          </h2>
          <p className="text-lg text-white/60 mb-12 max-w-2xl">
            Handyman Technologies bridges the gap between traditional craft and modern retail standards.
          </p>
          <div className="flex gap-4">
            <Link href="/shop" className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-all">
              Access Products
            </Link>
            <a href="mailto:handyman.tech.in@gmail.com" className="px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Handyman Logo" width={32} height={32} className="grayscale" />
                <span className="text-xl font-bold tracking-tight text-primary uppercase">HANDYMAN</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                A corporate platform for facilitating the logistics and distribution of traditional snacks. Built on trust, hygiene, and efficiency.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary uppercase tracking-widest mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><Link href="/" className="hover:text-primary">Corporate Overview</Link></li>
                <li><Link href="/shop" className="hover:text-primary">Product Line</Link></li>
                <li><Link href="/admin" className="hover:text-primary">Administration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary uppercase tracking-widest mb-6">Governance</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li>
                  <a href="tel:+919042387152" className="hover:text-primary block">
                    +91 9042387152
                  </a>
                </li>
                <li>
                  <a href="mailto:handyman.tech.in@gmail.com" className="hover:text-primary block">
                    handyman.tech.in@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <p>© 2026 Handyman Technologies.</p>
            <p>Quality Standardized.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
