import React from 'react'
import { useNavigate } from 'react-router-dom'
import { runnig } from '../../../../constant/running'
import { causalShoes } from '../../../../constant/causal'
import { sportsShoes } from '../../../../constant/sports'
import { basketballShoes } from '../../../../constant/basketBall'
import { formalShoes } from '../../../../constant/formal'
import { childShoes } from '../../../../constant/childrenShoes'
import iconStar from '../../../../../assets/start.svg'

const defaultProducts = [
  ...runnig,
  ...causalShoes,
  ...sportsShoes,
  ...basketballShoes,
  ...formalShoes,
  ...childShoes,
]

function AllShoes({ products = defaultProducts }) {
  const navigate = useNavigate()

  const getRouteForProduct = (product) => {
    const category = (product.para || product.category || '').toLowerCase()
    const encodedHeading = encodeURIComponent(product.heading || 'shoe')

    if (category.includes('running')) return `/product/running-shoes/${encodedHeading}`
    if (category.includes('causal') || category.includes('casual')) return `/product/causal-shoes/${encodedHeading}`
    if (category.includes('sport')) return `/product/sport-shoes/${encodedHeading}`
    if (category.includes('basket')) return `/product/basketball-shoes/${encodedHeading}`
    if (category.includes('formal')) return `/product/formal-shoes/${encodedHeading}`
    if (category.includes('child')) return `/product/childs-shoes/${encodedHeading}`

    return `/product/running-shoes/${encodedHeading}`
  }

  return (
    <div className="py-10">
      <div className="flex flex-wrap justify-around gap-8 px-5">
        {products.map((product, idx) => {
          return (
            <div
              key={`${product.para}-${product.id || idx}`}
              onClick={() => navigate(getRouteForProduct(product), { state: { product } })}
              className="cursor-pointer"
            >
              <div>
                <div className="group h-110 w-70 rounded-[20px] bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]">
                  <div className="relative h-70 w-full overflow-hidden rounded-[20px_20px_0_0]">
                    <img
                      src={product.Image}
                      alt={product.heading}
                      className="h-full w-full object-contain transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute left-2 top-3 rounded-2xl bg-white/70 px-2.5 py-0.5 text-black border border-dashed">
                      {product.para}
                    </div>
                  </div>

                  <div className="mx-3 my-2 flex flex-col p-1">
                    <p className="py-2 text-red-900/60">{product.para}</p>

                    <h1 className="font-bold transition-colors duration-300 group-hover:text-blue-700 line-clamp-1">
                      {product.heading}
                    </h1>

                    <div className="flex gap-2 items-center px-0.5 py-1">
                      <img
                        src={product.icon || iconStar}
                        alt=""
                        className="w-3.5 h-3.5"
                      />
                      <p className="text-sm font-semibold">{product.rat || 4.8}</p>
                    </div>

                    <div className="flex items-center gap-1 p-0.5">
                      <span className="text-sm mt-2 font-semibold text-blue-700">
                        {product.Currancy || product.currancy || 'PKR'}
                      </span>
                      <h1 className="font-bold text-2xl text-blue-700">
                        {product.price}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllShoes
