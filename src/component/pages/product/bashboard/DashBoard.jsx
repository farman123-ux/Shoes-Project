import React from 'react'
import Nav from './Nav'
import SideBar from './SideBar'

function DashBoard({
  children,
  totalProducts = 0,
  categoryName = 'Products',
  activeCategory,
  setActiveCategory,
  price,
  setPrice,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className='mx-auto flex max-w-[1400px] overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 shadow-sm'>
      <div className='hidden lg:block'>
        <SideBar activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
      </div>
      <div className='w-full min-w-0'>
        <Nav
          totalProducts={totalProducts}
          categoryName={categoryName}
          price={price}
          setPrice={setPrice}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className='bg-blue-50'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashBoard
