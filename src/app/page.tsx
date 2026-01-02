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
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="HANDYMAN Logo" fill className="object-contain" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-secondary">HANDYMAN</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-secondary/70">
            <Link href="/" className="text-secondary font-bold">Home</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/admin" className="hover:text-primary transition-colors">Admin Panel</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors group">
              <Heart className="w-6 h-6 text-secondary group-hover:text-primary" />
            </button>
            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors group relative">
              <ShoppingCart className="w-6 h-6 text-secondary group-hover:text-primary" />
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary/20 rounded-full text-primary font-bold text-xs mb-8 uppercase tracking-widest shadow-sm"
            >
              <Star className="w-3 h-3 fill-primary" /> 5th Generation Legacy
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-serif font-extrabold text-secondary mb-8 leading-tight">
              5 GENERATIONS OF <br />
              <span className="text-primary italic relative">
                TASTE.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M1 10.5C31.2 5.2 92.4 1 150 1C207.6 1 268.8 5.2 299 10.5" stroke="#C58E1A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-secondary/70 mb-12 max-w-lg leading-relaxed font-sans">
              Handyman connects visionary women and century-old family artisans to your doorstep. Every packet embodies hygiene, affordability, and lightning-fast global shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/shop" className="px-10 py-5 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl shadow-primary/30 group">
                Shop Muruku <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#story" className="px-10 py-5 border-2 border-secondary/10 bg-white/50 backdrop-blur-sm text-secondary font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-secondary hover:text-white transition-all">
                Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-[80px] rotate-6 blur-2xl" />
              <div className="absolute inset-0 bg-accent/20 rounded-[80px] -rotate-6 blur-2xl" />
              <div className="relative bg-white/40 backdrop-blur-3xl border border-white/50 rounded-[60px] p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 relative mb-8">
                  <Image src="/logo.png" alt="Logo Large" fill className="object-contain animate-float" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-secondary mb-2">Powered by Her Hands</h3>
                <p className="text-secondary/60">Crafted with Love, Tradition & Hygiene</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-32 bg-secondary text-background relative overflow-hidden">
        {/* Abstract Background patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-6 block">Our Legacy</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-10 leading-tight">
                &quot;Powered by <span className="text-primary italic">Her Hands.</span>&quot;
              </h2>
              <div className="space-y-8 text-lg font-sans leading-relaxed text-background/70">
                <p>
                  Handyman Technologies champions women empowerment by partnering with families to deliver their time-honored snacks worldwide.
                </p>
                <p>
                  These hygienic, low-cost delights arrive with fastest delivery, crafted by 100+ year-old 5th-generation businesses for unbeatable taste.
                </p>
              </div>

              <div className="mt-16 flex items-center gap-6 p-6 border border-white/10 rounded-3xl bg-white/5">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-serif font-bold">
                  HJ
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold">Hariharan Jeyaramamoorthy</h4>
                  <p className="text-primary font-bold text-sm tracking-widest uppercase mt-1">Founder</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Women Empowerment",
                  desc: "Direct profits to female-led home units, fostering independence."
                },
                {
                  icon: ShieldCheck,
                  title: "Hygienic Excellence",
                  desc: "FSSAI-compliant, safe processes from village kitchens to you."
                },
                {
                  icon: Leaf,
                  title: "Low Cost",
                  desc: "Premium taste without premium prices—value-packed bites."
                },
                {
                  icon: Zap,
                  title: "Fastest Delivery",
                  desc: "Pan-India in 2-3 days, worldwide express."
                },
              ].map((pill, i) => (
                <motion.div
                  key={pill.title}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 hover:border-primary/30 transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <pill.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-serif">{pill.title}</h3>
                  <p className="text-background/50 leading-relaxed font-sans text-sm">{pill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Taglines Banner */}
      <section className="py-24 bg-background border-y border-primary/10 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 whitespace-nowrap"
        >
          {[
            "5 Generations of Taste, Powered by Her Hands.",
            "Hygienic Bites, Global Reach, Women-Led Legacy.",
            "Affordable Crunch, Lightning Delivery, Timeless Tradition.",
            "5 Generations of Taste, Powered by Her Hands.",
            "Hygienic Bites, Global Reach, Women-Led Legacy.",
            "Affordable Crunch, Lightning Delivery, Timeless Tradition.",
          ].map((text, i) => (
            <span key={i} className="text-4xl md:text-6xl font-serif font-black italic text-secondary/10 uppercase tracking-tighter">
              {text}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-32 container mx-auto px-6">
        <div className="premium-gradient rounded-[60px] p-16 text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <History className="w-16 h-16 mx-auto mb-8 opacity-50" />
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight">
              100+ Years of Tradition <br /> in Every Bite.
            </h2>
            <p className="text-xl text-white/70 mb-12 font-sans px-8">
              From village kitchens to your doorstep. Handmade Muruku that celebrates women and empowers legacies.
            </p>
            <Link href="/shop" className="px-12 py-6 bg-white text-secondary font-bold rounded-2xl hover:scale-105 transition-all shadow-2xl text-xl inline-block">
              Start Your Heritage Experience
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-secondary/10 bg-background">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16 items-center">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="grayscale" />
              <span className="font-serif text-3xl font-bold text-secondary">HANDYMAN</span>
            </div>
            <p className="text-secondary/50 max-w-xs font-sans text-center md:text-left">
              Champions of women empowerment and century-old snack traditions.
            </p>
          </div>
          <div className="flex justify-center gap-12 font-serif text-lg font-bold">
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="#story" className="hover:text-primary transition-colors">Our Story</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 text-secondary/40 font-sans text-sm">
            <p>© 2026 Handyman Technologies.</p>
            <p>Powered by Her Hands.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
