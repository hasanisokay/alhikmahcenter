import Link from 'next/link';
import React from 'react';
import { FaClock, FaMapMarkerAlt, FaPhoneAlt, FaFacebook } from 'react-icons/fa';

const Footer = () => {
      const logoUrl = "https://z-cdn-media.chatglm.cn/files/11340c41-c14d-4d40-b27e-96405245eb59.png?auth_key=1867069901-6c3c208bf75146208c06c4b9ce0f8810-0-51e1a8c31fb3d95788801b1ad9c15037";

    return (
        <footer className="bg-emerald-950 text-white pt-16 pb-8 border-t border-emerald-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded-full bg-white p-1" />
                            <div>
                                <h4 className="font-bold text-lg">AL-HIKMAH</h4>
                                <p className="text-xs text-emerald-400">Mymensingh</p>
                            </div>
                        </div>
                        <p className="text-emerald-300 text-sm leading-relaxed mb-4">
                            Your trusted partner in spiritual healing and holistic health through the wisdom of the Quran and Sunnah.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <Link href={'https://www.facebook.com/ruqyahcentermymensingh'} target='_blank' className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-emerald-900 cursor-pointer transition-colors"><FaFacebook /></Link>
                            {/* <div className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-emerald-900 cursor-pointer transition-colors">in</div>
                            <div className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-emerald-900 cursor-pointer transition-colors">yt</div> */}
                        </div>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-6 text-amber-400">Quick Links</h5>
                        <ul className="space-y-3 text-emerald-300 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Ruqyah Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-6 text-amber-400">Services</h5>
                        <ul className="space-y-3 text-emerald-300 text-sm">
                            <li><Link href="/book-appointment?service=Ruqyah" className="hover:text-white transition-colors">Ruqyah Shar'iyyah</Link></li>
                            <li><Link href="/book-appointment?service=Hijama" className="hover:text-white transition-colors">Hijama Therapy</Link></li>
                            <li><Link href="https://test.ruqyahbd.org/en" target='_blank' className="hover:text-white transition-colors">Self Diagnosis</Link></li>
                            <li><Link href="/appointment" className="hover:text-white transition-colors">Consultation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-6 text-amber-400">Contact</h5>
                        <ul className="space-y-4 text-emerald-300 text-sm">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-amber-500" />
                                <span>Mymensingh, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-amber-500" />
                                <span>01723-501455</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaClock className="text-amber-500" />
                                <span>Sat-Thu: 9am - 9pm</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-emerald-500 text-xs">
                        © 2025 Al-Hikmah Ruqyah & Hijama Center. All rights reserved.
                    </p>
                    <div className="text-emerald-500 text-xs flex gap-6">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;