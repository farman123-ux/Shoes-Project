import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const [price, setPrice] = useState('featured')
    const activeCategory = initialCategory

    const changeCategory = (category) => {
        // The route paths come from App.jsx, so this page only triggers navigation.
        navigate(categoryRoutes[category])
    }

    const sortProducts = (products) => {

        const sortedProducts = [...products]

        if (price === 'low-to-high') {
            return sortedProducts.sort((a, b) => a.price - b.price)
        }

        if (price === 'high-to-low' || price === 'highest') {
            return sortedProducts.sort((a, b) => b.price - a.price)
        }

        return sortedProducts
    }

    const allShoes = [
        ...runnig,
        ...causalShoes,
        ...sportsShoes,
        ...basketballShoes,
        ...formalShoes,
        ...childShoes
    ]

    const sortedAllShoes = sortProducts(allShoes)
    const sortedRunning = sortProducts(runnig)
    const sortedCausal = sortProducts(causalShoes)
    const sortedSports = sortProducts(sportsShoes)
    const sortedBasketball = sortProducts(basketballShoes)
    const sortedFormal = sortProducts(formalShoes)
    const sortedChild = sortProducts(childShoes)

    const totalAllProducts = allShoes.length

    const categoryDetails = {

        all: {
            totalProducts: totalAllProducts,
            categoryName: 'All Products',
            component: <AllShoes products={sortedAllShoes} />,
        },

        running: {
            totalProducts: runnig.length,
            categoryName: 'Running Products',
            component: <RunningShoes products={sortedRunning} />,
        },

        causal: {
            totalProducts: causalShoes.length,
            categoryName: 'Causal Products',
            component: <CausalShoes products={sortedCausal} />,
        },

        sports: {
            totalProducts: sportsShoes.length,
            categoryName: 'Sports Products',
            component: <SportsShoes products={sortedSports} />,
        },

        basketball: {
            totalProducts: basketballShoes.length,
            categoryName: 'BasketBall Products',
            component: <BasketBallShoes products={sortedBasketball} />,
        },

        formal: {
            totalProducts: formalShoes.length,
            categoryName: 'Formal Products',
            component: <FormalShoes products={sortedFormal} />,
        },

        child: {
            totalProducts: childShoes.length,
            categoryName: 'Child Shoes',
            component: <ChildShoes products={sortedChild} />,
        },
    }

    const selectedCategory = categoryDetails[activeCategory]

    return (

        <div className='mt-15 bg-blue-50 px-4 pb-10'>

            <div className='mb-8 bg-blue-600 px-6 py-26 text-center text-white'>

                <h1 className='text-5xl font-bold'>
                    Our Collection
                </h1>

                <p className='mt-3 text-2xl'>
                    Find your perfect pair from our premium selection
                </p>

            </div>
            <DashBoard
                activeCategory={activeCategory}
                setActiveCategory={changeCategory}
                totalProducts={selectedCategory.totalProducts}
                categoryName={selectedCategory.categoryName}
                price={price}
                setPrice={setPrice}
            >

                {selectedCategory.component}

            </DashBoard>

        </div>
    )
}

export default Product
