'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function ProfilePage() {
  const { user } = useAuth()
  
  // Basic states based on context
  const [name, setName] = useState(user?.name || '')
  
  // Note: changing email/phone usually requires OTP re-verification, 
  // so for phase 2 we only allow updating the Name in a simple way 
  // or just viewing the profile info.
  
  return (
    <div className="min-h-screen bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-heading font-bold text-white">My Profile</h1>
          <Link href="/dashboard" className="text-text-secondary hover:text-white transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-bg-secondary p-8 rounded-xl border border-gray-800 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-md focus:outline-none focus:border-accent"
            />
            <p className="text-xs text-text-secondary mt-2">Updates will be saved when we implement the full profile edit endpoint in Phase 3.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Phone Number</label>
              <input 
                disabled
                type="text"
                value={user?.phone || 'Not provided'}
                className="w-full bg-gray-900/50 border border-gray-800 text-text-secondary p-3 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
              <input 
                disabled
                type="text"
                value={user?.email || 'Not provided'}
                className="w-full bg-gray-900/50 border border-gray-800 text-text-secondary p-3 rounded-md cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
             <button 
               className="bg-accent hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
               onClick={() => alert('Profile update will be fully functional in Phase 3!')}
             >
               Save Changes
             </button>
          </div>
        </div>

      </div>
    </div>
  )
}
