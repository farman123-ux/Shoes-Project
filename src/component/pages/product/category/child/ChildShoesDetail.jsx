import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { childShoes } from '../../../../constant/childrenShoes'
import { childDetail } from '../../../../constant/details/child'

function ChildShoesDetail() {
  const { heading } = useParams()
  const { state } = useLocation()
  const [calculate, setCalculate] = useState(1)
  const [smallsize, setSmallsize] = useState(null)
  const [inc, setInc] = useState(false)
  const [dec, setDec] = useState(false)
  const [active, setActive] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const productHeading = decodeURIComponent(heading || "")
  const productState = state?.product
  const compareProduct = childShoes.find((product) => product.heading === productHeading)
  const product = productState || compareProduct

  if (!product) {
    return (
      <div className='mt-30 px-6 text-center'>
        <h1 className='text-3xl font-bold'>Product not Found</h1>
      </div>
    )
  }

  const currentProduct = childDetail.find((item) => item.id === product?.id)
  if (!currentProduct) {
    return (
      <div className='mt-30 px-6 text-center'>
        <h1 className='text-3xl font-bold'>Product not Found</h1>
      </div>
    )
  }

  const [mainimage, setMainimage] = useState(product?.Image || "")
  const images = currentProduct?.ImageA ?? []
  const sizes = currentProduct?.Size ?? []
  const icons = currentProduct?.IconA ?? []

  useEffect(() => {
    setMainimage(product?.Image || "")
    setCalculate(1)
    setSmallsize(null)
  }, [product?.Image])

  const increment = () => {
    setCalculate(calculate + 1)
    setInc(true)
  }

  const decrement = () => {
    if (calculate > 1) {
      setCalculate(calculate - 1)
      setDec(true)
      setShowMessage(false)
    } else {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 4000)
    }
  }

  const subtotal = product?.price * calculate
  const tax = subtotal * 0
  const delivery = Math.max(500 + (calculate - 1) * 400)
  const total = subtotal + tax + delivery
    return (
      <div className='mt-30'>
        <div className=' p-5 flex gap-10 items-start justify-between'>
          <div className='w-1/2'>
            <div className='object-cover border border-gray-600/20 p-3 rounded-lg bg-gray-400/20'>
              <img
                src={mainimage}
                alt={product.heading}
                className='w-full h-125 border rounded-lg  border-gray-600/20 bg-white object-contain'
              />
            </div>
          </div>
          <div className='w-1/2'>
            <div>
              <p className='px-2 py-1.5 w-20 rounded-2xl bg-gray-400'>
                {product.para}
              </p>

              <h1 className='font-bold text-4xl mt-2'>
                {product.heading}
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
              <h1>{product.Currancy || product.currancy}</h1>
              <h1>{product.price}</h1>
            </div>

            <div className='py-1 px-1  flex gap-3 mt-5 flex-wrap'>
              {images.map((img, index) => (
                <div key={index} className='object-cover p-2'>
                  <img
                    src={img}
                    alt={product.para}
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
            <div className="mt-6">
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={decrement}
                  className={`px-4 py-2 rounded ${dec ? "bg-red-500 text-white" : "bg-gray-300"
                    }`}
                >
                  -
                </button>

                <span className="mx-4 text-lg font-semibold">
                  {calculate}
                </span>

                <button
                  onClick={increment}
                  className={`px-4 py-2 rounded ${inc ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
                >
                  +
                </button>
              </div>

              {showMessage && (
                <div className="flex justify-center mt-3">
                  <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md text-sm shadow-md">
                    You cannot buy less than 1 item.
                  </div>
                </div>
              )}
            </div>

            <div className='mt-8 mx-auto border border-red-400/40 p-2 w-90  rounded-lg bg-red-400/30'>
              <div className=' border rounded-lg  border-red-400/10 bg-white'>
                <div className=' flex justify-between'>
                  <p className='border-r-2 py-2 px-4 w-1/2 '>subtotal</p>
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
            <div className='justify-center flex mt-5 '>
                <button onClick={() => setActive(!active)} className={`px-5 py-3 rounded text-white cursor-pointer   ${active ? "bg-green-500" : "bg-red-500"
                  }`}>Add To card</button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  export default ChildShoesDetail
