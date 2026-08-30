import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { causalShoes } from '../../../../constant/causal.js'
import { causalShoesDetails } from '../../../../constant/details/causal.js'
import { addToCart } from '../../../../../store/cartSlice.js'
import iconStar from '../../../../../assets/start.svg'
import DetailNavbar from '../../../../DetailNavbar.jsx'

function CausalShoesDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { customProducts = [] } = useSelector((state) => state.product)
  const { user } = useSelector((state) => state.order)

  const { heading } = useParams()
  const location = useLocation()
  const [smallsize, setSmallsize] = useState('41')
  const [calculate, setCalculate] = useState(1)
  const [ince, setInc] = useState(false)
  const [drec, setdrec] = useState(false)

  const axisHeading = decodeURIComponent(heading || '')
  const selectedProduct = location.state?.product
  const productFromUrl =
    customProducts.find((p) => p.heading === axisHeading) ||
    causalShoes.find((item) => item.heading === axisHeading)
  const products = selectedProduct || productFromUrl
  const details = causalShoesDetails.find((product) => product.id === products?.id)

  if (!products) {
    return (
      <div className='p-5 mt-25 text-center text-xl font-semibold'>
        Shoes not found.
      </div>
    )
  }

  const images = details?.ImageA ?? (products?.Image ? [products.Image] : [])
  const constantSizes = ['39', '40', '41', '42', '43', '44', '45']

  const [mainimage, setMainimage] = useState(products?.Image || '')

  useEffect(() => {
    setMainimage(products?.Image || '')
    setSmallsize('41')
    setCalculate(1)
  }, [products?.Image])

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
  const delivery = Math.max(500 + (calculate - 1) * 400)
  const total = subtotal + tax + delivery

  const handleAddToCart = () => {
    const activeSize = smallsize || '41'

    const cartPayload = {
      id: products.id || `${Date.now()}`,
      heading: products.heading,
      para: products.para || 'Casual',
      Image: mainimage || products.Image,
      category: 'causal',
      size: activeSize,
      price: products.price,
      currency: products.Currancy || products.currancy || 'PKR',
      quantity: calculate,
      subtotal,
      delivery,
      tax,
      total,
    }

    dispatch(addToCart(cartPayload))

    if (user) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className='mt-24 px-4 md:px-10 pb-16 max-w-7xl mx-auto'>
      <DetailNavbar shoeName={products.heading} categoryName="Casual" />

      <div className='p-5 flex flex-col md:flex-row gap-10 items-start justify-between bg-white rounded-2xl border border-gray-200 shadow-sm'>
        {/* Left Side - Original Image Design */}
        <div className='w-full md:w-1/2 space-y-4'>
          <div className='object-cover border border-gray-600/20 p-3 rounded-lg bg-gray-400/20'>
            <img
              src={mainimage}
              alt={products.heading}
              className='w-full h-125 border rounded-lg border-gray-600/20 bg-white object-contain'
            />
          </div>

          <div className='rounded-xl border border-blue-200 bg-blue-50/50 p-4 space-y-2 text-xs text-gray-700'>
            <h3 className='font-bold text-sm text-blue-900 border-b border-blue-200 pb-1'>
              Brand Quality & Shoe Specifications
            </h3>
            <p><strong>Brand Quality:</strong> {products.brandQuality || 'Casual Elegance & Daily Comfort'}</p>
            <p><strong>Sole Type:</strong> Anti-Slip Rubber & Flexible Sole</p>
            <p><strong>Material:</strong> Soft Synthetic & Breathable Fabric</p>
            <p><strong>Warranty:</strong> 100% Quality Guarantee</p>
          </div>
        </div>

        {/* Right Side */}
        <div className='w-full md:w-1/2'>
          <div>
            <p className='px-3 py-1 text-xs font-bold rounded-2xl bg-blue-100 text-blue-800 w-max'>
              {products.para || 'Casual'}
            </p>

            <h1 className='font-bold text-4xl mt-2 text-gray-900'>
              {products.heading}
            </h1>
          </div>

          <div className='mt-3 flex items-center gap-2'>
            <img src={products.icon || iconStar} alt='Star Rating' className='h-4 w-4' />
            <span className='font-bold text-sm text-gray-800'>{products.rat || 4.8} / 5.0</span>
            <span className='text-xs text-gray-500'>(Customer Favorite)</span>
          </div>

          <div className='flex gap-2 font-bold text-3xl text-blue-600 mt-4 items-center'>
            <span>{products.Currancy || products.currancy || 'PKR'}</span>
            <span>{products.price}</span>
          </div>

          {images.length > 0 && (
            <div className='py-1 px-1 flex gap-3 mt-5 flex-wrap'>
              {images.map((img, index) => (
                <div key={index} className='object-cover p-2'>
                  <img
                    src={img}
                    alt={products.para}
                    onMouseEnter={() => setMainimage(img)}
                    className={`w-20 h-20 border rounded-md object-contain cursor-pointer ${
                      mainimage === img ? 'border-black' : 'border-gray-300'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className='mt-5'>
            <h2 className='font-semibold mb-2 text-gray-800'>Available Shoe Sizes</h2>

            <div className='flex gap-3 flex-wrap'>
              {constantSizes.map((size) => (
                <button
                  key={size}
                  className={`py-3 px-5 border font-semibold rounded-lg transition cursor-pointer ${
                    smallsize === size
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                  onClick={() => setSmallsize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-5 mt-6 justify-center md:justify-start'>
            <button
              onClick={decrement}
              className={`px-4 py-2 rounded font-bold transition cursor-pointer ${
                drec ? 'bg-red-500 text-white' : 'bg-gray-300'
              }`}
            >
              -
            </button>

            <span className='mx-4 text-lg font-bold text-gray-900'>{calculate}</span>

            <button
              onClick={increment}
              className={`px-4 py-2 rounded font-bold transition cursor-pointer ${
                ince ? 'bg-green-500 text-white' : 'bg-gray-300'
              }`}
            >
              +
            </button>
          </div>

          <div className='mt-8 mx-auto border border-red-400/40 p-2 w-90 rounded-lg bg-red-400/30'>
            <div className='border rounded-lg border-red-400/10 bg-white'>
              <div className='flex justify-between'>
                <p className='border-r-2 py-2 px-4 w-1/2'>Subtotal</p>
                <p className='py-2 px-4 w-1/2 font-bold'>PKR {subtotal}</p>
              </div>
              <div className='flex justify-between'>
                <p className='border-r-2 py-2 px-4 w-1/2'>Tax</p>
                <p className='py-2 px-4 w-1/2 font-bold'>PKR {tax}</p>
              </div>
              <div className='flex justify-between'>
                <p className='border-r-2 py-2 px-4 w-1/2'>Delivery</p>
                <p className='py-2 px-4 w-1/2 font-bold'>PKR {delivery}</p>
              </div>
              <div className='border-t-2 flex justify-between font-bold text-blue-900'>
                <p className='border-r-2 py-2 px-4 w-1/2'>Total</p>
                <p className='py-2 px-4 w-1/2'>PKR {total}</p>
              </div>
            </div>
          </div>

          <div className='justify-center flex mt-5'>
            <button
              onClick={handleAddToCart}
              className='px-8 py-3.5 rounded-xl text-white font-bold bg-red-600 hover:bg-green-600 transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-0.5'
            >
              Add To card
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CausalShoesDetail
