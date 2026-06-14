"use client";

import React, { useContext, useEffect, useState } from 'react';
import { CMSContext } from '@/context/CMSContext';
import Image from 'next/image';
import { MapPin, Phone, Mail, Star, ChevronDown, ChevronUp, X, MessageCircle } from 'lucide-react';

export default function Home() {
  const { data, lang, changeLanguage, isMounted } = useContext(CMSContext);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null; // Prevent hydration mismatch

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getT = (obj: any, key: string) => {
    return obj[`${key}_${lang}`] || obj[key];
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-[#F9F8F6]">
      
      {/* Floating WA Button (Neutral Color) */}
      <a 
        href={`https://wa.me/${data.booking.phone.replace(/[^0-9]/g, '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#F9F8F6] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-white/20"
      >
        <MessageCircle size={28} />
      </a>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={40} strokeWidth={1} />
          </button>
          <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image src={lightboxImg} alt="Gallery" fill className="object-contain" />
          </div>
        </div>
      )}

      {/* Ultra Premium Navbar */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-700 ${scrolled ? 'bg-[#F9F8F6]/95 backdrop-blur-xl py-3 md:py-5 shadow-sm' : 'bg-[#F9F8F6]/80 backdrop-blur-md py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <h1 className="text-lg md:text-xl font-bold tracking-[0.25em] uppercase text-[#1A1A1A] text-center">{data.brand?.name || 'RIVERSIDE VILLA'}</h1>
          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 list-none">
              {data.hero.visible && <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity">{lang === 'id' ? 'Tentang' : 'About'}</a></li>}
              {data.facilities.visible && <li><a href="#facilities" onClick={(e) => { e.preventDefault(); scrollToSection('facilities'); }} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity">{lang === 'id' ? 'Fasilitas' : 'Facilities'}</a></li>}
              {data.gallery.visible && <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity">{lang === 'id' ? 'Galeri' : 'Gallery'}</a></li>}
              {data.pricing.visible && <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity">{lang === 'id' ? 'Harga' : 'Pricing'}</a></li>}
              {data.booking.visible && <li><a href="#booking" onClick={(e) => { e.preventDefault(); scrollToSection('booking'); }} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity">{lang === 'id' ? 'Pemesanan' : 'Booking'}</a></li>}
            </ul>
            {/* Elegant Language Switcher */}
            <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#1A1A1A]">
              <button onClick={() => changeLanguage('id')} className={`transition-all ${lang === 'id' ? 'opacity-100 border-b border-[#1A1A1A] pb-0.5' : 'opacity-40 hover:opacity-100'}`}>ID</button>
              <span className="opacity-20">|</span>
              <button onClick={() => changeLanguage('en')} className={`transition-all ${lang === 'en' ? 'opacity-100 border-b border-[#1A1A1A] pb-0.5' : 'opacity-40 hover:opacity-100'}`}>EN</button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Immersive Cinematic Hero Section */}
        {data.hero.visible && (
          <section id="about" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/hero.png" 
                alt="Riverside Villa" 
                fill 
                className="object-cover scale-105 animate-[kenburns_20s_ease-out_infinite_alternate] opacity-50" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-transparent to-transparent opacity-90"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center mt-12">
              <span className="text-[#F9F8F6]/80 tracking-[0.4em] text-xs uppercase font-bold mb-8">
                {lang === 'id' ? 'Selamat Datang Di' : 'Welcome To'}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide mb-6 md:mb-8 leading-tight text-[#F9F8F6] drop-shadow-lg px-2">
                {getT(data.hero, 'title')}
              </h2>
              <div className="w-12 h-[1px] bg-[#F9F8F6]/50 mb-8"></div>
              <p className="text-lg md:text-xl text-[#F9F8F6]/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
                {getT(data.hero, 'description')}
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[#1A1A1A] opacity-60 animate-pulse">
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Scroll</span>
              <div className="w-[1px] h-12 bg-[#1A1A1A]"></div>
            </div>
          </section>
        )}

        {/* Facilities Section */}
        {data.facilities.visible && (
          <section id="facilities" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-gray-500">Luxury Amenities</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide">{getT(data.facilities, 'title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {data.facilities.items.map((item: any) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-sm mb-6 aspect-[4/3] bg-gray-200 relative">
                    {item.img && (
                      <Image src={item.img} alt={getT(item, 'name')} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-wide">{getT(item, 'name')}</h3>
                  <p className="text-gray-600 leading-relaxed">{getT(item, 'desc')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {data.gallery.visible && (
          <section id="gallery" className="py-24 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-wide">{getT(data.gallery, 'title')}</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar">
                {data.gallery.items.map((item: any) => (
                  <div key={item.id} className="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[28vw] aspect-[4/5] sm:aspect-square overflow-hidden cursor-pointer group snap-center" onClick={() => setLightboxImg(item.url)}>
                    <Image src={item.url} alt="Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-medium uppercase tracking-widest text-sm transition-opacity">Zoom</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {data.testimonials.visible && (
          <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide">{getT(data.testimonials, 'title')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.testimonials.items.map((item: any) => (
                <div key={item.id} className="p-8 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 flex flex-col justify-between">
                  <div>
                    <div className="flex text-yellow-500 mb-4">
                      {[...Array(item.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-700 italic leading-relaxed mb-6">"{getT(item, 'review')}"</p>
                  </div>
                  <strong className="text-[#1A1A1A] font-bold uppercase tracking-wider text-sm">- {item.name}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing */}
        {data.pricing.visible && (
          <section id="pricing" className="py-24 bg-[#1A1A1A] text-[#F9F8F6]">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-wide">{getT(data.pricing, 'title')}</h2>
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-8 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-center md:text-left">
                  <span className="text-base md:text-lg font-medium text-gray-300 mb-2 md:mb-0">Senin - Kamis (Weekday)</span>
                  <span className="text-xl md:text-2xl font-bold">{data.pricing.weekday}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-8 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-center md:text-left">
                  <span className="text-base md:text-lg font-medium text-gray-300 mb-2 md:mb-0">Jumat - Minggu (Weekend)</span>
                  <span className="text-xl md:text-2xl font-bold">{data.pricing.weekend}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-8 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-center md:text-left">
                  <span className="text-base md:text-lg font-medium text-gray-300 mb-2 md:mb-0">{lang === 'id' ? 'Hari Libur Nasional' : 'National Holidays'}</span>
                  <span className="text-xl md:text-2xl font-bold">{data.pricing.holiday}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Location & Booking */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Location & Map */}
            {data.location.visible && (
              <div>
                <h2 className="text-3xl font-bold tracking-wide mb-8">{getT(data.location, 'title')}</h2>
                <div className="flex items-start gap-4 text-gray-700 mb-8">
                  <MapPin className="shrink-0 mt-1" size={24} />
                  <p className="text-lg leading-relaxed">{getT(data.location, 'address')}</p>
                </div>
                <div className="w-full h-64 md:h-80 bg-gray-200 border border-gray-300">
                  <iframe 
                    src={data.location.mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Booking & FAQ */}
            <div className="space-y-16">
              {data.booking.visible && (
                <div id="booking">
                  <h2 className="text-3xl font-bold tracking-wide mb-8">{getT(data.booking, 'title')}</h2>
                  <div className="bg-white border border-[#1A1A1A] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <ul className="text-gray-700 space-y-4 mb-8">
                      <li className="flex items-center gap-4 group">
                        <div className="w-10 h-10 border border-[#1A1A1A] rounded-full flex items-center justify-center"><Phone size={18} /></div>
                        <strong className="text-lg">{data.booking.phone}</strong>
                      </li>
                      <li className="flex items-center gap-4 group">
                        <div className="w-10 h-10 border border-[#1A1A1A] rounded-full flex items-center justify-center"><Mail size={18} /></div>
                        <span className="text-lg">{data.booking.email}</span>
                      </li>
                      <li className="flex items-center gap-4 group">
                        <div className="w-10 h-10 border border-[#1A1A1A] rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                          </svg>
                        </div>
                        <span className="text-lg">{data.booking.instagram}</span>
                      </li>
                    </ul>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-bold uppercase tracking-widest mb-4 text-sm">{lang === 'id' ? 'Cek Ketersediaan' : 'Check Availability'}</h3>
                      <div className="flex flex-col gap-3">
                        <input type="date" className="w-full p-3 border border-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
                        <button className="w-full py-3 bg-[#1A1A1A] text-[#F9F8F6] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                          {lang === 'id' ? 'Kirim Permintaan' : 'Send Request'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Accordion */}
              {data.faq.visible && (
                <div>
                  <h3 className="text-2xl font-bold tracking-wide mb-6">{getT(data.faq, 'title')}</h3>
                  <div className="space-y-4">
                    {data.faq.items.map((item: any) => (
                      <div key={item.id} className="border border-[#1A1A1A] bg-white">
                        <button 
                          className="w-full flex justify-between items-center p-4 text-left font-bold"
                          onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                        >
                          {getT(item, 'q')}
                          {openFaq === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {openFaq === item.id && (
                          <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                            {getT(item, 'a')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      <footer className="bg-[#1A1A1A] text-[#F9F8F6] text-center py-12">
        <div className="max-w-5xl mx-auto px-4 text-xs uppercase tracking-[0.2em] opacity-60 flex flex-col items-center gap-4">
          <p>&copy; 2026 Riverside Villa. {lang === 'id' ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.'}</p>
          <p className="text-[10px] tracking-[0.3em] opacity-80">
            {lang === 'id' ? 'Dirancang & Dikembangkan oleh' : 'Designed & Developed by'} <a href="https://portofolio-salman.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-gray-300 transition-colors">Salman</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
