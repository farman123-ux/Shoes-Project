import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAddProductModal } from '../store/productSlice'
import { logoutUser } from '../store/orderSlice'
import { FaClipboardList, FaPlus } from 'react-icons/fa'

import AddProductModal from './AddProductModal'

function Navbar() {
  const dispatch = useDispatch()

  const { orders, user } = useSelector((state) => state.order)
  const orderCount = orders.length

  return (
    <>
      <nav className="fixed top-0 left-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 transition-all duration-300 shadow-xs">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                StepStyle<span className="text-blue-600">.</span>
              </span>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <ul className="flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200 inline-block ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200 inline-block ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200 inline-block ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`
                  }
                >
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200 inline-block ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Add Product Button */}
            <button
              onClick={() => dispatch(toggleAddProductModal())}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition cursor-pointer transform active:scale-95"
              title="Add New Shoe Product"
            >
              <FaPlus className="text-xs" />
              <span>Add Product</span>
            </button>

            {/* Order Icon */}
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `relative p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                }`
              }
              title="View Orders History (Order Icon)"
            >
              <FaClipboardList className="text-lg" />
              {orderCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {orderCount}
                </span>
              )}
            </NavLink>

            {/* User Status */}
            {user ? (
              <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs border border-slate-200">
                <span className="font-bold text-slate-800 truncate max-w-[110px]">
                  {user.name}
                </span>
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="text-red-600 font-bold hover:underline ml-1 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/cart"
                className="hidden lg:inline text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl transition shadow-xs"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* Add Product Modal */}
      <AddProductModal />
    </>
  )
}

export default Navbar
