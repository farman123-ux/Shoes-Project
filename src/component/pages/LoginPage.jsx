import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../store/orderSlice'
import { FaUserLock, FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.order)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // If user is already logged in, redirect to cart safely in useEffect
  useEffect(() => {
    if (user) {
      navigate('/cart')
    }
  }, [user, navigate])

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Please enter your full name')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    if (!password.trim()) {
      setError('Please enter your password')
      return
    }

    const userData = {
      name: name.trim(),
      email: email.trim(),
    }

    // Dispatch login action (saves to Redux Toolkit + LocalStorage)
    dispatch(loginUser(userData))

    // After login, open the Shopping Cart & Checkout Page!
    navigate('/cart')
  }

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100/60 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-blue-100 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <FaUserLock className="text-3xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 pt-2">Login</h1>
          <p className="text-xs text-gray-500 font-medium">
            Please log in to continue to your Shopping Cart & Checkout.
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-100 border border-red-300 p-3 text-xs font-bold text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Login Form with Name, Email & Password */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FaUser className="text-blue-500 text-xs" /> Customer Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Farman Ali"
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-600 focus:outline-none shadow-2xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FaEnvelope className="text-blue-500 text-xs" /> Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="farman@example.com"
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-600 focus:outline-none shadow-2xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FaLock className="text-blue-500 text-xs" /> Password *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-600 focus:outline-none shadow-2xs"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-xl hover:bg-blue-700 transition cursor-pointer flex items-center justify-center gap-2 text-base mt-2"
          >
            <span>Login</span>
            <FaArrowRight className="text-sm" />
          </button>
        </form>

        <div className="text-center text-[11px] text-gray-400 border-t pt-4">
          🔒 Secure authentication stored in Redux & LocalStorage.
        </div>
      </div>
    </div>
  )
}
