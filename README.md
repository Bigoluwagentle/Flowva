🌟 Flowva Rewards Hub
A modern, high-performance Rewards and Referral dashboard built with Next.js 15, TypeScript, and Tailwind CSS, integrated with Supabase for real-time data management.

🚀 Features
Dynamic Points System: Real-time points tracking fetched from Supabase.

Daily Check-in: Functional "Daily Login" task that updates user points instantly.

Referral System: Personalized referral links with "Click-to-Copy" functionality.

Reward Redemption: A smart redemption store that automatically unlocks items based on the user's point balance.

Responsive Design: Fully optimized for mobile, tablet, and desktop views.

Interactive UI: Smooth transitions and animations using lucide-react and Tailwind CSS.

🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS

Backend/Database: Supabase

Icons: Lucide React

🏁 Getting Started
Follow these steps to get the project running locally on your machine.

1. Clone the Repository
Bash

git clone https://github.com/your-username/flowva-rewards-hub.git
cd flowva-rewards-hub
2. Install Dependencies
Bash

npm install
# or
yarn install
3. Environment Variables
Create a .env.local file in the root directory and add your Supabase credentials:

Code snippet

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Database Setup (Supabase)
To ensure the points system works, run the following SQL in your Supabase SQL Editor to create the profiles table:

SQL

create table profiles (
  id uuid references auth.users not null primary key,
  points integer default 0,
  referral_count integer default 0,
  updated_at timestamp with time zone
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policy to allow users to update their own points
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
5. Run the Development Server
Bash

npm run dev
Open http://localhost:3000 to view the application.

📁 Project Structure
Plaintext

├── app/
│   ├── EarnSection/     # Earn Points logic & Daily Tasks
│   ├── RedeemSection/   # Reward Store & Point checks
│   ├── RewardsHub/      # Main layout & Sidebar navigation
│   └── layout.tsx       # Global fonts and metadata
├── components/          # Reusable UI components
├── public/              # Static assets (logos, images)
└── lib/                 # Supabase client configuration
📝 Usage
Earning: Users click "Daily Login" to invoke a Supabase update call, incrementing points by 10.

Redeeming: The RedeemSection calculates if userBalance >= reward.pts. If true, the "Locked" state changes to an active "Redeem Now" button.

Sharing: The referral link uses the Clipboard API to allow users to share their unique ID.

🚢 Deployment
The easiest way to deploy this project is via Vercel:

Push your code to GitHub.

Import the project into Vercel.

Add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to the Environment Variables section in Vercel.

Click Deploy.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.