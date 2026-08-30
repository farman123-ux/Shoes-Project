import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteOrder, editOrder, clearAllOrders } from '../../store/orderSlice'
import {
  FaClipboardList,
  FaBoxOpen,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa'

export default function OrdersPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { orders } = useSelector((state) => state.order)

  // Edit state
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [editAddress, setEditAddress] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editPaymentMethod, setEditPaymentMethod] = useState('Cash on Delivery')

  const handleStartEdit = (order) => {
    setEditingOrderId(order.id)
    setEditAddress(order.user?.address || '')
    setEditPhone(order.user?.phone || '')
    setEditPaymentMethod(order.paymentMethod || 'Cash on Delivery')
  }

  const handleSaveEdit = (order) => {
    const updatedOrder = {
      ...order,
      user: {
        ...order.user,
        address: editAddress.trim(),
        phone: editPhone.trim(),
      },
      paymentMethod: editPaymentMethod,
      paymentNote:
        editPaymentMethod === 'Cash on Delivery'
          ? 'Delivery payment is first, product reaches user then pay product price upon delivery.'
          : `Payment via ${editPaymentMethod}`,
    }

    dispatch(editOrder(updatedOrder))
    setEditingOrderId(null)
  }

  const handleDelete = (orderId) => {
    if (window.confirm(`Are you sure you want to delete Order #${orderId}?`)) {
      dispatch(deleteOrder(orderId))
    }
  }

  return (
    <div className="mt-20 min-h-screen bg-blue-50/60 px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-cyan-200 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <FaClipboardList className="text-cyan-700" /> Your Orders History
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your orders, edit delivery info, or delete order records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {orders.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear all orders history?')) {
                    dispatch(clearAllOrders())
                  }
                }}
                className="flex items-center gap-1.5 rounded-xl bg-red-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-600 transition cursor-pointer"
              >
                <FaTrash /> Clear History
              </button>
            )}

            <button
              onClick={() => navigate('/product')}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm border border-cyan-200 hover:bg-cyan-50 transition cursor-pointer"
            >
              <FaArrowLeft /> Back to Shop
            </button>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl bg-white p-12 text-center shadow-md mt-10">
            <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700">No Orders Placed Yet</h2>
            <p className="mt-2 text-sm text-gray-500">
              Select a shoe, add to cart, and submit your order!
            </p>
            <button
              onClick={() => navigate('/product')}
              className="mt-6 rounded-xl bg-cyan-700 px-6 py-3 font-bold text-white shadow-md hover:bg-cyan-800 transition cursor-pointer"
            >
              Browse Footwear Catalog
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isEditing = editingOrderId === order.id

              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md space-y-4"
                >
                  {/* Order Top Bar with Edit & Delete Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between border-b pb-3 gap-2">
                    <div>
                      <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                        Order ID: #{order.id}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <FaCalendarAlt />
                        <span>Date: {order.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-extrabold text-green-800 border border-green-300">
                        {order.status || 'Confirmed - Cash on Delivery'}
                      </span>

                      {/* Edit Button/Icon */}
                      {!isEditing ? (
                        <button
                          onClick={() => handleStartEdit(order)}
                          className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-300 text-xs font-bold transition cursor-pointer"
                          title="Edit Order Details"
                        >
                          <FaEdit /> Edit
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSaveEdit(order)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                          title="Save Changes"
                        >
                          <FaCheck /> Save
                        </button>
                      )}

                      {/* Delete Button/Icon */}
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg border border-red-300 text-xs font-bold transition cursor-pointer"
                        title="Delete Order"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>

                  {/* Customer Info Box / Inline Edit Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm">
                    <div>
                      <p className="flex items-center gap-2 text-gray-700">
                        <FaUser className="text-blue-500 text-xs" />
                        <strong className="text-gray-900">Name:</strong> {order.user?.name || 'N/A'}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 mt-1.5">
                        <FaEnvelope className="text-blue-500 text-xs" />
                        <strong className="text-gray-900">Email:</strong> {order.user?.email || 'N/A'}
                      </p>
                    </div>

                    <div>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700">
                              Contact Phone:
                            </label>
                            <input
                              type="text"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full rounded-lg border p-1.5 text-xs bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-700">
                              Delivery Address:
                            </label>
                            <input
                              type="text"
                              value={editAddress}
                              onChange={(e) => setEditAddress(e.target.value)}
                              className="w-full rounded-lg border p-1.5 text-xs bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-700">
                              Payment Method:
                            </label>
                            <select
                              value={editPaymentMethod}
                              onChange={(e) => setEditPaymentMethod(e.target.value)}
                              className="w-full rounded-lg border p-1.5 text-xs bg-white"
                            >
                              <option value="Cash on Delivery">Cash on Delivery</option>
                              <option value="EasyPaisa">EasyPaisa</option>
                              <option value="JazzCash">JazzCash</option>
                            </select>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="flex items-center gap-2 text-gray-700">
                            <FaMoneyBillWave className="text-green-500 text-xs" />
                            <strong className="text-gray-900">Payment Method:</strong>{' '}
                            <span className="font-bold text-blue-700">{order.paymentMethod}</span>
                          </p>
                          <p className="flex items-center gap-2 text-gray-700 mt-1.5 text-xs">
                            <FaPhoneAlt className="text-blue-500 text-[10px]" />
                            <strong className="text-gray-900">Phone:</strong> {order.user?.phone || 'N/A'}
                          </p>
                          {order.user?.address && (
                            <p className="flex items-center gap-2 text-gray-700 mt-1 text-xs">
                              <FaMapMarkerAlt className="text-red-500 text-[10px]" />
                              <strong className="text-gray-900">Address:</strong> {order.user.address}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Purchased Items */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-gray-800">Purchased Shoes:</h4>
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 bg-gray-50 p-3.5 rounded-xl border border-gray-200"
                      >
                        <img
                          src={item.Image}
                          alt={item.heading}
                          className="h-16 w-16 rounded-lg object-contain border p-1 bg-white"
                        />
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 text-base">{item.heading}</h5>
                          <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                            <span>
                              Size:{' '}
                              <strong className="bg-white px-2 py-0.5 border rounded text-gray-900">
                                {item.size}
                              </strong>
                            </span>
                            <span>Quantity: <strong>{item.quantity}</strong></span>
                            <span>Price: <strong>{item.currency || 'PKR'} {item.price}</strong></span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-extrabold text-blue-700">
                            PKR {item.subtotal}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Total */}
                  <div className="flex items-center justify-between border-t pt-3 font-extrabold text-lg text-gray-900">
                    <span>Grand Total:</span>
                    <span className="text-xl text-green-700">PKR {order.total}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
