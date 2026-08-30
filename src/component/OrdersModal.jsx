import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOrderModalOpen, clearAllOrders } from '../store/orderSlice'
import { FaTimes, FaClipboardList, FaBoxOpen, FaUser, FaEnvelope, FaCalendarAlt, FaMoneyBillWave, FaTrash } from 'react-icons/fa'

export default function OrdersModal() {
  const dispatch = useDispatch()
  const { orders, isOrdersOpen } = useSelector((state) => state.order)

  if (!isOrdersOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-cyan-700 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <FaClipboardList className="text-2xl" />
            <h2 className="text-xl font-bold">Your Orders History</h2>
          </div>
          <div className="flex items-center gap-3">
            {orders.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear all orders history?')) {
                    dispatch(clearAllOrders())
                  }
                }}
                className="text-xs bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded font-semibold transition cursor-pointer flex items-center gap-1"
                title="Clear Orders History"
              >
                <FaTrash className="text-xs" /> Clear History
              </button>
            )}
            <button
              onClick={() => dispatch(setOrderModalOpen(false))}
              className="rounded-full p-1.5 hover:bg-white/20 transition cursor-pointer"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FaBoxOpen className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-700">No Orders Found</h3>
              <p className="text-sm text-gray-500 mt-2">
                You haven't placed any shoe orders yet. Select a shoe, add to cart and submit your order!
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between border-b pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                      Order ID: #{order.id}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <FaCalendarAlt />
                      <span>Date: {order.date}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800 border border-green-300">
                    {order.status || 'Confirmed - Cash on Delivery'}
                  </span>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-white p-3 rounded-xl border">
                  <div>
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaUser className="text-blue-500 text-xs" />
                      <strong className="text-gray-900">Name:</strong> {order.user?.name || 'N/A'}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700 mt-1">
                      <FaEnvelope className="text-blue-500 text-xs" />
                      <strong className="text-gray-900">Email:</strong> {order.user?.email || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaMoneyBillWave className="text-green-500 text-xs" />
                      <strong className="text-gray-900">Payment Method:</strong>{' '}
                      <span className="font-bold text-blue-700">{order.paymentMethod}</span>
                    </p>
                    {order.user?.address && (
                      <p className="text-gray-700 mt-1 text-xs">
                        <strong className="text-gray-900">Address:</strong> {order.user.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Ordered Items */}
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-gray-800">Purchased Items:</h4>
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white p-3 rounded-xl border"
                    >
                      <img
                        src={item.Image}
                        alt={item.heading}
                        className="h-16 w-16 rounded-lg object-contain border p-1 bg-gray-50"
                      />
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 text-sm">{item.heading}</h5>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                          <span>Size: <strong className="bg-gray-100 px-2 py-0.5 border rounded text-gray-900">{item.size}</strong></span>
                          <span>Quantity: <strong>{item.quantity}</strong></span>
                          <span>Price: <strong>{item.currency || 'PKR'} {item.price}</strong></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-blue-700">
                          PKR {item.subtotal}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Total */}
                <div className="flex items-center justify-between border-t pt-3 font-extrabold text-base text-gray-900">
                  <span>Total Amount Paid / Payable:</span>
                  <span className="text-lg text-green-700">PKR {order.total}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
