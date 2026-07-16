import React from 'react'

function SideBar({ activeCategory, setActiveCategory }) {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'running', name: 'Running' },
    { id: 'causal', name: 'Causal' },
    { id: 'sports', name: 'Sports' },
    { id: 'basketball', name: 'BasketBall' },
    { id: 'formal', name: 'Formal' },
    { id: 'child', name: 'ChildShoes' },
  ]

  return (
    <div className='h-full min-h-[720px] w-[260px] border-r border-slate-200 bg-white px-4 py-6 shadow-sm'>
      <div className='mb-8'>
        <p className='text-xs font-bold uppercase tracking-[0.18em] text-slate-400'>Dashboard</p>
        <h2 className='mt-2 text-2xl font-bold text-slate-900'>Categories</h2>
      </div>

      <div className='flex flex-col gap-2'>
        {categories.map((category) => {
          const isActive = activeCategory === category.id

          return (
            <button
              key={category.id}
              type='button'
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
            >
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
