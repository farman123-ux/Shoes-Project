import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setCartOpen,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/cartSlice'
import { placeOrder } from '../store/orderSlice'
import { FaTrash, FaTimes, FaShoppingBag, FaCheckCircle } from 'react-icons/fa'

export default function CartDrawer() {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state) => state.cart)

  const todayStr = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: todayStr,
    paymentMethod: 'Cash on Delivery',
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)

  if (!isOpen) return null

  const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0)
  const delivery = items.length > 0 ? 500 + (items.length - 1) * 200 : 0
  const tax = 0
  const total = subtotal + delivery + tax

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errorMsg) setErrorMsg('')
  }

  const handleCheckout = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name')
      return
    }
    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address')
      return
    }
    if (!formData.address.trim()) {
      setErrorMsg('Please enter your delivery address')
      return
    }

    if (items.length === 0) {
      setErrorMsg('Your cart is empty')
      return
    }

    const orderPayload = {
      user: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      date: formData.date || todayStr,
      paymentMethod: formData.paymentMethod,
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
        formData.paymentMethod === 'Cash on Delivery'
          ? 'Delivery payment is first, product reaches user then pay product price upon delivery.'
          : `Payment via ${formData.paymentMethod}`,
    }

    dispatch(placeOrder(orderPayload))
    dispatch(clearCart())
    setOrderSuccess(true)

    setTimeout(() => {
      setOrderSuccess(false)
      dispatch(setCartOpen(false))
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-blue-600 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-2xl" />
            <h2 className="text-xl font-bold">Your Shopping Cart</h2>
          </div>
          <button
            onClick={() => dispatch(setCartOpen(false))}
            className="rounded-full p-1.5 hover:bg-white/20 transition cursor-pointer"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FaCheckCircle className="text-6xl text-green-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-gray-800">
                Order Placed Successfully!
              </h3>
              <p className="mt-2 text-gray-600">
                Your order has been recorded in the Order Icon.
              </p>
              <p className="mt-1 text-sm font-semibold text-blue-600">
                {formData.paymentMethod === 'Cash on Delivery'
                  ? 'Payment will be collected upon product delivery.'
                  : `Payment method: ${formData.paymentMethod}`}
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FaShoppingBag className="text-6xl text-gray-300 mb-4" />
              <p className="text-xl font-semibold text-gray-600">
                Your Cart is Empty
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Explore our shoes collection and add your favorite pairs!
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800 border-b pb-2">
                  Selected Shoes
                </h3>
                {items.map((item, idx) => (
                  <div
                    key={`${item.id}-${item.size}-${idx}`}
                    className="flex items-center gap-4 rounded-xl border bg-gray-50 p-3 shadow-xs"
                  >
                    <img
                      src={item.Image}
                      alt={item.heading}
                      className="h-20 w-20 rounded-lg object-contain bg-white border p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        {item.heading}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        Category: {item.para || item.category || 'Shoes'}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <span>Size: <strong className="text-gray-900 bg-white px-2 py-0.5 border rounded">{item.size}</strong></span>
                        <span>|</span>
                        <span>{item.currency || 'PKR'} {item.price}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border rounded bg-white overflow-hidden">
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
                            className="px-2.5 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-0.5 font-bold text-sm">
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
                            className="px-2.5 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold text-green-700">
                          Total: PKR {item.subtotal}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCart({ id: item.id, size: item.size })
                        )
                      }
                      className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                      title="Remove Item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="rounded-xl border bg-blue-50/50 p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">PKR {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges:</span>
                  <span className="font-bold">PKR {delivery}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-extrabold text-blue-900">
                  <span>Grand Total:</span>
                  <span>PKR {total}</span>
                </div>
              </div>

              {/* User Details & Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-2">
                <h3 className="font-bold text-lg text-gray-800 border-b pb-2">
                  Customer & Payment Information
                </h3>

                {errorMsg && (
                  <div className="rounded-lg bg-red-100 border border-red-400 p-3 text-xs font-semibold text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address, City, Country"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
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
                      onClick={() =>
                        setFormData({
                          ...formData,
                          paymentMethod: 'Cash on Delivery',
                        })
                      }
                      className={`p-2.5 text-xs font-bold rounded-lg border text-center transition cursor-pointer ${
                        formData.paymentMethod === 'Cash on Delivery'
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: 'EasyPaisa' })
                      }
                      className={`p-2.5 text-xs font-bold rounded-lg border text-center transition cursor-pointer ${
                        formData.paymentMethod === 'EasyPaisa'
                          ? 'border-green-600 bg-green-600 text-white shadow-xs'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      EasyPaisa
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: 'JazzCash' })
                      }
                      className={`p-2.5 text-xs font-bold rounded-lg border text-center transition cursor-pointer ${
                        formData.paymentMethod === 'JazzCash'
                          ? 'border-red-600 bg-red-600 text-white shadow-xs'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      JazzCash
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded border">
                    {formData.paymentMethod === 'Cash on Delivery'
                      ? '📦 Delivery payment is first, once the product reaches you then pay the price.'
                      : `💳 Pay securely via ${formData.paymentMethod} account.`}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-green-600 py-3.5 text-center font-bold text-white shadow-lg hover:bg-green-700 transition cursor-pointer mt-4"
                >
                  Submit Order (PKR {total})
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
