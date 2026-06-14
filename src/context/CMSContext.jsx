"use client";

import React, { createContext, useState, useEffect } from 'react';

const defaultData = {
    brand: {
        name: 'RIVERSIDE VILLA'
    },
    hero: {
        visible: true,
        title_id: 'Ketenangan di Tepi Sungai',
        title_en: 'Tranquility by the River',
        description_id: 'Riverside Villa menawarkan pengalaman menginap yang eksklusif dengan suasana alam yang menenangkan. Didesain dengan arsitektur modern minimalis, villa ini adalah tempat peristirahatan sempurna dari hiruk-pikuk perkotaan.',
        description_en: 'Riverside Villa offers an exclusive stay experience with a calming natural atmosphere. Designed with modern minimalist architecture, this villa is the perfect retreat from the hustle and bustle of the city.',
    },
    facilities: {
        visible: true,
        title_id: 'Fasilitas',
        title_en: 'Facilities',
        items: [
            { id: 1, name_id: 'Kamar Tidur Utama', name_en: 'Master Bedroom', desc_id: 'Kamar tidur luas dengan tempat tidur king-size dan pemandangan sungai.', desc_en: 'Spacious bedroom with a king-size bed and river view.', img: '/images/bedroom.png' },
            { id: 2, name_id: 'Kolam Renang Pribadi', name_en: 'Private Pool', desc_id: 'Kolam renang luar ruangan yang menyatu dengan keindahan alam sekitar.', desc_en: 'Outdoor swimming pool that blends with the surrounding natural beauty.', img: '/images/pool.png' },
            { id: 3, name_id: 'Area Bersantai', name_en: 'Lounge Area', desc_id: 'Ruang keluarga dengan sofa nyaman dan sistem hiburan terintegrasi.', desc_en: 'Family room with comfortable sofas and integrated entertainment system.', img: '/images/lounge.png' }
        ]
    },
    gallery: {
        visible: true,
        title_id: 'Galeri Kami',
        title_en: 'Our Gallery',
        items: [
            { id: 1, url: '/images/hero.png' },
            { id: 2, url: '/images/bedroom.png' },
            { id: 3, url: '/images/pool.png' },
            { id: 4, url: '/images/lounge.png' }
        ]
    },
    pricing: {
        visible: true,
        title_id: 'Daftar Harga',
        title_en: 'Pricing',
        weekday: 'Rp 1.500.000',
        weekend: 'Rp 2.200.000',
        holiday: 'Rp 3.000.000'
    },
    location: {
        visible: true,
        title_id: 'Lokasi',
        title_en: 'Location',
        address_id: 'Jl. Tepi Sungai No. 123, Kabupaten Asri, Provinsi Damai. Hanya 45 menit dari pusat kota dan mudah diakses menggunakan kendaraan pribadi.',
        address_en: '123 Riverside St, Asri Regency, Damai Province. Only 45 minutes from the city center and easily accessible by private vehicle.',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126300.99912690987!2d115.19799635032045!3d-8.490516644026362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d739f213421%3A0x64fbfbb88469c849!2sUbud%2C%20Gianyar%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid'
    },
    testimonials: {
        visible: true,
        title_id: 'Kata Mereka',
        title_en: 'Testimonials',
        items: [
            { id: 1, name: 'Budi Santoso', review_id: 'Tempat yang sangat tenang dan indah. Sangat direkomendasikan untuk liburan keluarga.', review_en: 'Very peaceful and beautiful place. Highly recommended for a family vacation.', rating: 5 },
            { id: 2, name: 'Sarah Johnson', review_id: 'Desain minimalisnya memukau. Pelayanan sangat ramah dan memuaskan.', review_en: 'The minimalist design is stunning. The service is very friendly and satisfying.', rating: 5 },
            { id: 3, name: 'Andi Pratama', review_id: 'Pengalaman menginap yang tak terlupakan. Pemandangan sungai di pagi hari luar biasa.', review_en: 'An unforgettable stay experience. The river view in the morning is extraordinary.', rating: 5 }
        ]
    },
    faq: {
        visible: true,
        title_id: 'Tanya Jawab Umum',
        title_en: 'Frequently Asked Questions',
        items: [
            { id: 1, q_id: 'Berapa kapasitas maksimal tamu?', q_en: 'What is the maximum guest capacity?', a_id: 'Kapasitas standar adalah 4 orang dewasa. Tambahan tamu dikenakan biaya ekstra.', a_en: 'Standard capacity is 4 adults. Additional guests are subject to an extra charge.' },
            { id: 2, q_id: 'Apakah diperbolehkan membawa hewan peliharaan?', q_en: 'Are pets allowed?', a_id: 'Mohon maaf, demi kenyamanan bersama kami tidak mengizinkan hewan peliharaan.', a_en: 'We apologize, for the comfort of all guests we do not allow pets.' },
            { id: 3, q_id: 'Bagaimana kebijakan pembatalan (refund)?', q_en: 'What is the cancellation (refund) policy?', a_id: 'Pembatalan maksimal H-7 sebelum kedatangan akan dikembalikan 100%. Melewati itu, DP tidak dapat dikembalikan.', a_en: 'Cancellations made up to 7 days before arrival will be refunded 100%. After that, the deposit is non-refundable.' }
        ]
    },
    booking: {
        visible: true,
        title_id: 'Pemesanan & Kontak',
        title_en: 'Booking & Contact',
        phone: '+62 812 3456 7890',
        email: 'info@riversidevilla.com',
        instagram: '@riverside.villa'
    }
};

export const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [lang, setLang] = useState('id'); 

    useEffect(() => {
        setIsMounted(true);
        const savedData = localStorage.getItem('riversideCMS_v3'); 
        if (savedData) {
            setData(JSON.parse(savedData));
        } else {
            localStorage.setItem('riversideCMS_v3', JSON.stringify(defaultData));
        }
        
        const auth = localStorage.getItem('riversideAdminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }

        const savedLang = localStorage.getItem('riversideLang');
        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('riversideCMS_v3', JSON.stringify(data));
        }
    }, [data, isMounted]);

    const changeLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem('riversideLang', newLang);
    };

    const updateData = (section, key, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const updateBrand = (value) => {
        setData(prev => ({
            ...prev,
            brand: { name: value }
        }));
    };

    const toggleVisibility = (section) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                visible: !prev[section].visible
            }
        }));
    };

    const updateArrayItem = (section, id, key, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                items: prev[section].items.map(item => 
                    item.id === id ? { ...item, [key]: value } : item
                )
            }
        }));
    };

    const addArrayItem = (section) => {
        setData(prev => {
            const newItemId = Date.now(); // unique ID
            let newItem = { id: newItemId };
            
            if (section === 'facilities') {
                newItem = { id: newItemId, name_id: '', name_en: '', desc_id: '', desc_en: '', img: '' };
            } else if (section === 'faq') {
                newItem = { id: newItemId, q_id: '', q_en: '', a_id: '', a_en: '' };
            } else if (section === 'testimonials') {
                newItem = { id: newItemId, name: '', review_id: '', review_en: '', rating: 5 };
            } else if (section === 'gallery') {
                newItem = { id: newItemId, url: '' };
            }

            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    items: [...prev[section].items, newItem]
                }
            };
        });
    };

    const removeArrayItem = (section, id) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                items: prev[section].items.filter(item => item.id !== id)
            }
        }));
    };

    const login = (username, password) => {
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            localStorage.setItem('riversideAdminAuth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('riversideAdminAuth');
    };

    return (
        <CMSContext.Provider value={{ 
            data, 
            updateData, 
            updateBrand,
            toggleVisibility, 
            updateArrayItem,
            addArrayItem,
            removeArrayItem,
            isAuthenticated, 
            login, 
            logout,
            isMounted,
            lang,
            changeLanguage
        }}>
            {children}
        </CMSContext.Provider>
    );
};
