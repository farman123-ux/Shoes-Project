import React from 'react'
import { formalShoes } from '../../../../constant/formal'
import { useNavigate } from 'react-router-dom'

function FormalShoes({products = formalShoes}) {
  const navigate = useNavigate()

  // Use a true onClick handler on the card container.
  // This ensures the clicked card sends the proper product state
  // and the route resolves the correct formal product detail.
   return (
    <div className='py-10'>
      <div className='flex flex-wrap justify-around gap-8 px-5'>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/formal-shoes/${encodeURIComponent(product.heading)}`, { state: { product } })}
            className='group h-110 w-70 rounded-[20px] bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] cursor-pointer'>
              <div className='relative h-70 object-cover w-full overflow-hidden rounded-[20px_20px_0_0]'>
                <img src={product.Image} alt={product.heading} className='h-full w-full rounded-[20px_20px_0_0] object-contain transition-all duration-300 group-hover:scale-110'/>
                <div className='absolute left-2 top-3 rounded-2xl bg-white/10 px-2.5 py-0.5  text-black border-1 border-dashed'>
                  Formal
                </div>
              </div>
              
              <div className='mx-3 my-2 flex flex-col p-1'>
                <p className='py-2 text-red-900/60'>{product.para}</p>

                <h1 className=' font-bold transition-colors duration-300 group-hover:text-blue-700'>
                  {product.heading}
                </h1>
                <div className='flex gap-2 items-center px-0.5 py-1'>
                  <img src={product.icon} alt="" className='w-3.5 h-3.5 '/>
                  <p>{product.rat}</p>
                  <p className='pr-3 text-black/50'>{product.order}</p>
                </div>
                <div className='flex items-center gap-1 p-0.5'>
                  <span className='text-sm mt-2 font-semibold text-blue-700'>{product.Currancy}</span>
                  <h1 className='font-bold text-2xl text-blue-700'>{product.price}</h1>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}


export default FormalShoes
