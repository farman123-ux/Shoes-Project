import React from 'react'

function Nav({ totalProducts = 0, categoryName = 'Products', price, setPrice }) {
  return (
    <div className='border-b border-slate-200 bg-white px-6 py-5'>
      <nav className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold text-slate-500'>Total {categoryName}</p>
          <h3 className='mt-1 text-3xl font-bold text-slate-950'>{totalProducts}</h3>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <div className='flex h-11 min-w-[260px] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-500'>
            <input
              type='text'
              placeholder='Search shoes'
              className='w-full bg-transparent text-sm outline-none placeholder:text-slate-400'
            />
          </div>

          <div className="flex items-center h-12 px-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300">
            <select
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 cursor-pointer pr-6"
            >
              <option value='featured'>Featured</option>
              <option value='low-to-high'>Price: Low To High</option>
              <option value='high-to-low'>Price: High To Low</option>
              <option value='highest'>Highest Price</option>
            </select>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
