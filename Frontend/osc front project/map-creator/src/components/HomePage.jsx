import React, { useState } from 'react';

const HomePage = ({ user, onNavigate, onLogout }) => {
  // اللغة الافتراضية هي الإنجليزية (en)
  const [lang, setLang] = useState('en');
  const isRtl = lang === 'ar';

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // بيانات توضيحية لكروت الخرائط
  const sampleMaps = [
    {
      id: 1,
      title: lang === 'ar' ? 'خريطة مبنى حاسبات' : 'CS Faculty Building',
      floors: 4,
      nodes: 120,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      title: lang === 'ar' ? 'المكتبة المركزية' : 'Central Library',
      floors: 2,
      nodes: 45,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      title: lang === 'ar' ? 'المبنى الإداري' : 'Admin Center',
      floors: 3,
      nodes: 80,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const content = {
    en: {
      slogan: "Draw a line and walk on it",
      heroTitle: "Interactive Map Generator",
      heroSubtitle: "Design and manage building maps, floor plans, and indoor navigation nodes effortlessly.",
      createBtn: "Create Map",
      viewBtn: "Explore Maps",
      loginBtn: "Login",
      logoutBtn: "Logout",
      navHome: "Home",
      navCreator: "Map Creator",
      navExplore: "Explore Maps",
      availableMaps: "Explore Available Maps",
      floorsCount: "Floors",
      nodesCount: "Nodes",
      openMap: "Open Map",
      footer: "All rights reserved © Map Generator",
    },
    ar: {
      slogan: "ارسم خط وامشي عليه",
      heroTitle: "مُولد ومُحرر الخرائط التفاعلي",
      heroSubtitle: "قم بإنشاء وتصميم خرائط المباني والطوابق والتنقل الداخلي بسهولة ودقة عالية.",
      createBtn: "إنشاء خريطة جديدة",
      viewBtn: "استعراض الخرائط",
      loginBtn: "تسجيل الدخول",
      logoutBtn: "تسجيل الخروج",
      navHome: "الرئيسية",
      navCreator: "منشئ الخرائط",
      navExplore: "الخرائط المتاحة",
      availableMaps: "استكشف الخرائط المتاحة",
      floorsCount: "طوابق",
      nodesCount: "عُقدة تنقل",
      openMap: "فتح الخريطة",
      footer: "جميع الحقوق محفوظة © Map Generator",
    },
  };

  const t = content[lang];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-lg">
        {/* Logo */}
        <div 
          onClick={() => onNavigate && onNavigate('home')} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-md shadow-blue-500/30">
            🗺️
          </div>
          <span className="font-extrabold text-lg tracking-wide text-white">
            Map<span className="text-blue-500">Gen</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => onNavigate && onNavigate('home')} className="hover:text-blue-400 transition">
            {t.navHome}
          </button>
          <button onClick={() => onNavigate && onNavigate('creator')} className="hover:text-blue-400 transition">
            {t.navCreator}
          </button>
          <button onClick={() => onNavigate && onNavigate('view')} className="hover:text-blue-400 transition">
            {t.navExplore}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            🌐 {lang === 'en' ? 'العربية' : 'English'}
          </button>

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition"
            >
              {t.logoutBtn}
            </button>
          ) : (
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-md shadow-blue-600/30 transition"
            >
              {t.loginBtn}
            </button>
          )}
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Slogan */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold tracking-wide shadow-sm">
             {t.slogan}
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          
          {/* Call to Actions */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button
              onClick={() => onNavigate && onNavigate('creator')}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition duration-200"
            >
              {t.createBtn}
            </button>
            <button
              onClick={() => onNavigate && onNavigate('view')}
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold rounded-xl transition duration-200"
            >
              {t.viewBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 3. Cards Section (Available Maps) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            {t.availableMaps}
          </h2>
          <button 
            onClick={() => onNavigate && onNavigate('view')}
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
          >
            {t.viewBtn} &rarr;
          </button>
        </div>

        {/* Map Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleMaps.map((map) => (
            <div 
              key={map.id} 
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl transition group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={map.image} 
                    alt={map.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{map.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/50">
                      🏢 {map.floors} {t.floorsCount}
                    </span>
                    <span className="bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/50">
                      📍 {map.nodes} {t.nodesCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onNavigate && onNavigate('view')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded-xl text-sm font-semibold transition duration-200"
                >
                  {t.openMap}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        {t.footer}
      </footer>
    </div>
  );
};

export default HomePage;