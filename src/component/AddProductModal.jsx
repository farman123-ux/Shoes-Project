import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAddProductOpen, addProduct } from '../store/productSlice'
import { FaTimes, FaPlusCircle, FaShoePrints, FaFileUpload, FaLink } from 'react-icons/fa'

// Fallback default shoe image
import defaultRunningImg from '../assets/runningshoes/running1-1.jpg'
import iconStar from '../assets/start.svg'

export default function AddProductModal() {
  const dispatch = useDispatch()
  const { isAddProductOpen } = useSelector((state) => state.product)

  const [heading, setHeading] = useState('')
  const [category, setCategory] = useState('running')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('PKR')
  const [rating, setRating] = useState('4.8')
  const [brandQuality, setBrandQuality] = useState('Premium Quality & Cushion Sole')
  const [customImageUrl, setCustomImageUrl] = useState('')
  const [uploadedBase64, setUploadedBase64] = useState('')
  const [error, setError] = useState('')

  if (!isAddProductOpen) return null

  const categoryLabelMap = {
    running: 'Running',
    causal: 'Casual',
    sports: 'Sports',
    basketball: 'BasketBall',
    formal: 'Formal',
    child: 'Child',
  }

  // Handle local file upload (converts image to base64 Data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedBase64(reader.result)
        setCustomImageUrl('')
        setError('')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!heading.trim()) {
      setError('Please enter a product title/heading')
      return
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      setError('Please enter a valid price')
      return
    }

    // Determine final image: uploaded file > custom URL > fallback default
    let finalImage = defaultRunningImg
    if (uploadedBase64) {
      finalImage = uploadedBase64
    } else if (customImageUrl.trim()) {
      finalImage = customImageUrl.trim()
    }

    const newProduct = {
      heading: heading.trim(),
      para: categoryLabelMap[category] || 'Shoes',
      category: category,
      Image: finalImage,
      icon: iconStar,
      rat: parseFloat(rating) || 4.8,
      currancy: currency,
      Currancy: currency,
      price: Number(price),
      brandQuality: brandQuality.trim() || 'Premium Quality Footwear',
      sizes: ['39', '40', '41', '42', '43', '44', '45'],
    }

    dispatch(addProduct(newProduct))
    setHeading('')
    setPrice('')
    setCustomImageUrl('')
    setUploadedBase64('')
    setError('')
  }

  const previewImg = uploadedBase64 || customImageUrl || defaultRunningImg

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <FaPlusCircle className="text-2xl" />
            <h2 className="text-xl font-bold">Add New Shoe Product</h2>
          </div>
          <button
            onClick={() => dispatch(setAddProductOpen(false))}
            className="rounded-full p-1.5 hover:bg-white/20 transition cursor-pointer"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-100 border border-red-400 p-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Shoe Name / Heading *
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="e.g. Air Speed Walker, Classic Leather"
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="running">Running Shoes</option>
                <option value="causal">Casual Shoes</option>
                <option value="sports">Sports Shoes</option>
                <option value="basketball">BasketBall Shoes</option>
                <option value="formal">Formal Shoes</option>
                <option value="child">Child Shoes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Price (PKR) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 8500"
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Rating (1 - 5)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Brand & Quality Information
              </label>
              <input
                type="text"
                value={brandQuality}
                onChange={(e) => setBrandQuality(e.target.value)}
                placeholder="e.g. Premium Leather, Cushion Sole"
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3 border-t pt-3">
            <label className="block text-xs font-bold text-gray-700">
              Product Image (Upload File or Enter Image Web URL) *
            </label>

            {/* Live Image Preview */}
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <img
                src={previewImg}
                alt="Product Preview"
                className="h-20 w-20 rounded-lg object-contain bg-white border p-1"
              />
              <div className="text-xs text-gray-600 space-y-1">
                <span className="font-bold text-gray-900 block">Image Live Preview</span>
                <span className="text-[11px] text-gray-500 block">
                  This image will be displayed on product cards and detail pages.
                </span>
              </div>
            </div>

            {/* Upload File */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1 flex items-center gap-1">
                <FaFileUpload className="text-blue-600" /> Upload Image File from Computer:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            {/* Enter Image URL */}
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-gray-600 mb-1 flex items-center gap-1">
                <FaLink className="text-blue-600" /> Or Paste Image Web URL:
              </label>
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => {
                  setCustomImageUrl(e.target.value)
                  setUploadedBase64('')
                }}
                placeholder="https://example.com/shoe-photo.jpg"
                className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white shadow-lg hover:bg-blue-700 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <FaShoePrints /> Add Shoe to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
