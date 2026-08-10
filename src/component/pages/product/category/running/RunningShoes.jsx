import React from 'react'
import { runnig } from '../../../../constant/running.js'
import { useNavigate } from 'react-router-dom'

function RunningShoes({ products = runnig }) {

  const navigate = useNavigate()

  return (
    <div className='py-10'>

      <div className='flex flex-wrap justify-around gap-8 px-5'>

        { 
          products.map((product) => {
            return (

              <div
                key={product.id}
                onClick={() => navigate(
                  `/product/running-shoes/${encodeURIComponent(product.heading)}`,
                  { state: { product } }
                )}
                className='cursor-pointer'
              >

                <div>

                  <div className='group h-110 w-70 rounded-[20px] bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]'>

                    <div className='relative h-70 w-full overflow-hidden rounded-[20px_20px_0_0]'>

                      <img
                        src={product.Image}
                        alt={product.heading}
                        className='h-full w-full object-contain transition-all duration-300 group-hover:scale-110'
                      />

                      <div className='absolute left-2 top-3 rounded-2xl bg-white/70 px-2.5 py-0.5 text-black border border-dashed'>
                        Running
                      </div>

                    </div>

                    <div className='mx-3 my-2 flex flex-col p-1'>

                      <p className='py-2 text-red-900/60'>
                        {product.para}
                      </p>

                      <h1 className='font-bold transition-colors duration-300 group-hover:text-blue-700'>
                        {product.heading}
                      </h1>

                      <div className='flex gap-2 items-center px-0.5 py-1'>

                        <img
                          src={product.icon}
                          alt=""
                          className='w-3.5 h-3.5'
                        />

                        <p>{product.rat}</p>

                      </div>

                      <div className='flex items-center gap-1 p-0.5'>

                        <span className='text-sm mt-2 font-semibold text-blue-700'>
                          {product.Currancy || product.currancy}
                        </span>

                        <h1 className='font-bold text-2xl text-blue-700'>
                          {product.price}
                        </h1>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )
          })
        }

      </div>

    </div>
  )
}

export default RunningShoes
