import React from 'react'
import {
  FaThLarge,
  FaRunning,
  FaWalking,
  FaFootballBall,
  FaBasketballBall,
  FaUserTie,
  FaChild,
} from 'react-icons/fa'

function SideBar({ activeCategory, setActiveCategory }) {
  const categories = [
    { id: 'all', name: 'All Collection', icon: FaThLarge },
    { id: 'running', name: 'Running Shoes', icon: FaRunning },
    { id: 'causal', name: 'Casual Shoes', icon: FaWalking },
    { id: 'sports', name: 'Sports Shoes', icon: FaFootballBall },
    { id: 'basketball', name: 'BasketBall Shoes', icon: FaBasketballBall },
    { id: 'formal', name: 'Formal Shoes', icon: FaUserTie },
    { id: 'child', name: 'Child Shoes', icon: FaChild },
  ]

  return (
    <div className='h-full min-h-[720px] w-[270px] border-r border-slate-200/80 bg-white px-5 py-8 shadow-xs'>
      <div className='mb-8'>
        <p className='text-[10px] font-black uppercase tracking-widest text-blue-600'>
          Catalog Navigation
        </p>
        <h2 className='mt-1 text-2xl font-black text-slate-900 tracking-tight'>
          Categories
        </h2>
      </div>

      <div className='flex flex-col gap-2'>
        {categories.map((category) => {
          const isActive = activeCategory === category.id
          const IconComp = category.icon

          return (
            <button
              key={category.id}
              type='button'
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <IconComp className={`text-base ${isActive ? 'text-white' : 'text-blue-500'}`} />
              <span>{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
