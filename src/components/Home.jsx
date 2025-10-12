'use client'
import Link from 'next/link';
import { FaMosque, FaBookQuran, FaHandsPraying, FaEnvelope } from 'react-icons/fa6';
import { useEffect } from 'react';

export default function Home() {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener('click', handleScroll));
    return () => links.forEach((link) => link.removeEventListener('click', handleScroll));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">রুকইয়াহ শিফা</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">কুরআন ও সুন্নাহ ভিত্তিক আধ্যাত্মিক চিকিৎসার মাধ্যমে শান্তি ও সুরক্ষা অর্জন করুন।</p>
          <Link href="/appointment">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
              অ্যাপয়েন্টমেন্ট বুক করুন
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-teal-800 mb-6">রুকইয়াহ কী?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              রুকইয়াহ হলো কুরআনের আয়াত ও নবীজির (সাঃ) শেখানো দোয়ার মাধ্যমে জিন, জাদু, বদনজর এবং শারীরিক-মানসিক সমস্যার শরিয়া সম্মত চিকিৎসা। এটি আল্লাহর কাছে সাহায্য প্রার্থনার একটি মাধ্যম।[](https://www.ruqyahsupport.com/ruqyahcenterbd/)
            </p>
            <p className="text-gray-600 leading-relaxed">
              আমাদের অভিজ্ঞ রাকি (আধ্যাত্মিক চিকিৎসক) আপনাকে শান্তি, সুরক্ষা এবং আধ্যাত্মিক শক্তি অর্জনে সহায়তা করবেন।
            </p>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1618383607768-3d9d7faca60f" alt="কুরআন" className="rounded-lg shadow-xl w-full h-80 object-cover transform hover:scale-105 transition duration-300" />
            <div className="absolute -bottom-4 -left-4 bg-teal-600 text-white p-4 rounded-lg shadow-lg">
              <FaBookQuran className="text-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-20 bg-teal-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-teal-800 mb-12">আমাদের সেবাসমূহ</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaMosque className="text-4xl text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">রুকইয়াহ সেশন</h3>
              <p className="text-gray-600">অভিজ্ঞ রাকির সাথে ব্যক্তিগত সেশনের মাধ্যমে আধ্যাত্মিক শুদ্ধি ও শিফা।</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaBookQuran className="text-4xl text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">কুরআনিক নির্দেশনা</h3>
              <p className="text-gray-600">প্রতিদিনের আধ্যাত্মিক শক্তির জন্য সুরক্ষামূলক দোয়া ও কুরআন তিলাওয়াত শিখুন।</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaHandsPraying className="text-4xl text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">কাউন্সেলিং</h3>
              <p className="text-gray-600">আধ্যাত্মিক ও মানসিক নির্দেশনার মাধ্যমে অভ্যন্তরীণ শান্তি অর্জন।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-teal-800 mb-12">আমাদের ক্লায়েন্টদের মতামত</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-teal-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <p className="text-gray-600 italic mb-4">"রুকইয়াহ সেশন আমার জীবনে অপূর্ব শান্তি এনেছে। আমি আধ্যাত্মিকভাবে নতুন জীবন পেয়েছি।"</p>
              <p className="font-semibold text-teal-800">- আয়েশা এম.</p>
            </div>
            <div className="bg-teal-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <p className="text-gray-600 italic mb-4">"প্রাপ্ত নির্দেশনা ও সহায়তা আমার জীবন বদলে দিয়েছে। অত্যন্ত সুপারিশ করি!"</p>
              <p className="font-semibold text-teal-800">- ওমর কে.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="py-20 px-4 md:px-20 bg-teal-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">আপনার শিফার যাত্রা শুরু করতে প্রস্তুত?</h2>
          <p className="text-lg mb-8">আমাদের অভিজ্ঞ রাকিদের সাথে সেশন বুক করুন এবং রুকইয়াহর রূপান্তরকারী শক্তি অনুভব করুন।</p>
          <Link href="/appointment">
            <button className="bg-white text-teal-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              এখনই অ্যাপয়েন্টমেন্ট বুক করুন
            </button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-teal-800 mb-6">যোগাযোগ করুন</h2>
          <p className="text-gray-600 mb-8">প্রশ্ন বা নির্দেশনার প্রয়োজন? আমাদের সাথে যোগাযোগ করুন।</p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-teal-600">
              <FaEnvelope className="text-2xl" />
              <p className="text-lg">contact@ruqyahhealing.com</p>
            </div>
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="আপনার নাম"
                className="w-full p-3 mb-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="w-full p-3 mb-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <textarea
                placeholder="আপনার বার্তা"
                className="w-full p-3 mb-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                rows="4"
              ></textarea>
              <button className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105">
                বার্তা পাঠান
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}