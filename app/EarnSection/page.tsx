"use client";
import React, { useState } from 'react';
import { Share2, Copy, Check, Facebook, Linkedin } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface EarnSectionProps {
  points?: number;
  referrals?: number;
  setPoints?: React.Dispatch<React.SetStateAction<number>>;
}

const EarnSection = ({ points = 0, referrals = 0, setPoints }: EarnSectionProps) => {
  const [copied, setCopied] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const referralLink = "https://app.flowvahub.com/signup/?ref=ademo7544";

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDailyLogin = async () => {
    if (isCheckingIn) return;
    setIsCheckingIn(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please log in to claim points");
        return;
      }

      const currentPoints = points ?? 0;
      const newPoints = currentPoints + 10;

      const { error } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', user.id);

      if (error) throw error;

      if (setPoints) {
        setPoints(newPoints);
      }
      
      alert("Success! +10 points added.");
    } catch (err: any) {
      console.error("Update failed:", err.message);
      alert("Error: " + err.message);
    } finally {
      setIsCheckingIn(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. POINTS BALANCE DISPLAY */}
      <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            ⭐
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] font-black text-gray-400">Total Points Balance</p>
            <p className="text-3xl font-black text-gray-900">
              {(points ?? 0).toLocaleString()} <span className="text-lg font-bold text-gray-400">pts</span>
            </p>
          </div>
        </div>
        <div className="hidden md:block">
           <button className="px-5 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 transition-colors">
             View History
           </button>
        </div>
      </div>

      {/* 2. ONBOARDING NOTICE */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
          Earn points, unlock rewards, and celebrate your progress! To qualify, users must complete onboarding.
        </p>
      </div>

      {/* 3. ACTIVITY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={handleDailyLogin}
          className={`p-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between transition-all cursor-pointer shadow-sm ${isCheckingIn ? 'opacity-50 grayscale' : 'hover:border-purple-200'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F9F8FF] rounded-xl flex items-center justify-center text-2xl">📅</div>
            <div>
              <h4 className="font-bold text-gray-800">Daily Login</h4>
              <p className="text-[11px] text-gray-400 font-medium">
                {isCheckingIn ? 'Processing...' : 'Login daily to earn points.'}
              </p>
            </div>
          </div>
          <div className="text-purple-600 font-bold text-sm">+10 pts</div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-purple-200 transition-all cursor-pointer shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F9F8FF] rounded-xl flex items-center justify-center text-2xl">👤</div>
            <div>
              <h4 className="font-bold text-gray-800">Complete Profile</h4>
              <p className="text-[11px] text-gray-400 font-medium">Fill out your complete profile to qualify.</p>
            </div>
          </div>
          <div className="text-purple-600 font-bold text-sm">+50 pts</div>
        </div>
      </div>

      {/* 4. REFER & EARN SECTION */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 bg-purple-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Refer & Earn</h2>
      </div>

      <div className="bg-[#F4F2FF] rounded-[32px] p-10 border border-purple-50 shadow-sm">
        <div className="flex items-start gap-4 mb-12">
          <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm border border-purple-50">
            <Share2 size={24} />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-gray-900">Share Your Link</h3>
            <p className="text-[14px] text-gray-400 font-medium mt-1">Invite friends and earn 25 points when they join!</p>
          </div>
        </div>

        <div className="flex justify-center gap-32 mb-12 border-b border-purple-100 pb-12">
          <div className="text-center">
            <p className="text-[56px] font-bold text-gray-900">{(referrals ?? 0).toLocaleString()}</p>
            <p className="text-[12px] font-bold text-gray-400 mt-2 uppercase">Referrals</p>
          </div>
          <div className="text-center">
            <p className="text-[56px] font-bold text-gray-900">{(points ?? 0).toLocaleString()}</p>
            <p className="text-[12px] font-bold text-gray-400 mt-2 uppercase">Points Earned</p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
          <p className="text-[13px] font-bold text-gray-400 mb-4">Your personal referral link:</p>
          <div className="flex gap-3 mb-10">
            <div className="flex-1 bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl text-gray-400 text-[13px] truncate font-medium">
              {referralLink}
            </div>
            <button onClick={handleCopy} className="p-4 border border-gray-200 rounded-2xl text-purple-600 hover:bg-gray-50 shadow-sm transition-all active:scale-95">
              {copied ? <Check size={22} className="text-green-500" /> : <Copy size={22} />}
            </button>
          </div>
          
          <div className="flex justify-center gap-5">
            <div className="w-11 h-11 bg-[#1877F2] rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90">
              <Facebook size={20} fill="white" className="text-white"/>
            </div>
            <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90 text-white font-bold text-lg">𝕏</div>
            <div className="w-11 h-11 bg-[#0A66C2] rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90">
              <Linkedin size={20} fill="white" className="text-white"/>
            </div>
            <div className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90 text-white font-bold text-xl">📱</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnSection;