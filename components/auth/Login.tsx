'use client'

import React, { useState, useEffect } from 'react'
import { useAuth, UserType } from '@/contexts/AuthContext'
import { Building2, User } from 'lucide-react'

interface LoginProps {
  onToggleMode: () => void
}

export function Login({ onToggleMode }: LoginProps) {
  const { login, loading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'business' as UserType
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const success = await login(formData.email, formData.password, formData.userType)
    if (!success) {
      setErrors({ general: 'Invalid credentials. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-md mx-6">
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-2xl shadow-black/20">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-[28px]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-[28px]"></div>

          {/* Card Content */}
          <div className="relative z-10 px-16 py-10">
            {/* Header & Subtitle */}
            <div className="text-center mb-8">
              <h1 className="text-[40px] font-black tracking-wide text-white mb-3 leading-tight">
               Worksta
              </h1>
              <p className="text-[20px] font-normal text-gray-300 leading-relaxed">
                Sign in to your account to continue
              </p>
            </div>

            {/* Account Switcher */}
            <div className="mb-8">
              <div className="relative bg-gray-800/50 rounded-2xl p-1 border border-gray-700/50">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'business' }))}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-[16px] transition-all duration-300 ${
                      formData.userType === 'business'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    Business Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'worker' }))}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-[16px] transition-all duration-300 ${
                      formData.userType === 'worker'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Worker Account
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm text-center">
                {errors.general}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[16px] font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full h-[60px] px-6 bg-gray-800/80 border border-gray-700/50 rounded-[20px] text-white placeholder-gray-400 font-medium text-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-purple-500/20"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 focus-within:opacity-100 pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-[16px] font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full h-[60px] px-6 bg-gray-800/80 border border-gray-700/50 rounded-[20px] text-white placeholder-gray-400 font-medium text-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-purple-500/20"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 focus-within:opacity-100 pointer-events-none"></div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[62px] bg-purple-600 hover:bg-purple-700 text-white font-bold text-[22px] rounded-[28px] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <button
                onClick={onToggleMode}
                className="text-gray-400 text-[16px] hover:text-white transition-colors duration-300"
              >
                Don't have an account?{' '}
                <span className="text-[#A259FF] font-semibold hover:underline">
                  Sign up
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/50 text-gray-400 font-medium rounded-full border border-gray-700/50">
                  OR
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button className="w-full h-[62px] bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 hover:border-gray-600/50 text-white font-semibold text-[18px] rounded-[28px] transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-gray-500/20 focus:outline-none focus:ring-2 focus:ring-gray-500/30">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
