'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaStethoscope, 
  FaBookOpen, 
  FaHeartbeat,
  FaMapMarkedAlt,
  FaArrowRight,
  FaHandsHelping,
  FaUserMd,
  FaStar,
} from 'react-icons/fa';
import { GiHealing} from 'react-icons/gi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import alhikmahLogo from './../../public/images/alhikmah.png';
import Image from 'next/image';
const Homepage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Mohammed Rahman",
      feedback: "Alhamdulillah, the ruqyah treatment helped me recover from severe anxiety. The practitioners are very knowledgeable.",
      rating: 5
    },
    {
      name: "Fatima Begum",
      feedback: "Hijama treatment was excellent. Professional and clean environment. Highly recommended for anyone seeking healing.",
      rating: 5
    },
    {
      name: "Abdullah Khan",
      feedback: "Self-diagnosis test helped me understand my condition better before visiting. Very useful service!",
      rating: 4
    }
  ];

  const services = [
    {
      icon: <GiHealing className="w-12 h-12" />,
      title: "Ruqyah Shar'iyyah",
      description: "Quranic healing through authentic ruqyah methods for spiritual and physical ailments.",
      link: "/blog"
    },
    {
      icon: <FaHeartbeat className="w-12 h-12" />,
      title: "Hijama Therapy",
      description: "Traditional cupping therapy for detoxification and healing various conditions.",
      link: `/book-appointment?service=Hijama`
    },
    {
      icon: <FaStethoscope className="w-12 h-12" />,
      title: "Self Diagnosis",
      description: "Take Ruqyah Support BDs online test to understand if you need ruqyah treatment.",
      link: "https://test.ruqyahbd.org/bn"
    },
    {
      icon: <FaUserMd className="w-12 h-12" />,
      title: "Consultation",
      description: "Ruqyah sessions with experienced practitioners.",
      link: `/book-appointment?service=Ruqyah`
    }
  ];

  const processSteps = [
    {
      id: 1,
      title: "Self Assessment",
      desc: "Take free online test to understand your symptoms.",
      icon: <FaStethoscope />
    },
    {
      id: 2,
      title: "Book Appointment",
      desc: "Schedule a visit online or call us directly.",
      icon: <FaClock />
    },
    {
      id: 3,
      title: "Healing Session",
      desc: "Receive authentic Ruqyah or Hijama treatment.",
      icon: <GiHealing />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200">
      {/* Navigation Bar */}
 

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 z-0"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/50 to-transparent z-0"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Trusted Healing Center in Mymensingh
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-emerald-900 mb-6 leading-tight">
                Spiritual & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Physical Healing</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-light text-emerald-800 mb-6 opacity-90">
                আল হিকমাহ রুকইয়াহ এন্ড হিজামা সেন্টার
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Restore your balance through authentic Quranic Ruqyah and traditional Hijama therapy. A sanctuary for holistic well-being rooted in Sunnah.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/book-appointment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-emerald-200 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2"
                  >
                    Book Appointment <FaArrowRight className="text-sm"/>
                  </motion.button>
                </Link>
                <a href="tel:01723501455">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-emerald-800 border-2 border-emerald-100 px-8 py-4 rounded-full font-bold text-lg hover:border-amber-300 hover:text-amber-600 transition-all flex items-center justify-center gap-2"
                  >
                    <FaPhoneAlt className="text-amber-500" />
                    01723-501455
                  </motion.button>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 flex justify-center relative"
            >
              {/* Decorative Elements around Logo/Image */}
              <div className="absolute w-[500px] h-[500px] bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative w-full max-w-md aspect-square bg-white rounded-full shadow-2xl p-4 border-4 border-white ring-1 ring-emerald-100 flex items-center justify-center">
                 <Image 
                 src={alhikmahLogo} 
                 alt="Al-Hikmah Center" 
                 loading='lazy'
                 className="w-full h-full object-contain drop-shadow-xl" />
                 
                 {/* Floating Badges */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4 }}
                   className="absolute -right-4 top-20 bg-white p-4 rounded-xl shadow-lg border-l-4 border-amber-400"
                 >
                   <p className="text-xs text-gray-500 font-bold uppercase">Experience</p>
                   <p className="text-xl font-bold text-emerald-900">8+ Years</p>
                 </motion.div>

                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                   className="absolute -left-4 md:bottom-20 bottom-4 bg-white p-4 rounded-xl shadow-lg border-l-4 border-emerald-500"
                 >
                   <p className="text-xs text-gray-500 font-bold uppercase">Happy Patients</p>
                   <p className="text-xl font-bold text-emerald-900">2000+</p>
                 </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="bg-emerald-50 rounded-2xl p-8 h-full border border-emerald-100 hover:border-amber-200 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-700 text-2xl shadow-md mb-4 group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                  
                  {/* Connector Line (Desktop) */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-emerald-200 z-0"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-emerald-50 to-white relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Our Expertise</span>
            <h2 className="text-4xl font-bold text-emerald-900 mt-2 mb-4">Comprehensive Healing Services</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">
              We combine spiritual wisdom with traditional therapeutic practices for holistic recovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl shadow-lg shadow-emerald-100/50 hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 border-b-4 border-transparent hover:border-amber-400 group"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  target={service.link.startsWith('http') ? '_blank' : '_self'}
                  className="inline-flex items-center text-emerald-700 font-semibold hover:text-amber-600 transition-colors text-sm"
                >
                  Learn More <FaArrowRight className="ml-2 text-xs" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / About Section */}
      <section id="about" className="py-24 bg-emerald-900 text-white overflow-hidden relative">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="text-amber-400 font-bold tracking-wider uppercase text-sm">About Al-Hikmah</span>
              <h2 className="text-4xl font-bold mt-2 mb-6 leading-tight">Restoring Health Through Faith & Knowledge</h2>
              <p className="text-emerald-100 text-lg mb-6 leading-relaxed">
                "Al-Hikmah" means wisdom. Our center is dedicated to providing authentic Ruqyah Shar'iyyah and Hijama therapy strictly according to the Quran and Sunnah. We believe in the power of spiritual healing complemented by physical well-being.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Experienced Practitioners",
                  "100% Sterile & Safe Environment",
                  "Confidential & Compassionate Care",
                  "Based on Authentic Islamic Teachings"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <IoMdCheckmarkCircle />
                    </div>
                    <span className="text-emerald-50">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-transparent border-2 border-amber-400 text-amber-400 px-8 py-3 rounded-full font-bold hover:bg-amber-400 hover:text-emerald-900 transition-all"
                >
                  Read Our Blog
                </motion.button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="bg-emerald-800 p-6 rounded-2xl border border-emerald-700">
                    <FaBookOpen className="text-amber-400 text-3xl mb-4" />
                    <h4 className="font-bold text-lg mb-1">Quranic Basis</h4>
                    <p className="text-sm text-emerald-200">All treatments derived from authentic sources.</p>
                  </div>
                  <div className="bg-emerald-800 p-6 rounded-2xl border border-emerald-700">
                    <FaUserMd className="text-amber-400 text-3xl mb-4" />
                    <h4 className="font-bold text-lg mb-1">Expert Care</h4>
                    <p className="text-sm text-emerald-200">Trained professionals in spiritual healing.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-emerald-800 p-6 rounded-2xl border border-emerald-700">
                    <GiHealing className="text-amber-400 text-3xl mb-4" />
                    <h4 className="font-bold text-lg mb-1">Holistic</h4>
                    <p className="text-sm text-emerald-200">Mind, body, and soul connection.</p>
                  </div>
                  <div className="bg-emerald-800 p-6 rounded-2xl border border-emerald-700">
                    <FaHandsHelping className="text-amber-400 text-3xl mb-4" />
                    <h4 className="font-bold text-lg mb-1">Support</h4>
                    <p className="text-sm text-emerald-200">Ongoing guidance for patients.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">Stories of Healing</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-10 md:p-12 rounded-3xl shadow-xl relative"
            >
              <div className="absolute top-8 left-8 text-6xl text-emerald-100 font-serif">"</div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-2xl font-bold text-emerald-900 mb-2">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <div className="flex justify-center md:justify-start mb-4 text-amber-400 text-sm gap-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed italic">
                    {testimonials[activeTestimonial].feedback}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-amber-500 w-8' : 'bg-emerald-200 w-2 hover:bg-emerald-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto">
          <div className="bg-white md:rounded-3xl shadow-2xl overflow-hidden border-emerald-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-emerald-900 p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                {/* Decorative Islamic Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
                   <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                     <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.4C87.4,-33.7,90.1,-18.4,88.2,-3.6C86.3,11.2,79.8,25.5,71.3,37.8C62.8,50.1,52.3,60.4,40.3,67.6C28.3,74.8,14.8,78.9,0.5,78C-13.8,77.1,-27.1,71.2,-39.3,63.7C-51.5,56.2,-62.6,47.1,-70.4,35.6C-78.2,24.1,-82.7,10.2,-81.2,-3.2C-79.7,-16.6,-72.2,-29.5,-62.7,-40.3C-53.2,-51.1,-41.7,-59.8,-29.6,-68.1C-17.5,-76.4,-4.8,-84.3,4.5,-91.6C13.8,-98.9,19.7,-105.6,26.3,-108.4" transform="translate(100 100)" />
                   </svg>
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-6">Visit Our Center</h3>
                  <p className="text-emerald-200 mb-10 leading-relaxed">
                    We welcome you to Al-Hikmah Center. Feel free to visit us during opening hours or book an appointment in advance.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-amber-400 flex-shrink-0 mt-1">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Address</h4>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                          মাসকান্দা গনশার মোড়, চারতলা মাদরাসা সংলগ্ন<br/>
                          আনিস সাহেবের বাসা, Mymensingh
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-amber-400 flex-shrink-0 mt-1">
                        <FaPhoneAlt />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Phone</h4>
                        <p className="text-emerald-100 text-lg font-semibold">01723-501455</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-amber-400 flex-shrink-0 mt-1">
                        <FaClock />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Opening Hours</h4>
                        <p className="text-emerald-100 text-sm">
                          Sat - Thu: 10:00 AM - 8:00 PM<br/>
                          Friday: 3:00 PM - 8:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <a
                    href="https://maps.google.com/?q=Al+Hikmah+Ruqyah+Hijama+Center+Mymensingh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-amber-500 text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors flex items-center gap-2"
                    >
                      <FaMapMarkedAlt />
                      Get Directions
                    </motion.button>
                  </a>
                </div>
              </div>

              <div className="h-96 lg:h-auto relative bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.855877209562!2d91.8791373150061!3d24.897920984033445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750552a2e2a22ed%3A0xa6e3b7a92d5c4b5d!2sMymensingh%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1645781234567!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Homepage;