"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CMSContext } from '@/context/CMSContext';
import { Eye, EyeOff, LogOut, Plus, Trash2, UploadCloud, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { data, updateData, updateBrand, toggleVisibility, updateArrayItem, addArrayItem, removeArrayItem, logout, isAuthenticated, isMounted } = useContext(CMSContext);
  const router = useRouter();

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, isMounted, router]);

  if (!isMounted || !isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const SectionCard = ({ sectionKey, title, children, canHide = true }: { sectionKey: string, title: string, children: React.ReactNode, canHide?: boolean }) => (
    <div className="bg-white border border-[#1A1A1A] p-6 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b border-[#1A1A1A] pb-4">
        <h3 className="text-xl font-bold uppercase tracking-widest">{title}</h3>
        {canHide && (
          <button 
            onClick={() => toggleVisibility(sectionKey)}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#1A1A1A] text-sm font-medium hover:bg-[#1A1A1A] hover:text-[#F9F8F6] transition-colors"
          >
            {data[sectionKey].visible ? <><Eye size={16} /> Sembunyikan</> : <><EyeOff size={16} /> Tampilkan</>}
          </button>
        )}
      </div>
      {(!canHide || data[sectionKey].visible) ? children : <p className="text-gray-500 italic">Bagian ini disembunyikan dari publik.</p>}
    </div>
  );

  const FileUploader = ({ onUploadComplete, currentUrl }: { onUploadComplete: (url: string) => void, currentUrl: string }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      setUploading(true);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        
        if (res.ok && result.url) {
          onUploadComplete(result.url);
        } else {
          alert('Upload failed: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred during upload.');
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        {currentUrl && (
          <div className="w-full h-32 relative border border-[#1A1A1A] mb-2 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img src={currentUrl} alt="Preview" className="object-cover w-full h-full" />
          </div>
        )}
        <label className="flex items-center justify-center gap-2 px-4 py-3 border border-[#1A1A1A] bg-[#F9F8F6] hover:bg-gray-100 cursor-pointer transition-colors text-sm font-bold uppercase w-full">
          {uploading ? <><Loader2 className="animate-spin" size={16} /> Mengunggah...</> : <><UploadCloud size={16} /> {currentUrl ? 'Ganti Gambar' : 'Pilih Gambar'}</>}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
        <p className="text-xs text-gray-500 text-center">Atau isi URL manual di bawah:</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans pb-16">
      <header className="bg-[#F9F8F6] border-b border-[#1A1A1A] py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-widest uppercase">CMS DASHBOARD</h1>
          <div className="flex gap-4">
            <button onClick={() => window.open('/', '_blank')} className="px-4 py-2 border border-[#1A1A1A] text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">Lihat Website</button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-[#F9F8F6] text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-12 grid grid-cols-1 gap-8">
        
        {/* Brand/Logo Section */}
        <SectionCard sectionKey="brand" title="Merek / Logo Teks" canHide={false}>
          <div>
            <label className="block mb-2 font-bold text-sm uppercase">Nama Brand (Muncul di Pojok Kiri Atas)</label>
            <input type="text" className="w-full max-w-md p-3 border border-[#1A1A1A]" value={data.brand?.name || ''} onChange={(e) => updateBrand(e.target.value)} placeholder="Contoh: RIVERSIDE VILLA" />
          </div>
        </SectionCard>

        {/* Hero Section */}
        <SectionCard sectionKey="hero" title="Hero (Tentang)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest border-b pb-2">Bahasa Indonesia (ID)</h4>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.hero.title_id} onChange={(e) => updateData('hero', 'title_id', e.target.value)} placeholder="Judul" />
              <textarea className="w-full p-3 border border-[#1A1A1A]" rows={4} value={data.hero.description_id} onChange={(e) => updateData('hero', 'description_id', e.target.value)} placeholder="Deskripsi" />
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest border-b pb-2">English (EN)</h4>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.hero.title_en} onChange={(e) => updateData('hero', 'title_en', e.target.value)} placeholder="Title" />
              <textarea className="w-full p-3 border border-[#1A1A1A]" rows={4} value={data.hero.description_en} onChange={(e) => updateData('hero', 'description_en', e.target.value)} placeholder="Description" />
            </div>
          </div>
        </SectionCard>

        {/* Facilities Section */}
        <SectionCard sectionKey="facilities" title="Fasilitas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.facilities.title_id} onChange={(e) => updateData('facilities', 'title_id', e.target.value)} placeholder="Judul Bagian (ID)" />
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.facilities.title_en} onChange={(e) => updateData('facilities', 'title_en', e.target.value)} placeholder="Section Title (EN)" />
          </div>
          <div>
            {data.facilities.items.map((item: any, index: number) => (
              <div key={item.id} className="p-6 border border-[#1A1A1A] mb-4 bg-[#F9F8F6] relative group">
                <button onClick={() => removeArrayItem('facilities', item.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <h5 className="font-bold text-xs">Fasilitas {index + 1} (ID)</h5>
                       <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={item.name_id} onChange={(e) => updateArrayItem('facilities', item.id, 'name_id', e.target.value)} placeholder="Nama" />
                       <textarea className="w-full p-3 border border-[#1A1A1A]" rows={3} value={item.desc_id} onChange={(e) => updateArrayItem('facilities', item.id, 'desc_id', e.target.value)} placeholder="Deskripsi" />
                    </div>
                    <div className="space-y-4">
                       <h5 className="font-bold text-xs">Facility {index + 1} (EN)</h5>
                       <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={item.name_en} onChange={(e) => updateArrayItem('facilities', item.id, 'name_en', e.target.value)} placeholder="Name" />
                       <textarea className="w-full p-3 border border-[#1A1A1A]" rows={3} value={item.desc_en} onChange={(e) => updateArrayItem('facilities', item.id, 'desc_en', e.target.value)} placeholder="Description" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs mb-4">Gambar Fasilitas</h5>
                    <FileUploader currentUrl={item.img} onUploadComplete={(url) => updateArrayItem('facilities', item.id, 'img', url)} />
                    <input type="text" className="w-full p-2 mt-2 border border-[#1A1A1A] text-xs" value={item.img} onChange={(e) => updateArrayItem('facilities', item.id, 'img', e.target.value)} placeholder="/images/photo.png" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('facilities')} className="mt-4 flex items-center justify-center w-full gap-2 py-4 border-2 border-dashed border-[#1A1A1A] text-[#1A1A1A] font-bold uppercase hover:bg-gray-100 transition-colors">
              <Plus size={20} /> Tambah Fasilitas Baru
            </button>
          </div>
        </SectionCard>

        {/* Gallery Section */}
        <SectionCard sectionKey="gallery" title="Galeri Foto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.gallery.title_id} onChange={(e) => updateData('gallery', 'title_id', e.target.value)} placeholder="Judul Bagian (ID)" />
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.gallery.title_en} onChange={(e) => updateData('gallery', 'title_en', e.target.value)} placeholder="Section Title (EN)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.gallery.items.map((item: any, index: number) => (
              <div key={item.id} className="p-4 border border-[#1A1A1A] bg-[#F9F8F6] relative group flex flex-col">
                <button onClick={() => removeArrayItem('gallery', item.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Trash2 size={16} />
                </button>
                <FileUploader currentUrl={item.url} onUploadComplete={(url) => updateArrayItem('gallery', item.id, 'url', url)} />
                <input type="text" className="w-full p-2 mt-2 border border-[#1A1A1A] text-xs" value={item.url} onChange={(e) => updateArrayItem('gallery', item.id, 'url', e.target.value)} placeholder="/images/photo.png" />
              </div>
            ))}
          </div>
          <button onClick={() => addArrayItem('gallery')} className="mt-6 flex items-center justify-center w-full gap-2 py-4 border-2 border-dashed border-[#1A1A1A] text-[#1A1A1A] font-bold uppercase hover:bg-gray-100 transition-colors">
            <Plus size={20} /> Tambah Foto Galeri
          </button>
        </SectionCard>

        {/* Testimonials Section */}
        <SectionCard sectionKey="testimonials" title="Testimoni (Ulasan)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.testimonials.title_id} onChange={(e) => updateData('testimonials', 'title_id', e.target.value)} placeholder="Judul Bagian (ID)" />
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.testimonials.title_en} onChange={(e) => updateData('testimonials', 'title_en', e.target.value)} placeholder="Section Title (EN)" />
          </div>
          <div>
            {data.testimonials.items.map((item: any, index: number) => (
              <div key={item.id} className="p-6 border border-[#1A1A1A] mb-4 bg-[#F9F8F6] relative group">
                <button onClick={() => removeArrayItem('testimonials', item.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="mb-4">
                   <h5 className="font-bold text-xs mb-2 uppercase">Nama & Rating</h5>
                   <div className="flex gap-4">
                     <input type="text" className="flex-1 p-3 border border-[#1A1A1A]" value={item.name} onChange={(e) => updateArrayItem('testimonials', item.id, 'name', e.target.value)} placeholder="Nama Reviewer" />
                     <input type="number" min="1" max="5" className="w-24 p-3 border border-[#1A1A1A]" value={item.rating} onChange={(e) => updateArrayItem('testimonials', item.id, 'rating', parseInt(e.target.value))} placeholder="Bintang 1-5" />
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h5 className="font-bold text-xs">Ulasan (ID)</h5>
                     <textarea className="w-full p-3 border border-[#1A1A1A]" rows={2} value={item.review_id} onChange={(e) => updateArrayItem('testimonials', item.id, 'review_id', e.target.value)} placeholder="Teks Ulasan" />
                  </div>
                  <div className="space-y-4">
                     <h5 className="font-bold text-xs">Review (EN)</h5>
                     <textarea className="w-full p-3 border border-[#1A1A1A]" rows={2} value={item.review_en} onChange={(e) => updateArrayItem('testimonials', item.id, 'review_en', e.target.value)} placeholder="Review Text" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('testimonials')} className="mt-4 flex items-center justify-center w-full gap-2 py-4 border-2 border-dashed border-[#1A1A1A] text-[#1A1A1A] font-bold uppercase hover:bg-gray-100 transition-colors">
              <Plus size={20} /> Tambah Testimoni Baru
            </button>
          </div>
        </SectionCard>

        {/* FAQ Section */}
        <SectionCard sectionKey="faq" title="Tanya Jawab Umum (FAQ)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.faq.title_id} onChange={(e) => updateData('faq', 'title_id', e.target.value)} placeholder="Judul Bagian (ID)" />
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.faq.title_en} onChange={(e) => updateData('faq', 'title_en', e.target.value)} placeholder="Section Title (EN)" />
          </div>
          <div>
            {data.faq.items.map((item: any, index: number) => (
              <div key={item.id} className="p-6 border border-[#1A1A1A] mb-4 bg-[#F9F8F6] relative group">
                <button onClick={() => removeArrayItem('faq', item.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h5 className="font-bold text-xs">Tanya Jawab {index + 1} (ID)</h5>
                     <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={item.q_id} onChange={(e) => updateArrayItem('faq', item.id, 'q_id', e.target.value)} placeholder="Pertanyaan" />
                     <textarea className="w-full p-3 border border-[#1A1A1A]" rows={3} value={item.a_id} onChange={(e) => updateArrayItem('faq', item.id, 'a_id', e.target.value)} placeholder="Jawaban" />
                  </div>
                  <div className="space-y-4">
                     <h5 className="font-bold text-xs">Q&A {index + 1} (EN)</h5>
                     <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={item.q_en} onChange={(e) => updateArrayItem('faq', item.id, 'q_en', e.target.value)} placeholder="Question" />
                     <textarea className="w-full p-3 border border-[#1A1A1A]" rows={3} value={item.a_en} onChange={(e) => updateArrayItem('faq', item.id, 'a_en', e.target.value)} placeholder="Answer" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('faq')} className="mt-4 flex items-center justify-center w-full gap-2 py-4 border-2 border-dashed border-[#1A1A1A] text-[#1A1A1A] font-bold uppercase hover:bg-gray-100 transition-colors">
              <Plus size={20} /> Tambah FAQ Baru
            </button>
          </div>
        </SectionCard>

        {/* Pricing Section */}
        <SectionCard sectionKey="pricing" title="Harga">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.pricing.title_id} onChange={(e) => updateData('pricing', 'title_id', e.target.value)} placeholder="Judul ID" />
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.pricing.title_en} onChange={(e) => updateData('pricing', 'title_en', e.target.value)} placeholder="Title EN" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-bold text-sm uppercase">Weekday</label>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.pricing.weekday} onChange={(e) => updateData('pricing', 'weekday', e.target.value)} />
            </div>
            <div>
              <label className="block mb-2 font-bold text-sm uppercase">Weekend</label>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.pricing.weekend} onChange={(e) => updateData('pricing', 'weekend', e.target.value)} />
            </div>
            <div>
              <label className="block mb-2 font-bold text-sm uppercase">Holiday</label>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.pricing.holiday} onChange={(e) => updateData('pricing', 'holiday', e.target.value)} />
            </div>
          </div>
        </SectionCard>

        {/* Location Section */}
        <SectionCard sectionKey="location" title="Lokasi & Peta">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.location.title_id} onChange={(e) => updateData('location', 'title_id', e.target.value)} placeholder="Judul ID" />
            <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.location.title_en} onChange={(e) => updateData('location', 'title_en', e.target.value)} placeholder="Title EN" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <textarea className="w-full p-3 border border-[#1A1A1A]" rows={3} value={data.location.address_id} onChange={(e) => updateData('location', 'address_id', e.target.value)} placeholder="Alamat (ID)" />
            <textarea className="w-full p-3 border border-[#1A1A1A]" rows={3} value={data.location.address_en} onChange={(e) => updateData('location', 'address_en', e.target.value)} placeholder="Address (EN)" />
          </div>
          <label className="block mb-2 font-bold text-sm uppercase">Google Maps Embed URL</label>
          <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.location.mapUrl} onChange={(e) => updateData('location', 'mapUrl', e.target.value)} placeholder="https://www.google.com/maps/embed?..." />
        </SectionCard>

        {/* Booking Section */}
        <SectionCard sectionKey="booking" title="Pemesanan & Kontak">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-bold text-sm uppercase">Telepon/WA</label>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.booking.phone} onChange={(e) => updateData('booking', 'phone', e.target.value)} />
            </div>
            <div>
              <label className="block mb-2 font-bold text-sm uppercase">Email</label>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.booking.email} onChange={(e) => updateData('booking', 'email', e.target.value)} />
            </div>
            <div>
              <label className="block mb-2 font-bold text-sm uppercase">Instagram</label>
              <input type="text" className="w-full p-3 border border-[#1A1A1A]" value={data.booking.instagram} onChange={(e) => updateData('booking', 'instagram', e.target.value)} />
            </div>
          </div>
        </SectionCard>

      </main>
    </div>
  );
}
