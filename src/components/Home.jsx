"use client"

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "রুকইয়াহ কি নিরাপদ?",
      a: "হ্যাঁ, প্রশিক্ষিত বিশেষজ্ঞের মাধ্যমে পরিচালিত হলে এটি সম্পূর্ণ নিরাপদ এবং শুধুমাত্র কুরআনিক দোয়া ও আধ্যাত্মিক চিকিৎসার মাধ্যম।",
    },
    {
      q: "হিজামা কখন করা যায়?",
      a: "১৭, ১৯ ও ২১ তারিখে হিজামা করা উত্তম মনে করা হয়, তবে প্রয়োজনে অন্যান্য দিনেও করা যায়।",
    },
    {
      q: "রুকইয়াহ কি চিকিৎসার বিকল্প?",
      a: "না, এটি আত্মিক চিকিৎসা যা শারীরিক চিকিৎসার সহায়ক হিসেবে কাজ করে।",
    },
    {
      q: "হিজামা কি ব্যথাদায়ক?",
      a: "না, খুব সামান্য অনুভূতি হয় যা দ্রুত সেরে যায়। অভিজ্ঞ হাতে এটি সম্পূর্ণ আরামদায়ক।",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white dark:from-[#0a0f1a] dark:to-[#050b12] text-gray-800 dark:text-gray-100 px-4 sm:px-6 md:px-8">
      <main className="max-w-6xl mx-auto py-10 md:py-16">
        {/* HERO SECTION */}
        <section className="text-center relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="hero-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#6366f1" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="200" r="180" fill="url(#hero-grad)" />
          </svg>

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500 dark:from-indigo-400 dark:to-cyan-300">
              আল হিকমাহ রুকইয়াহ ও হিজামা সেন্টার
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              আত্মা ও শরীরের সমন্বিত চিকিৎসা — কুরআনিক রুকইয়াহ ও নিরাপদ হিজামার মাধ্যমে সুস্থতার পথে এক ধাপ এগিয়ে।
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <ModernButton href="/appointment" text="অ্যাপয়েন্টমেন্ট বুক করুন" />
              <ModernButton href="https://ruqyahbd.org/blog" text="রুকইয়াহ সম্পর্কে জানুন" external />
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">আমাদের সেবা সমূহ</h2>
          <p className="text-center opacity-80 mt-2">রুকইয়াহ ও হিজামার মাধ্যমে আত্মিক ও শারীরিক সুস্থতার যত্নে।</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ServiceCard icon={<RuqyahIcon />} title="রুকইয়াহ সেশন" desc="কুরআনিক রুকইয়াহ, দোয়া ও আত্মিক চিকিৎসা যা অভিজ্ঞ প্র্যাকটিশনারের মাধ্যমে পরিচালিত হয়।" />
            <ServiceCard icon={<HijamaIcon />} title="হিজামা (কাপিং থেরাপি)" desc="নিরাপদ, হালকা ব্যথামুক্ত ও জীবাণুমুক্ত কাপিং প্রক্রিয়া।" />
            <ServiceCard icon={<ConsultIcon />} title="পরামর্শ ও ফলো-আপ" desc="ব্যক্তিগত পরামর্শ, চিকিৎসা পরিকল্পনা ও পর্যবেক্ষণ সেবা।" />
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">প্রায় জিজ্ঞাসিত প্রশ্ন</h2>
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium bg-white/60 dark:bg-white/5 hover:bg-gray-100/60 transition"
                >
                  <span className="flex items-center gap-2"><FaqIcon /> {f.q}</span>
                  <span>{openIndex === i ? "−" : "+"}</span>
                </button>
                {openIndex === i && (
                  <div className="px-4 py-3 text-sm opacity-90 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-700">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* NEW SECTION: CLIENT TESTIMONIALS */}
        <section className="py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">রোগীর অভিজ্ঞতা</h2>
          <p className="text-center opacity-80 mt-2">আমাদের সেবার মাধ্যমে যারা আত্মিক ও শারীরিক প্রশান্তি পেয়েছেন।</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            <Testimonial name="মোঃ রাফি" text="রুকইয়াহ সেশনের মাধ্যমে আল্লাহর রহমতে মন অনেক হালকা হয়েছে। জাযাকাল্লাহু খাইরান।" />
            <Testimonial name="সুমাইয়া রহমান" text="হিজামা সেশনটি খুবই আরামদায়ক ছিল এবং পরিবেশ ছিল গোপনীয় ও পরিচ্ছন্ন।" />
            <Testimonial name="হাসান উদ্দিন" text="চিকিৎসকদের আচরণ অত্যন্ত বন্ধুসুলভ, আমি নিয়মিত ফলো-আপ নিচ্ছি।" />
          </div>
        </section>

        {/* CONTACT SECTION WITH MAP */}
        <section className="py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">যোগাযোগ করুন</h2>
          <p className="text-center opacity-80 mt-2">আপনার যেকোন প্রশ্ন বা অ্যাপয়েন্টমেন্টের জন্য আমাদের সাথে যোগাযোগ করুন।</p>

          <div className="mt-10 grid md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800">
              <iframe
                title="Al Hikmah Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8484!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sbd!4v0000000000"
                className="w-full h-64 md:h-80 border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <p className="text-lg font-medium">📍 ঢাকা, বাংলাদেশ</p>
              <p className="opacity-80">আমরা শিগগিরই আপনার সেবায় উপস্থিত হব ইনশাআল্লাহ।</p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=23.8103,90.4125"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-xl shadow-md hover:scale-[1.02] transition"
              >
                📍 দিকনির্দেশনা দেখুন
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 pt-8 pb-10 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm opacity-80">© {new Date().getFullYear()} আল হিকমাহ রুকইয়াহ ও হিজামা সেন্টার — সর্বস্বত্ব সংরক্ষিত।</p>
        </footer>
      </main>
    </div>
  );
}

function ModernButton({ href, text, external }) {
  const base = "inline-block rounded-xl px-6 py-3 font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-md transition-transform hover:scale-[1.03]";
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={base}>{text}</a>;
  return <Link href={href} className={base}>{text}</Link>;
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/5 shadow-md hover:scale-[1.02] transition-transform">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30">{icon}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm opacity-80 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonial({ name, text }) {
  return (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/5 shadow-md text-center">
      <p className="text-sm opacity-90">“{text}”</p>
      <p className="mt-3 font-semibold text-indigo-600 dark:text-indigo-400">— {name}</p>
    </div>
  );
}

/* SVG ICONS */
const RuqyahIcon = () => <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M12 2v6M6 9h12M8 16h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
const HijamaIcon = () => <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M4 20c2-4 8-6 16-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
const ConsultIcon = () => <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 8h8M8 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
const FaqIcon = () => <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M12 16h.01M12 8a2 2 0 012 2c0 1-1 1.5-1.5 2s-.5 1-.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;