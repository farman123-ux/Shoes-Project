import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaBoxOpen, FaChevronRight, FaShoePrints } from 'react-icons/fa'

export default function DetailNavbar({ shoeName = '', categoryName = '' }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-6 py-3.5 rounded-2xl border border-blue-100 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-blue-600 transition text-gray-700"
          >
            <FaHome className="text-blue-500" /> Home
          </Link>

          <FaChevronRight className="text-xs text-gray-400" />

          <Link
            to="/product"
            className="flex items-center gap-1.5 hover:text-blue-600 transition text-gray-700"
          >
            <FaBoxOpen className="text-blue-500" /> Product
          </Link>

          {categoryName && (
            <>
              <FaChevronRight className="text-xs text-gray-400" />
              <span className="text-gray-500 capitalize">{categoryName}</span>
            </>
          )}

          <FaChevronRight className="text-xs text-gray-400" />

          <span className="text-blue-700 font-extrabold flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
            <FaShoePrints className="text-blue-600 text-xs" />
            {shoeName}
          </span>
        </div>

        <Link
          to="/product"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← Back to Catalog
        </Link>
      </div>
    </nav>
  )
}
