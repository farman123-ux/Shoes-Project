import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DashBoard from './bashboard/DashBoard'

import RunningShoes from './category/running/RunningShoes'
import AllShoes from './category/all/AllShoes'
import BasketBallShoes from './category/basketball/BasketBallShoes'
import CausalShoes from './category/causal/CausalShoes'
import FormalShoes from './category/formal/FormalShoes'
import SportsShoes from './category/Sports/SportsShoes'
import ChildShoes from './category/child/ChildShoes'

import { runnig } from '../../constant/running'
import { causalShoes } from '../../constant/causal'
import { sportsShoes } from '../../constant/sports'
import { basketballShoes } from '../../constant/basketBall'
import { formalShoes } from '../../constant/formal'
import { childShoes } from '../../constant/childrenShoes'

function Product({ initialCategory = 'all', categoryRoutes = {} }) {
    const navigate = useNavigate()
    const { customProducts = [] } = useSelector((state) => state.product)

    const [price, setPrice] = useState('featured')
    const [searchQuery, setSearchQuery] = useState('')
    const activeCategory = initialCategory

    const changeCategory = (category) => {
        navigate(categoryRoutes[category])
    }

    const filterAndSortProducts = (products) => {
        let filtered = [...products]

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim()
            filtered = filtered.filter(
                (p) =>
                    p.heading?.toLowerCase().includes(q) ||
                    p.para?.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q)
            )
        }

        if (price === 'low-to-high') {
            return filtered.sort((a, b) => a.price - b.price)
        }

        if (price === 'high-to-low' || price === 'highest') {
            return filtered.sort((a, b) => b.price - a.price)
        }

        return filtered
    }

    const customRunning = customProducts.filter(
      (p) => p.category === 'running' || p.para?.toLowerCase() === 'running'
    )
    const customCausal = customProducts.filter(
      (p) => p.category === 'causal' || p.para?.toLowerCase() === 'causal' || p.para?.toLowerCase() === 'casual'
    )
    const customSports = customProducts.filter(
      (p) => p.category === 'sports' || p.para?.toLowerCase() === 'sports'
    )
    const customBasketball = customProducts.filter(
      (p) => p.category === 'basketball' || p.para?.toLowerCase() === 'basketball'
    )
    const customFormal = customProducts.filter(
      (p) => p.category === 'formal' || p.para?.toLowerCase() === 'formal'
    )
    const customChild = customProducts.filter(
      (p) => p.category === 'child' || p.para?.toLowerCase() === 'child'
    )

    const allShoes = [
        ...customProducts,
        ...runnig,
        ...causalShoes,
        ...sportsShoes,
        ...basketballShoes,
        ...formalShoes,
        ...childShoes
    ]

    const runningList = [...customRunning, ...runnig]
    const causalList = [...customCausal, ...causalShoes]
    const sportsList = [...customSports, ...sportsShoes]
    const basketballList = [...customBasketball, ...basketballShoes]
    const formalList = [...customFormal, ...formalShoes]
    const childList = [...customChild, ...childShoes]

    const sortedAllShoes = filterAndSortProducts(allShoes)
    const sortedRunning = filterAndSortProducts(runningList)
    const sortedCausal = filterAndSortProducts(causalList)
    const sortedSports = filterAndSortProducts(sportsList)
    const sortedBasketball = filterAndSortProducts(basketballList)
    const sortedFormal = filterAndSortProducts(formalList)
    const sortedChild = filterAndSortProducts(childList)

    const categoryDetails = {

        all: {
            totalProducts: sortedAllShoes.length,
            categoryName: 'All Products',
            component: <AllShoes products={sortedAllShoes} />,
        },

        running: {
            totalProducts: sortedRunning.length,
            categoryName: 'Running Products',
            component: <RunningShoes products={sortedRunning} />,
        },

        causal: {
            totalProducts: sortedCausal.length,
            categoryName: 'Causal Products',
            component: <CausalShoes products={sortedCausal} />,
        },

        sports: {
            totalProducts: sortedSports.length,
            categoryName: 'Sports Products',
            component: <SportsShoes products={sortedSports} />,
        },

        basketball: {
            totalProducts: sortedBasketball.length,
            categoryName: 'BasketBall Products',
            component: <BasketBallShoes products={sortedBasketball} />,
        },

        formal: {
            totalProducts: sortedFormal.length,
            categoryName: 'Formal Products',
            component: <FormalShoes products={sortedFormal} />,
        },

        child: {
            totalProducts: sortedChild.length,
            categoryName: 'Child Shoes',
            component: <ChildShoes products={sortedChild} />,
        },
    }

    const selectedCategory = categoryDetails[activeCategory] || categoryDetails.all

    return (

        <div className='mt-16 bg-slate-50/80 px-4 pb-16 min-h-screen'>

            {/* Premium Hero Banner */}
            <div className='mb-10 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 px-8 py-20 text-center text-white shadow-2xl shadow-blue-600/20'>
                <div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none' />
                <div className='absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none' />

                <span className='inline-block rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-widest text-cyan-200 border border-white/20 mb-3'>
                  Premium Footwear Catalog
                </span>

                <h1 className='text-4xl md:text-6xl font-black tracking-tight drop-shadow-sm'>
                    Our Footwear Collection
                </h1>

                <p className='mt-3 text-lg md:text-xl font-medium text-blue-100 max-w-2xl mx-auto'>
                    Find your perfect pair from our curated selection of high-performance & luxury shoes.
                </p>
            </div>

            <DashBoard
                activeCategory={activeCategory}
                setActiveCategory={changeCategory}
                totalProducts={selectedCategory.totalProducts}
                categoryName={selectedCategory.categoryName}
                price={price}
                setPrice={setPrice}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            >

                {selectedCategory.component}

            </DashBoard>

        </div>
    )
}

export default Product
