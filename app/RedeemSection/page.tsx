"use client";
import React, { useState } from 'react';

interface RedeemSectionProps {
  points?: number; 
}

const RedeemSection = ({ points = 0 }: RedeemSectionProps) => {
  const [filter, setFilter] = useState('All Rewards');
  
  const userBalance = points ?? 0; 

  const allRewards = [
    { id: 1, title: '$5 Bank Transfer', icon: '💵', desc: 'The $5 equivalent will be transferred to your bank account.', pts: 5000, status: 'Locked' },
    { id: 2, title: '$5 PayPal International', icon: '💳', desc: 'Receive a $5 PayPal balance transfer directly to your PayPal account email.', pts: 5000, status: 'Locked' },
    { id: 3, title: '$5 Virtual Visa Card', icon: '🎁', desc: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.', pts: 5000, status: 'Locked' },
    { id: 4, title: '$10 Amazon Gift Card', icon: '🛍️', pts: 10000, desc: 'Redeem your points for a $10 Amazon shopping voucher.', status: 'Locked' },
    { id: 5, title: 'Grand Prize Entry', icon: '🏆', pts: 50000, desc: 'Entry into our monthly $50 grand prize draw.', status: 'Coming Soon' },
  ];

  const counts = {
    'All Rewards': allRewards.length,
    'Unlocked': allRewards.filter(r => userBalance >= r.pts && r.status !== 'Coming Soon').length,
    'Locked': allRewards.filter(r => r.status === 'Locked' && userBalance < r.pts).length,
    'Coming Soon': allRewards.filter(r => r.status === 'Coming Soon').length
  };

  const filteredRewards = allRewards.filter(reward => {
    if (filter === 'All Rewards') return true;
    if (filter === 'Unlocked') return userBalance >= reward.pts && reward.status !== 'Coming Soon';
    if (filter === 'Locked') return reward.status === 'Locked' && userBalance < reward.pts;
    if (filter === 'Coming Soon') return reward.status === 'Coming Soon';
    return true;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      
      <div className="bg-[#F9F8FF] border border-purple-100 p-8 rounded-[2rem] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-purple-50">
            ⭐
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-gray-400 mb-1">Total Points Balance</p>
            <p className="text-4xl font-black text-gray-900 leading-none">
              {(userBalance ?? 0).toLocaleString()} <span className="text-xl font-bold text-gray-400 ml-1">pts</span>
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
           <div className="px-5 py-2.5 bg-white border border-purple-100 rounded-full text-purple-600 text-xs font-bold shadow-sm">
             Spend your points on rewards below!
           </div>
        </div>
      </div>

      <div className="border-l-4 border-purple-600 pl-4">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Redeem Your Points</h2>
      </div>

      <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto scrollbar-hide">
        {Object.entries(counts).map(([label, count]) => (
          <button 
            key={label} 
            onClick={() => setFilter(label)}
            className={`pb-4 flex items-center gap-2 text-sm font-bold whitespace-nowrap transition-all relative ${
              filter === label ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {label} 
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              filter === label ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {count}
            </span>
            {filter === label && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-purple-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredRewards.length > 0 ? (
          filteredRewards.map((reward) => (
            <div key={reward.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
              <div className="w-20 h-20 bg-[#F9F8FF] rounded-[1.5rem] flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {reward.icon}
              </div>
              
              <h3 className="text-[17px] font-bold text-gray-900 mb-2 px-2 leading-snug">
                {reward.title}
              </h3>
              
              <p className="text-[11.5px] text-gray-400 leading-relaxed mb-8 px-2 font-medium">
                {reward.desc}
              </p>
              
              <div className="flex items-center gap-2 text-purple-600 font-black mb-8 text-[15px]">
                 <span className="text-xl">⭐</span> {(reward.pts ?? 0).toLocaleString()} pts
              </div>
              
              <button 
                disabled={userBalance < reward.pts || reward.status === 'Coming Soon'}
                className={`w-full py-4 rounded-2xl font-black text-[13px] tracking-wide transition-all ${
                  reward.status === 'Coming Soon'
                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    : userBalance >= reward.pts
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {reward.status === 'Coming Soon' ? 'Coming Soon' : userBalance >= reward.pts ? 'Redeem Now' : 'Locked'}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">No rewards found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedeemSection;