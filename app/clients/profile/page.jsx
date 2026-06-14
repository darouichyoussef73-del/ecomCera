// import React from 'react'
// import Navbar from '../../components/navbar'
// const page = () => {
//   return (
//     <>
//     <Navbar/>
//      <main className="max-w-full  px-20 pb-24 pt-20 text-black ">
//         {/* Header */}
//         <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
//           <div>
//             <p className="text-sm text-[#8a8780] uppercase tracking-widest">
//               Account
//             </p>
//             <h1 className="font-serif text-5xl md:text-6xl mt-2">
//               My Profile
//             </h1>
//           </div>

//           <button className="px-6 py-3 rounded-full bg-[#0f0f10] text-white hover:bg-[#2a2a2c] transition">
//             Edit profile
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* LEFT */}
//           <section className="bg-white rounded-3xl p-8 lg:col-span-2 shadow-sm">
//             {/* Profile header */}
//             <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-8 border-b border-[#f0eadf]">
//               <div className="relative">
//                 <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#ece6dc] to-[#c9a772] flex items-center justify-center font-serif text-4xl">
//                   AM
//                 </div>

//                 <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#0f0f10] text-white text-sm">
//                   ✎
//                 </button>
//               </div>

//               <div>
//                 <h2 className="font-serif text-3xl">Amelia Morgan</h2>
//                 <p className="text-[#8a8780] mt-1">
//                   Member since March 2023 · Gold tier
//                 </p>

//                 <div className="flex gap-2 mt-3">
//                   <span className="px-4 py-2 rounded-full border bg-white text-sm">
//                     Verified
//                   </span>
//                   <span className="px-4 py-2 rounded-full border bg-white text-sm">
//                     ⭐ 4.9
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Personal info */}
//             <h3 className="font-serif text-xl mt-8 mb-4">
//               Personal information
//             </h3>

//             <div className="grid sm:grid-cols-2 gap-5 text-sm">
//               <div>
//                 <p className="text-[#8a8780] mb-1">Full name</p>
//                 <p className="font-medium">Amelia Morgan</p>
//               </div>

//               <div>
//                 <p className="text-[#8a8780] mb-1">Email</p>
//                 <p className="font-medium">amelia@lume.studio</p>
//               </div>

//               <div>
//                 <p className="text-[#8a8780] mb-1">Phone</p>
//                 <p className="font-medium">+1 (415) 555 — 0184</p>
//               </div>

//               <div>
//                 <p className="text-[#8a8780] mb-1">Address</p>
//                 <p className="font-medium">221B Baker Street, London</p>
//               </div>
//             </div>

//             {/* Orders */}
//             <h3 className="font-serif text-xl mt-10 mb-4">Recent orders</h3>

//             <div className="space-y-1">
//               {[
//                 {
//                   title: "Linen Throw — Sand",
//                   id: "#LM-1029",
//                   status: "Delivered",
//                   price: "$148",
//                   color: "#ece6dc",
//                 },
//                 {
//                   title: "Ceramic Vase Set",
//                   id: "#LM-1017",
//                   status: "In transit",
//                   price: "$92",
//                   color: "#d4cdbf",
//                 },
//                 {
//                   title: "Oak Side Table",
//                   id: "#LM-0998",
//                   status: "Delivered",
//                   price: "$420",
//                   color: "#bfb6a4",
//                 },
//               ].map((o) => (
//                 <div
//                   key={o.id}
//                   className="flex items-center justify-between py-4 border-b border-[#f0eadf]"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className="w-12 h-12 rounded-xl"
//                       style={{ backgroundColor: o.color }}
//                     />
//                     <div>
//                       <p className="font-medium">{o.title}</p>
//                       <p className="text-xs text-[#8a8780]">
//                         {o.id} · {o.status}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="font-medium">{o.price}</p>
//                 </div>
//               ))}
//             </div>

//             <a
//               href="/orders"
//               className="text-sm underline mt-4 inline-block"
//             >
//               View all orders →
//             </a>
//           </section>

//           {/* RIGHT */}
//           <aside className="space-y-6">
//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: "Orders", value: "24" },
//                 { label: "Spent", value: "$3.2k" },
//                 { label: "Wishlist", value: "12" },
//                 { label: "Points", value: "1.8k" },
//               ].map((s) => (
//                 <div
//                   key={s.label}
//                   className="bg-white rounded-3xl p-5 shadow-sm"
//                 >
//                   <p className="text-xs text-[#8a8780] uppercase tracking-widest">
//                     {s.label}
//                   </p>
//                   <p className="font-serif text-4xl mt-2">{s.value}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Shortcuts */}
//             <div className="bg-white rounded-3xl p-6 shadow-sm">
//               <h4 className="font-serif text-lg mb-4">
//                 Account shortcuts
//               </h4>

//               {[
//                 ["Addresses", "/addresses"],
//                 ["Settings", "/settings"],
//                 ["Notifications", "/notifications"],
//                 ["Payment methods", "#"],
//               ].map(([label, href]) => (
//                 <a
//                   key={label}
//                   href={href}
//                   className="flex justify-between py-3 text-sm border-b border-[#f0eadf] last:border-0"
//                 >
//                   <span>{label}</span>
//                   <span>→</span>
//                 </a>
//               ))}
//             </div>

//             {/* Security */}
//             <div className="bg-white rounded-3xl p-6 shadow-sm">
//               <h4 className="font-serif text-lg mb-2">Security</h4>
//               <p className="text-sm text-[#8a8780] mb-4">
//                 Two-factor authentication active.
//               </p>
//               <button className="w-full px-6 py-3 rounded-full border border-[#ddd6c9] hover:bg-white">
//                 Manage security
//               </button>
//             </div>

//             {/* Logout */}
//             <button className="w-full px-6 py-3 rounded-full border border-red-200 text-red-700 hover:bg-red-50">
//               Log out
//             </button>
//           </aside>
//         </div>
//       </main>
//     </>
//   )
// }

// export default page
'use client'
import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Heart,
  Clock,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Star,
  Award,
  Briefcase,
  Globe,
  Link as LinkIcon,
  User
} from 'lucide-react';

const page = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPayments: true,
    emailMarketing: false,
    pushOrders: true,
    pushPayments: false,
    pushUpdates: true
  });

  const [profile, setProfile] = useState({
    fullName: "Alexandra Mitchell",
    email: "alex.mitchell@company.com",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    joinDate: "March 15, 2022",
    bio: "Product designer and creative director with over 8 years of experience in digital design. Passionate about creating intuitive user experiences.",
    website: "https://alexmitchell.design",
    company: "Mitchell Design Studio",
    jobTitle: "Creative Director",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)"
  });

  const membershipLevel = "Platinum";
  const accountStatus = "Active";
  const coverImage = "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop";
  const avatarImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face";

  const stats = [
    { label: "Total Orders", value: "1,284", icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
    { label: "Total Payments", value: "$48,295", icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
    { label: "Wishlist Items", value: "24", icon: Heart, color: "bg-rose-50 text-rose-600" },
    { label: "Account Age", value: "2.3 Years", icon: Clock, color: "bg-violet-50 text-violet-600" }
  ];

  const recentActivity = [
    { action: "Updated profile picture", date: "2 hours ago", icon: Camera, color: "bg-blue-500" },
    { action: "Changed password", date: "3 days ago", icon: Lock, color: "bg-amber-500" },
    { action: "Updated billing address", date: "1 week ago", icon: MapPin, color: "bg-emerald-500" },
    { action: "Enabled two-factor auth", date: "2 weeks ago", icon: Shield, color: "bg-violet-500" }
  ];

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-lg font-semibold text-slate-900">Profile Settings</h1>
          </div>
          <div className="flex items-center gap-3">
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditMode(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Banner */}
        <div className="relative mb-24 sm:mb-28">
          <div className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm">
            <img 
              src={coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
          </div>
          
          {/* Profile Image */}
          <div className="absolute -bottom-16 sm:-bottom-20 left-4 sm:left-8">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                <img 
                  src={avatarImage} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100">
                <Camera className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Membership Badge */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Membership</p>
                <p className="text-sm font-bold text-slate-900">{membershipLevel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{profile.fullName}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {accountStatus}
                </span>
              </div>
              <p className="text-slate-500 flex items-center gap-2 flex-wrap">
                <Briefcase className="w-4 h-4" />
                {profile.jobTitle} at {profile.company}
                <span className="hidden sm:inline text-slate-300">|</span>
                <MapPin className="w-4 h-4 sm:ml-0" />
                {profile.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                <Globe className="w-4 h-4" />
                Website
              </a>
              <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                <LinkIcon className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'personal', label: 'Personal Info' },
            { id: 'security', label: 'Security' },
            { id: 'notifications', label: 'Notifications' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* About Card */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">About</h3>
                <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Mail className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Phone className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Address</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Member Since</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-5">
                  {recentActivity.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{activity.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="w-full mt-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Personal Info Section */}
        {activeSection === 'personal' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={profile.jobTitle}
                    onChange={(e) => setProfile({...profile, jobTitle: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    disabled={!editMode}
                    rows={2}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!editMode}
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
                    editMode 
                      ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                />
              </div>
            </div>

            {!editMode && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  Click "Edit Profile" to update your personal information.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>
                  <p className="text-sm text-slate-500">Update your password to keep your account secure</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button 
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                  Update Password
                </button>
                <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-50 rounded-xl">
                    <Shield className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Enabled
                  </span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </div>

            {/* Login Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Active Sessions</h3>
              <div className="space-y-4">
                {[
                  { device: "Chrome on MacOS", location: "San Francisco, CA", time: "Current session", current: true },
                  { device: "Safari on iPhone", location: "San Francisco, CA", time: "2 hours ago", current: false },
                  { device: "Firefox on Windows", location: "New York, NY", time: "3 days ago", current: false }
                ].map((session, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{session.device}</p>
                        <p className="text-xs text-slate-500">{session.location} · {session.time}</p>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Active</span>
                    ) : (
                      <button className="text-xs font-medium text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-full transition-colors">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
                <p className="text-sm text-slate-500">Manage how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Email Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'emailOrders', label: 'Order Updates', description: 'Receive emails about your order status changes' },
                    { key: 'emailPayments', label: 'Payment Confirmations', description: 'Get notified when payments are processed' },
                    { key: 'emailMarketing', label: 'Marketing & Promotions', description: 'Receive special offers and product updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                          notifications[item.key] ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Push Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'pushOrders', label: 'Order Updates', description: 'Push notifications for order status changes' },
                    { key: 'pushPayments', label: 'Payment Alerts', description: 'Get push alerts for payment activity' },
                    { key: 'pushUpdates', label: 'System Updates', description: 'Notifications about platform updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                          notifications[item.key] ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Save Preferences
              </button>
              <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                Reset to Default
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default page;