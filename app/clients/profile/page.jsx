
// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Camera,
//   Edit3,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Shield,
//   CheckCircle2,
//   ShoppingCart,
//   CreditCard,
//   Heart,
//   Clock,
//   Bell,
//   Lock,
//   Eye,
//   EyeOff,
//   Save,
//   X,
//   Star,
//   Award,
//   Briefcase,
//   Globe,
//   Link as LinkIcon,
//   User,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";
// import Link from "next/link";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// const page = () => {
//   const [activeSection, setActiveSection] = useState("overview");
//   const [editMode, setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     joinDate: "",
//     bio: "",
//     avatar: null,
//     cover: null,
//   });

//   const [notifications, setNotifications] = useState({
//     emailOrders: true,
//     emailPayments: true,
//     emailMarketing: false,
//     pushOrders: true,
//     pushPayments: false,
//     pushUpdates: true,
//   });

//   // Get user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (err) {
//         console.error('Failed to parse user data:', err);
//         setError('User session invalid. Please log in again.');
//         setLoading(false);
//       }
//     } else {
//       setError('Please log in to view your profile.');
//       setLoading(false);
//     }
//   }, []);

//   // Fetch profile data when user is available
//   useEffect(() => {
//     if (user?.id) {
//       fetchProfile();
//     }
//   }, [user]);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/admin/clients/${user.id}`, {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Session expired. Please log in again.');
//         }
//         if (response.status === 404) {
//           throw new Error('User profile not found.');
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Profile data:', data);

//       // Handle Laravel wrapped response
//       const userData = data.data || data;

//       setProfile({
//         fullName: userData.name || userData.full_name || userData.fullName || '',
//         email: userData.email || '',
//         phone: userData.phone || userData.phone_number || userData.mobile || '',
//         address: userData.address || userData.location || '',
//         joinDate: userData.created_at || userData.join_date || userData.member_since || '',
//         bio: userData.bio || userData.about || userData.description || '',
//         avatar: userData.avatar || userData.profile_image || userData.image || null,
//         cover: userData.cover || userData.cover_image || userData.banner || null,
//       });
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError(err.message || 'Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');

//       const response = await fetch(`${API_BASE_URL}/admin/clients/${user.id}`, {
//         method: 'PUT',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//         body: JSON.stringify({
//           name: profile.fullName,
//           email: profile.email,
//           phone: profile.phone,
//           address: profile.address,
//           bio: profile.bio,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       setEditMode(false);
//       fetchProfile(); // Refresh data
//     } catch (err) {
//       console.error('Update error:', err);
//       alert(err.message || 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updatePassword = async (currentPassword, newPassword, confirmPassword) => {
//     if (newPassword !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/admin/clients/${user.id}/password`, {
//         method: 'PUT',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//         body: JSON.stringify({
//           current_password: currentPassword,
//           password: newPassword,
//           password_confirmation: confirmPassword,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update password');
//       }

//       alert('Password updated successfully');
//     } catch (err) {
//       console.error('Password update error:', err);
//       alert(err.message || 'Failed to update password');
//     }
//   };

//   const handleSaveProfile = () => {
//     updateProfile();
//   };

//   const toggleNotification = (key) => {
//     setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // Format date for display
//   const formatDate = (dateStr) => {
//     if (!dateStr) return '-';
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return dateStr;
//     return date.toLocaleDateString('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   const membershipLevel = "Platinum";
//   const accountStatus = "Active";

//   // Dynamic images from API or fallback
//   const coverImage = profile.cover || "";
//   const avatarImage = profile.avatar || "";

//   const stats = [
//     {
//       label: "Total Orders",
//       value: "1,284",
//       icon: ShoppingCart,
//       color: "bg-blue-50 text-blue-600",
//     },
//     {
//       label: "Total Payments",
//       value: "$48,295",
//       icon: CreditCard,
//       color: "bg-emerald-50 text-emerald-600",
//     },
//     {
//       label: "Wishlist Items",
//       value: "24",
//       icon: Heart,
//       color: "bg-rose-50 text-rose-600",
//     },
//     {
//       label: "Account Age",
//       value: profile.joinDate ? formatDate(profile.joinDate) : '-',
//       icon: Clock,
//       color: "bg-violet-50 text-violet-600",
//     },
//   ];

//   // Loading state
//   if (loading && !profile.fullName) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//           <p className="text-slate-500 text-sm">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error / Not logged in state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm text-center max-w-md">
//           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-8 h-8 text-red-500" />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load profile</h3>
//           <p className="text-sm text-slate-500 mb-4">{error}</p>
//           <button
//             onClick={fetchProfile}
//             className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               href="/clients/home"
//               className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5 text-slate-600" />
//             </Link>
//             <h1 className="text-lg font-semibold text-slate-900">
//               Profile Settings
//             </h1>
//           </div>
//           <div className="flex items-center gap-3">
//             {!editMode ? (
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
//               >
//                 <Edit3 className="w-4 h-4" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setEditMode(false)}
//                   className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveProfile}
//                   disabled={loading}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
//                 >
//                   {loading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Save className="w-4 h-4" />
//                   )}
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Cover Banner */}
//         <div className="relative mb-24 sm:mb-28">
//           <div
//             className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm bg-cover bg-center"
//             style={{ backgroundImage: `url(${coverImage})` }}
//           >
//             <div className="absolute inset-0 bg-black/30" />
//           </div>

//           {/* Profile Image */}
//           <div className="absolute -bottom-16 sm:-bottom-20 left-4 sm:left-8">
//             <div className="relative">
//               <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
//                 <img
//                   src={avatarImage}
//                   alt="Profile avatar"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="absolute -right-2 -bottom-2 bg-white rounded-full p-2 shadow-sm border border-slate-200">
//                 <Camera className="w-4 h-4 text-slate-700" />
//               </div>
//             </div>
//           </div>

//           {/* Membership Badge */}
//           <div className="absolute right-4 bottom-4 sm:bottom-6">
//             <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-4 py-2 shadow-sm backdrop-blur">
//               <Award className="w-4 h-4 text-amber-500" />
//               <span className="text-sm font-medium text-slate-700">
//                 {membershipLevel} Member
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Profile Info Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3 mb-1">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
//                   {profile.fullName || 'Loading...'}
//                 </h2>
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
//                   <CheckCircle2 className="w-3.5 h-3.5" />
//                   {accountStatus}
//                 </span>
//               </div>
//               <p className="text-sm text-slate-500">{profile.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-8 overflow-x-auto">
//           {[
//             { id: "overview", label: "Overview" },
//             { id: "personal", label: "Personal Info" },
//             { id: "security", label: "Security" },
//             { id: "notifications", label: "Notifications" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveSection(tab.id)}
//               className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
//                 activeSection === tab.id
//                   ? "bg-white text-slate-900 shadow-sm"
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Overview Section */}
//         {activeSection === "overview" && (
//           <div className="space-y-6">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//               {stats.map((stat, index) => {
//                 const Icon = stat.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}
//                     >
//                       <Icon className="w-5 h-5" />
//                     </div>
//                     <p className="text-2xl font-bold text-slate-900">
//                       {stat.value}
//                     </p>
//                     <p className="text-sm text-slate-500 mt-0.5">
//                       {stat.label}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* About Card */}
//               <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
//                   About
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   {profile.bio || 'No bio added yet.'}
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 bg-slate-50 rounded-lg">
//                       <Mail className="w-4 h-4 text-slate-500" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
//                         Email
//                       </p>
//                       <p className="text-sm font-medium text-slate-900 mt-0.5">
//                         {profile.email || '-'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 bg-slate-50 rounded-lg">
//                       <Phone className="w-4 h-4 text-slate-500" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
//                         Phone
//                       </p>
//                       <p className="text-sm font-medium text-slate-900 mt-0.5">
//                         {profile.phone || '-'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 bg-slate-50 rounded-lg">
//                       <MapPin className="w-4 h-4 text-slate-500" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
//                         Address
//                       </p>
//                       <p className="text-sm font-medium text-slate-900 mt-0.5">
//                         {profile.address || '-'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 bg-slate-50 rounded-lg">
//                       <Calendar className="w-4 h-4 text-slate-500" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
//                         Member Since
//                       </p>
//                       <p className="text-sm font-medium text-slate-900 mt-0.5">
//                         {formatDate(profile.joinDate)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Personal Info Section */}
//         {activeSection === "personal" && (
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
//             <h3 className="text-lg font-semibold text-slate-900 mb-6">
//               Personal Information
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     type="text"
//                     value={profile.fullName}
//                     onChange={(e) =>
//                       setProfile({ ...profile, fullName: e.target.value })
//                     }
//                     disabled={!editMode}
//                     className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
//                       editMode
//                         ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
//                         : "border-slate-200 bg-slate-50 text-slate-600"
//                     }`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     type="email"
//                     value={profile.email}
//                     onChange={(e) =>
//                       setProfile({ ...profile, email: e.target.value })
//                     }
//                     disabled={!editMode}
//                     className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
//                       editMode
//                         ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
//                         : "border-slate-200 bg-slate-50 text-slate-600"
//                     }`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     type="tel"
//                     value={profile.phone}
//                     onChange={(e) =>
//                       setProfile({ ...profile, phone: e.target.value })
//                     }
//                     disabled={!editMode}
//                     className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
//                       editMode
//                         ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
//                         : "border-slate-200 bg-slate-50 text-slate-600"
//                     }`}
//                   />
//                 </div>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Address
//                 </label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
//                   <textarea
//                     value={profile.address}
//                     onChange={(e) =>
//                       setProfile({ ...profile, address: e.target.value })
//                     }
//                     disabled={!editMode}
//                     rows={2}
//                     className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
//                       editMode
//                         ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
//                         : "border-slate-200 bg-slate-50 text-slate-600"
//                     }`}
//                   />
//                 </div>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   value={profile.bio}
//                   onChange={(e) =>
//                     setProfile({ ...profile, bio: e.target.value })
//                   }
//                   disabled={!editMode}
//                   rows={4}
//                   className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
//                     editMode
//                       ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
//                       : "border-slate-200 bg-slate-50 text-slate-600"
//                   }`}
//                 />
//               </div>
//             </div>

//             {!editMode && (
//               <div className="mt-6 pt-6 border-t border-slate-100">
//                 <p className="text-sm text-slate-500">
//                   Click "Edit Profile" to update your personal information.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Security Section */}
//         {activeSection === "security" && (
//           <div className="space-y-6">
//             {/* Change Password */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 bg-blue-50 rounded-xl">
//                   <Lock className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-slate-900">
//                     Change Password
//                   </h3>
//                   <p className="text-sm text-slate-500">
//                     Update your password to keep your account secure
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Current Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter current password"
//                       className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
//                     />
//                     <button
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-4 h-4" />
//                       ) : (
//                         <Eye className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     New Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showNewPassword ? "text" : "password"}
//                       placeholder="Enter new password"
//                       className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
//                     />
//                     <button
//                       onClick={() => setShowNewPassword(!showNewPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                     >
//                       {showNewPassword ? (
//                         <EyeOff className="w-4 h-4" />
//                       ) : (
//                         <Eye className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm new password"
//                       className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
//                     />
//                     <button
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="w-4 h-4" />
//                       ) : (
//                         <Eye className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 flex items-center gap-4">
//                 <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
//                   Update Password
//                 </button>
//                 <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Notifications Section */}
//         {activeSection === "notifications" && (
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-amber-50 rounded-xl">
//                 <Bell className="w-5 h-5 text-amber-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-900">
//                   Notification Preferences
//                 </h3>
//                 <p className="text-sm text-slate-500">
//                   Manage how you receive notifications
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-8">
//               {/* Email Notifications */}
//               <div>
//                 <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
//                   Email Notifications
//                 </h4>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       key: "emailOrders",
//                       label: "Order Updates",
//                       description:
//                         "Receive emails about your order status changes",
//                     },
//                     {
//                       key: "emailPayments",
//                       label: "Payment Confirmations",
//                       description: "Get notified when payments are processed",
//                     },
//                     {
//                       key: "emailMarketing",
//                       label: "Marketing & Promotions",
//                       description: "Receive special offers and product updates",
//                     },
//                   ].map((item) => (
//                     <div
//                       key={item.key}
//                       className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
//                     >
//                       <div>
//                         <p className="text-sm font-medium text-slate-900">
//                           {item.label}
//                         </p>
//                         <p className="text-xs text-slate-500 mt-0.5">
//                           {item.description}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => toggleNotification(item.key)}
//                         className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
//                           notifications[item.key]
//                             ? "bg-blue-600"
//                             : "bg-slate-200"
//                         }`}
//                       >
//                         <span
//                           className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
//                             notifications[item.key]
//                               ? "translate-x-5"
//                               : "translate-x-0"
//                           }`}
//                         />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="border-t border-slate-100" />

//               {/* Push Notifications */}
//               <div>
//                 <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
//                   Push Notifications
//                 </h4>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       key: "pushOrders",
//                       label: "Order Updates",
//                       description:
//                         "Push notifications for order status changes",
//                     },
//                     {
//                       key: "pushPayments",
//                       label: "Payment Alerts",
//                       description: "Get push alerts for payment activity",
//                     },
//                     {
//                       key: "pushUpdates",
//                       label: "System Updates",
//                       description: "Notifications about platform updates",
//                     },
//                   ].map((item) => (
//                     <div
//                       key={item.key}
//                       className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
//                     >
//                       <div>
//                         <p className="text-sm font-medium text-slate-900">
//                           {item.label}
//                         </p>
//                         <p className="text-xs text-slate-500 mt-0.5">
//                           {item.description}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => toggleNotification(item.key)}
//                         className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
//                           notifications[item.key]
//                             ? "bg-blue-600"
//                             : "bg-slate-200"
//                         }`}
//                       >
//                         <span
//                           className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
//                             notifications[item.key]
//                               ? "translate-x-5"
//                               : "translate-x-0"
//                           }`}
//                         />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
//               <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
//                 Save Preferences
//               </button>
//               <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
//                 Reset to Default
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default page;
"use client";
import React, { useState, useEffect } from "react";
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
  Award,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const page = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Profile data
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    joinDate: "",
    bio: "",
    avatar: null,
    cover: null,
  });

  // Stats data from API
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    wishlistCount: 0,
    accountAge: '-',
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPayments: true,
    emailMarketing: false,
    pushOrders: true,
    pushPayments: false,
    pushUpdates: true,
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Get user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Failed to parse user data:', err);
        setError('User session invalid. Please log in again.');
        setLoading(false);
      }
    } else {
      setError('Please log in to view your profile.');
      setLoading(false);
    }
  }, []);

  // Fetch profile data when user is available
  useEffect(() => {
    if (user?.id) {
      fetchProfile();
      fetchUserStats();
    }
  }, [user]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/admin/clients/${user.id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        }
        if (response.status === 404) {
          throw new Error('User profile not found.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Profile data:', data);

      // Handle Laravel wrapped response
      const userData = data.data || data;

      setProfile({
        fullName: userData.name || userData.full_name || userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || userData.phone_number || userData.mobile || '',
        address: userData.address || userData.location || '',
        joinDate: userData.created_at || userData.join_date || userData.member_since || '',
        bio: userData.bio || userData.about || userData.description || '',
        avatar: userData.avatar || userData.profile_image || userData.image || null,
        cover: userData.cover || userData.cover_image || userData.banner || null,
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user statistics (orders, revenue, wishlist)
  const fetchUserStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/clients/${user.id}/stats`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        console.warn('Stats endpoint not available, using fallback');
        // Fallback: try to fetch orders and calculate stats
        await fetchOrdersStats();
        return;
      }

      const data = await response.json();
      const statsData = data.data || data;

      setStats({
        totalOrders: statsData.total_orders || statsData.totalOrders || 0,
        totalRevenue: statsData.total_revenue || statsData.totalRevenue || statsData.revenue || 0,
        wishlistCount: statsData.wishlist_count || statsData.wishlistCount || statsData.wishlist || 0,
        accountAge: statsData.account_age || statsData.accountAge || '-',
      });
    } catch (err) {
      console.error('Stats fetch error:', err);
      // Fallback to fetching orders directly
      await fetchOrdersStats();
    }
  };

  // Fallback: fetch orders and calculate stats from orders data
  const fetchOrdersStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders?user_id=${user.id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) return;

      const data = await response.json();
      const orders = Array.isArray(data) ? data : (data.data || []);

      // Calculate total revenue from orders
      const totalRevenue = orders.reduce((sum, order) => {
        const amount = parseFloat(order.amount || order.total || order.total_amount || 0);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

      setStats(prev => ({
        ...prev,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
      }));
    } catch (err) {
      console.error('Orders stats fetch error:', err);
    }
  };

  // Fetch wishlist count
  const fetchWishlistCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/count?user_id=${user.id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) return;

      const data = await response.json();
      const count = data.count || data.data?.count || data.wishlist_count || 0;

      setStats(prev => ({
        ...prev,
        wishlistCount: count,
      }));
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/clients/${user.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          bio: profile.bio,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setEditMode(false);
      fetchProfile(); // Refresh data
    } catch (err) {
      console.error('Update error:', err);
      alert(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/clients/${user.id}/password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
      }

      alert('Password updated successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error('Password update error:', err);
      alert(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    updateProfile();
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Calculate account age from join date
  const getAccountAge = () => {
    if (!profile.joinDate) return '-';
    const joinDate = new Date(profile.joinDate);
    if (isNaN(joinDate.getTime())) return '-';

    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = diffDays / 365.25;

    if (diffYears >= 1) {
      return `${diffYears.toFixed(1)} Years`;
    } else if (diffDays >= 30) {
      return `${Math.floor(diffDays / 30)} Months`;
    } else {
      return `${diffDays} Days`;
    }
  };

  const membershipLevel = "Platinum";
  const accountStatus = "Active";

  // Dynamic images from API or fallback
  const coverImage = profile.cover || "";
  const avatarImage = profile.avatar || "";

  const statsCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: CreditCard,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Wishlist Items",
      value: stats.wishlistCount.toString(),
      icon: Heart,
      color: "bg-rose-50 text-rose-600",
    },
    {
      label: "Account Age",
      value: getAccountAge(),
      icon: Clock,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  // Loading state
  if (loading && !profile.fullName) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-slate-500 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error / Not logged in state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load profile</h3>
          <p className="text-sm text-slate-500 mb-4">{error}</p>
          <button
            onClick={() => { setError(null); fetchProfile(); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/clients/home"
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <h1 className="text-lg font-semibold text-slate-900">
              Profile Settings
            </h1>
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
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
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
          <div
            className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm bg-cover bg-center bg-slate-200"
            style={{ 
              backgroundImage: coverImage ? `url(${coverImage})` : 'none',
            }}
          >
            {!coverImage && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                <User className="w-16 h-16 text-slate-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Profile Image */}
          <div className="absolute -bottom-16 sm:-bottom-20 left-4 sm:left-8">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
                {avatarImage && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                <User className="w-16 h-16 text-slate-400" />
              </div>
                )}
              </div>
              <div className="absolute -right-2 -bottom-2 bg-white rounded-full p-2 shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <Camera className="w-4 h-4 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Membership Badge */}
          <div className="absolute right-4 bottom-4 sm:bottom-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-4 py-2 shadow-sm backdrop-blur">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-700">
                {membershipLevel} Member
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {profile.fullName || 'Loading...'}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {accountStatus}
                </span>
              </div>
              <p className="text-sm text-slate-500">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-8 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "personal", label: "Personal Info" },
            // { id: "security", label: "Security" },
            { id: "notifications", label: "Notifications" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* About Card */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  About
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {profile.bio || 'No bio added yet.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Mail className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        {profile.email || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Phone className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        {profile.phone || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Address
                      </p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        {profile.address || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Member Since
                      </p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        {formatDate(profile.joinDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Info Section */}
        {activeSection === "personal" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode
                        ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode
                        ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode
                        ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    disabled={!editMode}
                    rows={2}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
                      editMode
                        ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  disabled={!editMode}
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
                    editMode
                      ? "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                      : "border-slate-200 bg-slate-50 text-slate-600"
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
        {activeSection === "security" && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Change Password
                  </h3>
                  <p className="text-sm text-slate-500">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button 
                  onClick={handlePasswordUpdate}
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
                <button 
                  onClick={() => setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === "notifications" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Notification Preferences
                </h3>
                <p className="text-sm text-slate-500">
                  Manage how you receive notifications
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Email Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                  Email Notifications
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      key: "emailOrders",
                      label: "Order Updates",
                      description:
                        "Receive emails about your order status changes",
                    },
                    {
                      key: "emailPayments",
                      label: "Payment Confirmations",
                      description: "Get notified when payments are processed",
                    },
                    {
                      key: "emailMarketing",
                      label: "Marketing & Promotions",
                      description: "Receive special offers and product updates",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                          notifications[item.key]
                            ? "bg-blue-600"
                            : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                            notifications[item.key]
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Push Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                  Push Notifications
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      key: "pushOrders",
                      label: "Order Updates",
                      description:
                        "Push notifications for order status changes",
                    },
                    {
                      key: "pushPayments",
                      label: "Payment Alerts",
                      description: "Get push alerts for payment activity",
                    },
                    {
                      key: "pushUpdates",
                      label: "System Updates",
                      description: "Notifications about platform updates",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                          notifications[item.key]
                            ? "bg-blue-600"
                            : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                            notifications[item.key]
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
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