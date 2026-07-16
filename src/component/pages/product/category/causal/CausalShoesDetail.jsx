import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { causalShoes } from '../../../../constant/causal'
import { causalShoesDetails } from '../../../../constant/details/causal'

function CausalShoesDetail() {
  const {heading} = useParams()
  const location = useLocation()
  const [smallsize, setSmallsize] = useState(null)
  const [calculate, setCalculate] = useState(1)
  const [ince, setInc] = useState(false)
  const [drec, setdrec] = useState(false)
  const axisHeading = decodeURIComponent(heading || '-')
  const selectedProduct = location.state?.product
  const match = causalShoes.find((item) => item.id === selectedProduct?.id)
  const products = match || selectedProduct
  const details = causalShoesDetails.find((product) => product.id === products?.id)

  if (!products || !details) {
    return (
      <div className='p-5 mt-25 text-center text-xl font-semibold'>
        Shoes not found.
      </div>
    )
  }

  const images = details?.ImageA ?? []
  const icons = details?.IconA ?? []
  const sizes = details?.Size ?? []
   
  const [mainimage, setMainimage] = useState(products?.Image || '')

  useEffect(() => {
    setMainimage(products?.Image || ' ')
    setSmallsize(null)
    setCalculate(1)
  }, [products?.Image])

  // Fix: useLocation() returns a location object whose state is stored in location.state.
  // The previous code used state?.product directly, so the passed product never reached this page.
  const increment = () => {
    setCalculate(calculate + 1)
    setInc(true)
  }
  const decrement = () => {
    if (calculate > 1) {
      setCalculate(calculate - 1)
      setdrec(true)
    }
  }

  const subtotal = products.price * calculate
  const tax = 0
  const delivery = 500 + (calculate -1) * 400
  const total = subtotal + tax + delivery

  return (
     <div className='mt-30'>
         <div className=' p-5 flex gap-10 items-start justify-between'>
           <div className='w-1/2'>
             <div className='object-cover border border-gray-600/20 p-3 rounded-lg bg-gray-400/20'>
               <img
                 src={mainimage}
                 alt={products.heading}
                 className='w-full h-[500px] border rounded-lg  border-gray-600/20 bg-white object-contain'
               />
             </div>
           </div>
           <div className='w-1/2'>
             <div>
               <p className='px-2 py-1.5 w-20 rounded-2xl bg-gray-400'>
                 {products.para}
               </p>
   
               <h1 className='font-bold text-4xl mt-2'>
                 {products.heading}
               </h1>
             </div>
   
             <div className='mt-3 flex items-center gap-0.5'>
               {icons.map((icon, index) => (
                 <div key={index} className='flex gap-0.5'>
                   {typeof icon === 'string' ? (
                     <img src={icon} alt='' className='h-4 w-4 ' />
                   ) : (
                     React.createElement(icon, { className: 'h-5 w-5' })
                   )}
                 </div>
               ))}
             </div>
   
             <div className='flex gap-1 font-bold text-2xl text-blue-500 mt-3'>
               <h1>{products.Currancy || products.currancy}</h1>
               <h1>{products.price}</h1>
             </div>
   
             <div className='py-1 px-1  flex gap-3 mt-5 flex-wrap'>
               {images.map((img, index) => (
                 <div key={index} className='object-cover p-2'>
                   <img
                     src={img}
                     alt={products.para}
                     onMouseEnter={() => setMainimage(img)}
                     className={`w-20 h-20 border rounded-md object-contain cursor-pointer ${mainimage === img
                       ? 'border-black'
                       : 'border-gray-300'
                       }`}
                   />
                 </div>
               ))}
             </div>
             <div className='mt-5'>
               <h2 className='font-semibold mb-2'>Size</h2>
   
               <div className='flex gap-3 flex-wrap'>
                 {sizes.map((size) => (
                   <button
                     key={size}
                     className={`py-3 px-5 border font-semibold ${smallsize === size
                       ? 'bg-blue-600 text-white rounded-lg'
                       : 'bg-white text-black '
                       }`}
                     onClick={() => setSmallsize(size)}
                   >
                     {size}
                   </button>
                 ))}
               </div>
             </div>
             <div className='flex items-center gap-5 mt-6'>
            <button
              onClick={decrement}
              className={`px-4 py-2 rounded ${drec ? "bg-red-500 text-white" : "bg-gray-300"
                }`}
            >
              -
            </button>

            <span className="mx-4">{calculate}</span>

            <button
              onClick={increment}
              className={`px-4 py-2 rounded ${ince ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
            >
              +
            </button>
          </div>
   
             <div className='mt-8 mx-auto border border-red-400/40 p-2 w-90  rounded-lg bg-red-400/30'>
               <div className=' border rounded-lg  border-red-400/10 bg-white'>
                 <div className=' flex justify-between'>
                   <p className='border-r-2 py-2 px-4 w-1/2 '>Subtotal</p>
                   <p className='py-2 px-4 w-1/2 font-bold'>{subtotal}</p>
                 </div>
                 <div className=' flex justify-between'>
                   <p className='border-r-2 py-2 px-4 w-1/2'>Tax</p>
                   <p className='py-2 px-4 w-1/2 font-bold'>{tax}</p>
                 </div>
   
                 <div className='flex justify-between'>
                   <p className='border-r-2 py-2 px-4 w-1/2'>Delivery</p>
                   <p className='py-2 px-4 w-1/2 font-bold'>{delivery}</p>
                 </div>
                 <div className='border-t-2 flex justify-between font-bold'>
                   <p className='border-r-2 py-2 px-4 w-1/2'>Total</p>
                   <p className='py-2 px-4 w-1/2 '>{total}</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
  )
}

export default CausalShoesDetail
