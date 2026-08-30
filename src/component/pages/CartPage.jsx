import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../store/cartSlice'
import { placeOrder, loginUser, logoutUser } from '../../store/orderSlice'
import {
  FaTrash,
  FaCheckCircle,
  FaUserLock,
  FaArrowLeft,
  FaUserCheck,
  FaShoePrints,
} from 'react-icons/fa'

export default function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { items } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.order)

  const todayStr = new Date().toISOString().split('T')[0]

  // Login state
  const [loginName, setLoginName] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPhone, setLoginPhone] = useState('')
  const [loginError, setLoginError] = useState('')

  // Checkout form state
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState(todayStr)
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  const [checkoutError, setCheckoutError] = useState('')
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0)
  const delivery = items.length > 0 ? 500 + (items.length - 1) * 200 : 0
  const tax = 0
  const total = subtotal + delivery + tax

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (!loginName.trim()) {
      setLoginError('Please enter your full name')
      return
    }
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address')
      return
    }

    dispatch(
      loginUser({
        name: loginName.trim(),
        email: loginEmail.trim(),
        phone: loginPhone.trim() || 'N/A',
      })
    )
    setLoginError('')
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()

    if (!user) {
      setCheckoutError('Please login first before submitting your order.')
      return
    }

    if (!address.trim()) {
      setCheckoutError('Please enter your delivery address')
      return
    }

    if (items.length === 0) {
      setCheckoutError('Your cart is empty')
      return
    }

    const orderPayload = {
      user: {
        name: user.name,
        email: user.email,
        phone: phone || user.phone || 'N/A',
        address: address.trim(),
      },
      date: date || todayStr,
      paymentMethod,
      items: items.map((item) => ({
        id: item.id,
        heading: item.heading,
        para: item.para,
        Image: item.Image,
        size: item.size,
        price: item.price,
        currency: item.currency || 'PKR',
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      subtotal,
      delivery,
      tax,
      total,
      paymentNote:
        paymentMethod === 'Cash on Delivery'
          ? 'Delivery payment is first, product reaches user then pay product price upon delivery.'
          : `Payment via ${paymentMethod}`,
    }

    dispatch(placeOrder(orderPayload))
    dispatch(clearCart())
    setOrderPlacedSuccess(true)

    setTimeout(() => {
      navigate('/orders')
    }, 1800)
  }

  return (
    <div className="mt-20 min-h-screen bg-blue-50/60 px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header Bar without Cart Icon */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-blue-200 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <FaShoePrints className="text-blue-600 rotate-90" /> Shopping Cart & Checkout Page
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Review your selected shoes, fill in your details, and submit your order.
            </p>
          </div>

          <button
            onClick={() => navigate('/product')}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm border border-blue-200 hover:bg-blue-50 transition cursor-pointer"
          >
            <FaArrowLeft /> Back to Product Catalog
          </button>
        </div>

        {orderPlacedSuccess ? (
          <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl border border-green-200 mt-10">
            <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h2>
            <p className="mt-2 text-gray-600">
              Thank you, <strong className="text-gray-900">{user?.name}</strong>! Your order has been stored in your Orders page.
            </p>
            <p className="mt-3 text-xs font-semibold text-blue-700 bg-blue-50 p-3 rounded-xl border">
              {paymentMethod === 'Cash on Delivery'
                ? '📦 Cash on Delivery: Delivery payment is first, once the product reaches you then pay the price of shoes.'
                : `💳 Paid via ${paymentMethod}`}
            </p>
            <p className="mt-4 text-sm font-medium text-gray-500">Redirecting to Orders page...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl bg-white p-12 text-center shadow-md mt-10">
            <FaShoePrints className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700">No Shoes Selected Yet</h2>
            <p className="mt-2 text-sm text-gray-500">
              Select a shoe card and click "Add To card" to open this checkout page.
            </p>
            <button
              onClick={() => navigate('/product')}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              Browse Shoes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Selected Shoes */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">
                  Selected Shoes ({items.length})
                </h2>

                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.id}-${item.size}-${idx}`}
                      className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border bg-gray-50/80 p-4 shadow-xs hover:border-blue-300 transition"
                    >
                      <img
                        src={item.Image}
                        alt={item.heading}
                        className="h-24 w-24 rounded-xl object-contain bg-white border p-1"
                      />

                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-gray-900 text-lg">{item.heading}</h3>
                        <p className="text-xs text-gray-500 font-medium">
                          Category: {item.para || item.category || 'Shoes'}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm">
                          <span className="text-gray-600">
                            Size:{' '}
                            <strong className="bg-white px-2 py-0.5 border rounded text-gray-900">
                              {item.size}
                            </strong>
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="font-semibold text-blue-700">
                            {item.currency || 'PKR'} {item.price}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
                          <div className="flex items-center border rounded bg-white overflow-hidden shadow-2xs">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    size: item.size,
                                    quantity: item.quantity - 1,
                                  })
                                )
                              }
                              className="px-3 py-1 text-gray-700 hover:bg-gray-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-bold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    size: item.size,
                                    quantity: item.quantity + 1,
                                  })
                                )
                              }
                              className="px-3 py-1 text-gray-700 hover:bg-gray-100 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-bold text-green-700 text-sm">
                            Subtotal: PKR {item.subtotal}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id, size: item.size }))
                        }
                        className="text-red-500 hover:text-red-700 p-2.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                        title="Remove Shoe"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between border-t pt-4">
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Clear All Cart Items
                  </button>
                </div>
              </div>

              {/* Price Summary Box */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 space-y-3">
                <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
                  Price Breakdown
                </h3>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shoes Price Subtotal:</span>
                  <span className="font-bold text-gray-900">PKR {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Charges (First Payment):</span>
                  <span className="font-bold text-gray-900">PKR {delivery}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax:</span>
                  <span className="font-bold text-gray-900">PKR {tax}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-extrabold text-xl text-blue-900">
                  <span>Grand Total:</span>
                  <span className="text-green-700">PKR {total}</span>
                </div>
              </div>
            </div>

            {/* Right Column: User Login Check & Order Submission Form */}
            <div className="lg:col-span-5">
              {!user ? (
                /* User is NOT Logged In -> Do NOT open submit page, show Login Required form */
                <div className="rounded-2xl bg-white p-6 shadow-md border border-blue-200 space-y-4 sticky top-24">
                  <div className="flex items-center gap-3 border-b pb-3 text-blue-800">
                    <FaUserLock className="text-3xl text-blue-600" />
                    <div>
                      <h2 className="text-xl font-bold">Login Required</h2>
                      <p className="text-xs text-gray-500">
                        Please login to unlock the checkout and submit your order.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-50 border border-amber-300 p-3 text-xs font-medium text-amber-800">
                    🔒 The order submit page is locked. Enter your credentials below to log in.
                  </div>

                  {loginError && (
                    <div className="rounded-lg bg-red-100 border border-red-400 p-3 text-xs font-semibold text-red-700">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        placeholder="e.g. Farman Ali"
                        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="farman@example.com"
                        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                      Login & Unlock Order Submit Page
                    </button>
                  </form>
                </div>
              ) : (
                /* User IS Logged In -> Show Email, Contact, Address, Payment, and Submit Button */
                <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-200 space-y-5 sticky top-24">
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FaUserCheck className="text-green-600 text-lg" />
                      <div>
                        <span className="text-xs font-bold text-green-900 block">Logged In:</span>
                        <span className="text-sm font-extrabold text-gray-900">{user.name}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(logoutUser())}
                      className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 border-b pb-2">
                    Customer Information & Order Submit
                  </h2>

                  {checkoutError && (
                    <div className="rounded-lg bg-red-100 border border-red-400 p-3 text-xs font-semibold text-red-700">
                      {checkoutError}
                    </div>
                  )}

                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full rounded-xl border border-gray-200 bg-gray-100 p-3 text-sm font-semibold text-gray-700 cursor-not-allowed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0300-1234567"
                          className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Delivery Date *
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Street #, Sector, City"
                        rows={3}
                        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Select Payment Method *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('Cash on Delivery')}
                          className={`p-2.5 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
                            paymentMethod === 'Cash on Delivery'
                              ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Cash on Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('EasyPaisa')}
                          className={`p-2.5 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
                            paymentMethod === 'EasyPaisa'
                              ? 'border-green-600 bg-green-600 text-white shadow-xs'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          EasyPaisa
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('JazzCash')}
                          className={`p-2.5 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
                            paymentMethod === 'JazzCash'
                              ? 'border-red-600 bg-red-600 text-white shadow-xs'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          JazzCash
                        </button>
                      </div>

                      <p className="mt-2 text-xs text-gray-600 bg-gray-100 p-2.5 rounded-xl border">
                        {paymentMethod === 'Cash on Delivery'
                          ? '📦 Delivery payment is first, once the product reaches you then pay the price of the shoes.'
                          : `💳 Pay securely using your ${paymentMethod} mobile account.`}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-green-600 py-4 font-extrabold text-white shadow-xl hover:bg-green-700 transition cursor-pointer text-base mt-2"
                    >
                      Submit Order (PKR {total})
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
