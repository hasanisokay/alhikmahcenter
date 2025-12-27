'use client'
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
  FaStar
} from 'react-icons/fa';
import { GiHealing } from 'react-icons/gi';

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
      description: "Quranic healing through authentic ruqyah methods for spiritual and physical ailments",
      link: "https://ruqyahbd.org/blog"
    },
    {
      icon: <FaHeartbeat className="w-12 h-12" />,
      title: "Hijama Therapy",
      description: "Traditional wet cupping therapy for detoxification and healing various conditions",
      link: "#"
    },
    {
      icon: <FaStethoscope className="w-12 h-12" />,
      title: "Self Diagnosis",
      description: "Take our online test to understand if you need ruqyah treatment",
      link: "https://test.ruqyahbd.org/bn"
    },
    {
      icon: <FaUserMd className="w-12 h-12" />,
      title: "Expert Consultation",
      description: "One-on-one sessions with experienced ruqyah practitioners",
      link: "/book-appointment"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-800/90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 z-0"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Al Hikmah Ruqyah & Hijama Center
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-emerald-100 mb-8">
              আল হিকমাহ রুকইয়াহ এন্ড হিজামা সেন্টার
            </h2>
            <p className="text-xl text-emerald-50 mb-10 max-w-3xl mx-auto">
              Authentic Quranic healing and traditional hijama therapy for spiritual and physical well-being
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/book-appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Book Appointment Now
                </motion.button>
              </Link>
              <a href="tel:01723501455">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  <FaPhoneAlt className="inline mr-2" />
                  01723-501455
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Animated decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-64 h-64 border-2 border-emerald-300/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-40 h-40 border-2 border-teal-300/20 rounded-full"
        />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive healing services based on authentic Islamic practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100"
              >
                <div className="text-emerald-700 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  target={service.link.startsWith('http') ? '_blank' : '_self'}
                  className="inline-flex items-center text-emerald-700 font-semibold hover:text-emerald-900 transition-colors"
                >
                  Learn More <FaArrowRight className="ml-2" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Our Center
            </h2>
            <div className="w-24 h-1 bg-emerald-300 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="w-6 h-6 text-emerald-300 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Address</h3>
                  <p className="text-emerald-100">
                    মাসকান্দা গনশার মোড়, চারতলা মাদরাসা সংলগ্ন<br />
                    আনিস সাহেবের বাসা, Mymensingh, Bangladesh 01723
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaPhoneAlt className="w-6 h-6 text-emerald-300 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Contact</h3>
                  <p className="text-emerald-100">01723-501455</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaClock className="w-6 h-6 text-emerald-300 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
                  <p className="text-emerald-100">
                    Saturday - Thursday: 9:00 AM - 9:00 PM<br />
                    Friday: 3:00 PM - 9:00 PM
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Al+Hikmah+Ruqyah+Hijama+Center+Mymensingh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-900 px-6 py-3 rounded-full font-bold flex items-center"
                >
                  <FaMapMarkedAlt className="mr-2" />
                  Get Directions on Google Maps
                </motion.button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl h-96"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.855877209562!2d91.8791373150061!3d24.897920984033445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750552a2e2a22ed%3A0xa6e3b7a92d5c4b5d!2sMymensingh%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1645781234567!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Ruqyah Resources & Blog
            </h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn more about authentic ruqyah practices and healing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-4 mb-6">
              <FaBookOpen className="w-10 h-10 text-emerald-700" />
              <div>
                <h3 className="text-2xl font-bold text-emerald-900">
                  Educational Resources
                </h3>
                <p className="text-emerald-700">
                  Visit our official blog for authentic ruqyah information
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-8 text-lg">
              Access comprehensive articles, research, and authentic information about 
              Ruqyah Shar'iyyah, Hijama therapy, and spiritual healing based on Quran 
              and Sunnah.
            </p>
            
            <a
              href="https://ruqyahbd.org/blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-700 text-white px-8 py-3 rounded-full font-bold flex items-center mx-auto"
              >
                Visit Ruqyah Blog <FaArrowRight className="ml-2" />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Patient Experiences
            </h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-emerald-900">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <div className="flex text-amber-500">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "{testimonials[activeTestimonial].feedback}"
              </p>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial
                      ? 'bg-emerald-700 w-8'
                      : 'bg-emerald-300 hover:bg-emerald-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Spiritual Healing?
          </h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">
            Begin your journey to recovery with authentic Islamic healing practices
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/book-appointment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-900 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Book Appointment Now
              </motion.button>
            </Link>
            
            <a href="https://test.ruqyahbd.org/bn" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                <FaStethoscope className="inline mr-2" />
                Self Diagnosis Test
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 left-1/4 text-white/20"
        >
          <GiHealing className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          className="absolute top-10 right-1/4 text-white/20"
        >
          <FaHandsHelping className="w-24 h-24" />
        </motion.div>
      </section>
    </div>
  );
};

export default Homepage;