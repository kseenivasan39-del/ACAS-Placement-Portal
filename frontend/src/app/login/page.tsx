"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GraduationCap, Building2, UserCog, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'student';
  
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update role if URL parameter changes
  useEffect(() => {
    if (searchParams.get('role')) {
      setRole(searchParams.get('role') as string);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock Authentication Logic based on strict domain rules
    setTimeout(() => {
      // 1. Student Login
      if (role === 'student' && email === '26f2300145@aei.edu.in' && password === 'student123') {
        router.push('/student-dashboard');
      } 
      // 2. Staff/Admin Login
      else if (role === 'staff' && email === 'placement@aei.edu.in' && password === 'staff123') {
        router.push('/admin-dashboard');
      }
      // 3. Recruiter Login
      else if (role === 'recruiter' && email === 'hr@google.com' && password === 'recruiter123') {
        router.push('/recruiter-dashboard');
      } 
      // Failed Logic
      else {
        // Provide helpful strict domain errors if password is correct but email violates rules
        const domain = email.split('@')[1];
        if (role === 'student' && domain !== 'aei.edu.in') {
          setError("Students must use their @aei.edu.in email address.");
        } else if (role === 'recruiter' && ['gmail.com', 'yahoo.com', 'hotmail.com'].includes(domain)) {
          setError("Recruiters must use a valid corporate email domain.");
        } else {
          setError("Invalid email or password. Please try again.");
        }
      }
      setLoading(false);
    }, 1000); // Simulate network request
  };

  const getRoleIcon = () => {
    if (role === 'student') return <GraduationCap className="w-6 h-6 text-blue-600" />;
    if (role === 'recruiter') return <Building2 className="w-6 h-6 text-red-500" />;
    return <UserCog className="w-6 h-6 text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Left Side - Image/Branding */}
      <div 
        className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/upscaled_roundabout.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#293d6b]/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b54] via-transparent to-transparent opacity-90"></div>
        <div className="relative z-10 text-center px-12 text-white">
          <img src="/logo.png" alt="Logo" className="w-32 h-32 mx-auto mb-8 bg-white p-2 rounded-full shadow-lg" />
          <h1 className="text-4xl font-bold mb-4 font-serif">CareerConnect Portal</h1>
          <p className="text-blue-200 text-lg leading-relaxed max-w-md mx-auto">
            The official unified placement management system for Aditanar College of Arts & Science.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative">
        <Link href="/" className="absolute top-8 left-8 text-sm font-semibold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
          &larr; Back to Home
        </Link>

        <div className="mx-auto w-full max-w-md">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500 text-sm">Please sign in to your account</p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
            {['student', 'recruiter', 'staff'].map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setError(""); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all capitalize ${
                  role === r ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <motion.div
            key={role}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 bg-slate-50 rounded-lg border border-gray-100">
                {getRoleIcon()}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 capitalize">{role} Login</h3>
                <p className="text-xs text-gray-500">
                  {role === 'student' && 'Use your @aei.edu.in email address'}
                  {role === 'recruiter' && 'Use your corporate email address'}
                  {role === 'staff' && 'Placement Cell & Administrators only'}
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold flex items-start gap-2 border border-red-100"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                    placeholder={
                      role === 'student' ? 'e.g. 26f2300145@aei.edu.in' : 
                      role === 'recruiter' ? 'e.g. hr@company.com' : 
                      'admin@aei.edu.in'
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 font-medium">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#293d6b] hover:bg-[#1a2b54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {role === 'recruiter' && (
              <div className="mt-8 text-center text-sm">
                <span className="text-gray-500 font-medium">Don't have an account? </span>
                <Link href="/register" className="font-bold text-blue-600 hover:text-blue-500">
                  Register here
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
