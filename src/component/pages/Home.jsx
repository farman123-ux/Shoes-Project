import React, { useState } from 'react'
import img from '../../assets/grailify-nike-5041716_1920.jpg'
import { useNavigate } from 'react-router-dom'
import { LiaTruckSolid } from 'react-icons/lia'
import { LuShield } from 'react-icons/lu'
import { GoZap } from 'react-icons/go'
import { cards } from '../constant/home'
import { FaStar } from 'react-icons/fa'
import { BsArrowRightShort } from "react-icons/bs";
import Footer from '../Footer'

const Home = () => {
  const navigate = useNavigate()
  const [email, setEmail]=useState('')

  const submitform = (e)=>{
    e.preventDefault()
    alert(`Subscribe Successfull: ${email}`)
    setEmail('')
  }
  return (
    <div>
      <div className="relative">
        <img
          src={img} alt="" className="w-full h-145  object-cover "/>

        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col text-center text-white"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <h1 className="font-bold text-7xl">Step Into Style</h1>

          <p className="text-2xl py-4 max-w-3xl">
            Discover premium footwear that combines comfort, quality, and
            cutting-edge design
          </p>

          <div className="flex gap-7">
            <div onClick={() => navigate('/product')} className="flex font-semibold justify-center px-5 gap-2 items-center py-3.5 rounded-3xl text-blue-600 bg-white hover:bg-blue-700 hover:text-white hover:scale-110 duration-300 ease-in-out cursor-pointer">
              <button className="cursor-pointer ">Shop Now</button>
              <p className="text-2xl font-bold">
                <BsArrowRightShort />
              </p>
            </div>

            <button
              onClick={() => navigate('/about')} className="border-2 border-white/30 font-semibold tracking-wider p-4 py-3 rounded-3xl bg-gray-500/80 duration-300 ease-in-out cursor-pointer hover:scale-110">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <section className="flex justify-around flex-wrap gap-5 py-10 px-5">
        <div className="w-90 h-55 flex flex-col justify-center items-center rounded-2xl hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] duration-200 hover:scale-105 bg-white">
          <div className="h-14 w-14 rounded-full bg-blue-700 flex items-center justify-center">
            <p className="text-3xl font-bold text-white">
              <LiaTruckSolid />
            </p>
          </div>

          <h2 className="my-2 font-semibold text-2xl">Free Shipping</h2>
          <p>
            On orders over <span>PKR</span> 2000
          </p>
        </div>

        <div className="w-90 h-55 flex flex-col justify-center items-center rounded-2xl hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] duration-200 hover:scale-105 bg-white">
          <div className="h-14 w-14 rounded-full bg-blue-700 flex items-center justify-center">
            <p className="text-3xl font-bold text-white">
              <LuShield />
            </p>
          </div>

          <h2 className="my-2 font-semibold text-2xl">Secure Payment</h2>
          <p>100% protected checkout</p>
        </div>

        <div className="w-90 h-55 flex flex-col justify-center items-center rounded-2xl hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] duration-200 hover:scale-105 bg-white">
          <div className="h-14 w-14 rounded-full bg-blue-700 flex items-center justify-center">
            <p className="text-3xl font-bold text-white">
              <GoZap />
            </p>
          </div>

          <h2 className="my-2 font-semibold text-2xl">Fast Delivery</h2>
          <p>Quick shipping all across Pakistan</p>
        </div>
      </section>

    <section className="bg-blue-50 py-5">
        <div className="flex flex-col justify-center items-center py-20">
          <h1 className="text-4xl font-bold text-blue-400">
            Featured Collection
          </h1>

          <p className="text-xl py-3 text-gray-500">
            Explore our most popular styles
          </p>
        </div>
        <div className="flex justify-around flex-wrap gap-8 px-5 ">
          {cards.map((card) => (
            <div className="group w-70 h-110 rounded-[20px] bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]">
              <div className="w-full h-70 relative overflow-hidden rounded-[20px_20px_0_0]">
                <img
                  src={card.Image}
                  alt=""
                  className="w-full h-full object-cover rounded-[20px_20px_0_0] transition-all duration-300 group-hover:scale-110"/>

                <h1 className="absolute top-3 right-4 text-white bg-blue-600 font-bold rounded-2xl px-2.5 py-1">
                  {card.heading}
                </h1>
              </div>

              <div className="flex flex-col mx-3 my-2 p-1">
                <p className="py-2 text-red-900/60">{card.para}</p>

                <h1 className="font-semibold text-2xl transition-colors duration-300 group-hover:text-blue-700">
                  {card.heading1}
                </h1>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-1 items-center">
                    <p className="text-amber-500">
                      <FaStar />
                    </p>
                    <span>{card.span}</span>
                  </div>

                  <div className="flex gap-1 items-center">
                    <span className="text-sm">{card.span1}</span>
                    <h1 className="font-bold text-blue-700">{card.Price}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-10">
          <button
            onClick={() => navigate('/product')}
            className="bg-blue-600 flex items-center text-xl font-semibold px-4 py-4 rounded-2xl text-white hover:scale-105 cursor-pointer duration-200 hover:shadow-[0_0_7px_rgba(0,0,0,0.3)]">
            View All Product
            <p className="text-3xl ml-2">
              <BsArrowRightShort />
            </p>
          </button>
        </div>
      </section>

      <div className="bg-linear-to-r from-blue-600 to-white py-12">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-5xl font-bold text-white ">
            Join Our Newsletter
          </h1>

          <p className="text-white mt-3 text-lg">
            Get exclusive offers and early access to new collections
          </p>
        </div>
        
        <form onSubmit={submitform} className="flex justify-center gap-3 flex-wrap px-4">
          <input
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-80 rounded-2xl px-5 py-3 text-blue-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white" required/>
          <button className="bg-white text-xl text-blue-700 px-6 py-3 rounded-2xl hover:scale-105 duration-300 hover:shadow-[0_0_10px_rgba(0,0,0,0.3)] cursor-pointer">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
