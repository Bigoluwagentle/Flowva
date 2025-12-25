"use client";
import React, { useState, useEffect } from 'react';
import { Gift, Home, Compass, BookOpen, Layers, CreditCard, Settings, Bell, Menu, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import EarnSection from '@/app/EarnSection/page';
import RedeemSection from '@/app/RedeemSection/page';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const RewardsHub = () => {
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem'>('earn');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [points, setPoints] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('points, referral_count')
            .eq('id', user.id)
            .single();

          if (data) {
            setPoints(data.points || 0);
            setReferrals(data.referral_count || 0);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Compass, label: 'Discover' },
    { icon: BookOpen, label: 'Library' },
    { icon: Layers, label: 'Tech Stack' },
    { icon: CreditCard, label: 'Subscriptions' },
    { icon: Gift, label: 'Rewards Hub', active: true },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-100 bg-white flex flex-col shrink-0 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-purple-600">
               <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="24" r="7" stroke="currentColor" strokeWidth="3"/>
                  <circle cx="28" cy="24" r="7" stroke="currentColor" strokeWidth="3"/>
                  <path d="M19 24C19 24 20 21 20 21C20 21 21 24 21 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M7 18C7 18 10 13 20 13C30 13 33 18 33 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
               </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-purple-600">Flowva</span>
          </div>
          <button className="lg:hidden p-2" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                item.active 
                ? 'bg-[#F5F0FF] text-purple-600 font-bold' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} /> 
              <span className="text-[15px]">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-[#F5F0FF] text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">Ademola</p>
              <p className="text-[11px] text-gray-400 truncate font-medium">abdosheedabdmalikad...</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-auto bg-[#FAFAFA] w-full">
        <div className="max-w-6xl mx-auto p-4 md:p-10">
          
          <header className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4 lg:gap-0">
              {/* MOBILE HAMBURGER BUTTON */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600"
              >
                <Menu size={20} />
              </button>
              
              <div>
                <h1 className="text-[24px] md:text-[28px] font-bold text-gray-900 tracking-tight">Rewards Hub</h1>
                <p className="text-gray-500 text-xs md:text-sm mt-1 font-medium hidden sm:block">
                  Earn points, unlock rewards, and celebrate your progress!
                </p>
              </div>
            </div>
            
            <button className="p-3 bg-white border border-gray-100 rounded-full shadow-sm relative transition-hover hover:shadow-md">
              <Bell size={22} className="text-gray-600"/>
              <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </header>

          {/* TAB SYSTEM - Scrollable on very small screens */}
          <div className="flex gap-6 md:gap-10 mb-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('earn')} 
              className={`pb-4 px-1 text-sm font-bold transition-all whitespace-nowrap relative ${
                activeTab === 'earn' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Earn Points
              {activeTab === 'earn' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-purple-600 rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('redeem')} 
              className={`pb-4 px-1 text-sm font-bold transition-all whitespace-nowrap relative ${
                activeTab === 'redeem' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Redeem Rewards
              {activeTab === 'redeem' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-purple-600 rounded-full" />}
            </button>
          </div>

          {/* CONTENT SECTIONS */}
          <div className="animate-in fade-in duration-500">
            {activeTab === 'earn' ? (
              <EarnSection 
                points={points} 
                referrals={referrals} 
                setPoints={setPoints} 
              />
            ) : (
              <RedeemSection points={points} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RewardsHub;