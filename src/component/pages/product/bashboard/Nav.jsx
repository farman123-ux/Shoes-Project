import React from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa'

function Nav({ totalProducts = 0, categoryName = 'Products', price, setPrice, searchQuery, setSearchQuery }) {
  return (
    <div className="border-b border-slate-200/80 bg-white px-8 py-5 shadow-2xs">
      <nav className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
            {categoryName}
          </span>
          <h3 className="mt-0.5 text-3xl font-black text-slate-900">
            {totalProducts} <span className="text-sm font-bold text-slate-400 font-sans">Products Available</span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-11 min-w-[240px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-slate-500 gap-2 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-2xs">
            <FaSearch className="text-slate-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-transparent text-xs font-semibold outline-none placeholder:text-slate-400 text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 shadow-2xs hover:border-slate-300 transition-all">
            <FaFilter className="text-blue-500 text-xs" />
            <select
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 cursor-pointer outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low-to-high">Price: Low To High</option>
              <option value="high-to-low">Price: High To Low</option>
              <option value="highest">Highest Price</option>
            </select>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
