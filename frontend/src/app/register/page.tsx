"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Mail, Lock, User, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    companyName: "",
    website: "",
    email: "",
    password: "",
    logoDataUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logoDataUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save to localStorage
    const existing = localStorage.getItem('pending_company_registrations');
    const registrations = existing ? JSON.parse(existing) : [];
    
    // Extract domain from website for logo fallback
    let logoUrl = formData.logoDataUrl; // Use uploaded file if available
    if (!logoUrl && formData.website) {
      let domain = formData.website.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0];
      if (domain) logoUrl = `https://logo.clearbit.com/${domain}`;
    }

    const newRegistration = {
      id: `REG-${Math.floor(Math.random() * 10000)}`,
      ...formData,
      logo: logoUrl,
      status: 'pending',
      date: new Date().toLocaleDateString()
    };
    
    registrations.push(newRegistration);
    localStorage.setItem('pending_company_registrations', JSON.stringify(registrations));

    // Mock Registration Logic
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect to login after a brief success message
      setTimeout(() => {
        router.push("/login?role=recruiter");
      }, 2500);
    }, 1500); // Simulate network request
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Left Side - Image/Branding */}
      <div className="hidden md:flex md:w-[45%] relative overflow-hidden items-center justify-center bg-[url('/recruiter_registration_bg.jpg')] bg-cover bg-center">
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-[#1a2b54]/80 mix-blend-multiply backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1836] via-[#1a2b54]/40 to-transparent"></div>
        
        <div className="relative z-10 text-center px-12 text-white">
          <div className="w-24 h-24 mx-auto mb-8 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-xl">
            <Building2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 font-serif">Partner with Us</h1>
          <p className="text-blue-200 text-lg leading-relaxed max-w-md mx-auto">
            Join the CareerConnect network. Hire top-tier talent from Aditanar College of Arts & Science seamlessly.
          </p>
          
          <div className="mt-12 space-y-4 text-left max-w-xs mx-auto">
            <div className="flex items-center gap-3 text-blue-100">
              <CheckCircle2 className="text-green-400 w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Post placement drives instantly</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <CheckCircle2 className="text-green-400 w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Track applicants efficiently</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <CheckCircle2 className="text-green-400 w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Verified student profiles & CGPAs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative">
        <Link href="/login?role=recruiter" className="absolute top-8 left-8 text-sm font-semibold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
          &larr; Back to Login
        </Link>

        <div className="mx-auto w-full max-w-lg">
          
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create Recruiter Account</h2>
            <p className="text-gray-500 text-sm">Fill in your corporate details to request dashboard access.</p>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4 shadow-sm"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 text-green-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Registration Successful!</h3>
                <p className="text-green-800 text-sm font-medium">
                  Your corporate account request for <strong>{formData.companyName}</strong> has been submitted.
                </p>
                <p className="text-gray-500 text-xs">Redirecting you to the login page...</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleRegister} 
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="jobTitle"
                        required
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                        placeholder="HR Manager"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                        placeholder="e.g. Google India"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Company Website</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                        placeholder="google.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company Logo</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2.5 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100 transition-colors border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  {formData.logoDataUrl && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1 font-semibold">Logo Preview:</p>
                      <div className="w-16 h-16 rounded border border-gray-200 bg-gray-50 flex items-center justify-center p-1 overflow-hidden">
                        <img src={formData.logoDataUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Official Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                      placeholder="hr@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 font-medium">Must be at least 8 characters long.</p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#293d6b] hover:bg-[#1a2b54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting Request...' : 'Create Account'}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
