import img from '../../assets/istockphoto-2249527395-612x612.jpg'
import { LiaBullseyeSolid } from "react-icons/lia";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaAward } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import img1 from "../../assets/shoe-craftsmanship.jpg"
import { useNavigate } from 'react-router-dom';


function About() {
  const navigation = useNavigate()
  return (
    <div>
      <div className='bg-blue-500 flex flex-col justify-center items-center h-70 mt-15'>
        <h1 className='text-6xl font-bold text-white  py-2'>Our Story</h1>
        <p className='text-white/90 text-2xl my-4'>Crafting exceptional footwear that empowers every step of your journey</p>
      </div>
      <div className='py-20 flex items-center justify-around '>
        <div className='w-145 py-1 px-3'>
          <h1 className='text-4xl my-4 font-bold  text-blue-700/65'>Our Mission</h1>
          <p className='text-xl py-1.5 text-black/60'>At StepStyle, we believe that great footwear is more than just a product—it's an essential part of your
            lifestyle. Since our founding in 2018, we've been dedicated to creating shoes that perfectly balance style,
            comfort, and performance.</p>
          <p className='text-xl py-1.5 mt-2 text-black/60'>Every pair of shoes we create is a testament to our commitment to excellence.
            We work with the finest materials, employ skilled craftspeople, and utilize cutting-edge
            technology to ensure that each step you take is comfortable, confident, and stylish.</p>
        </div>
        <div>
          <img src={img} alt="" className='w-145 rounded-2xl object-cover' />
        </div>
      </div>
      <div className='bg-blue-600/10 py-18'>
        <div className='flex flex-col h-30 pb-12 w-full items-center justify-center '>
          <h1 className='text-blue-800/70 text-4xl font-bold py-2'>Our Values </h1>
          <p className='text-xl text-gray-600/90 pt-2'>The principles that guide everything we do</p>
        </div>
        <div className='flex items-center justify-around '>
          <div className='w-70 h-80 flex flex-col items-center  pt-4 px-2.5 pb-3 rounded-2xl bg-white hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]'>
            <p className='text-4xl text-white bg-blue-600 w-15 h-15 rounded-4xl my-3 flex justify-center items-center'><LiaBullseyeSolid /></p>
            <h1 className='text-xl font-semibold py-3.5'>Quality First</h1>
            <p className=' text-black/70 text-center'>We never compromise on quality. Every pair undergoes rigorous testing
              to ensure durability and comfort</p>
          </div>
          <div className='w-70 h-80 flex flex-col items-center  pt-4 px-2.5 pb-3 rounded-2xl bg-white hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]'>
            <p className='text-4xl text-white bg-blue-600 w-15 h-15 rounded-4xl my-3 flex justify-center items-center'><HiMiniUserGroup /></p>
            <h1 className='text-xl font-semibold py-3.5'>Customer Focus</h1>
            <p className=' text-black/70 text-center'>Your happiness is our first priority. We listen to our customers, improve our products, and make changes based
              on your feedback so you always get the best experience.</p>
          </div>
          <div className='w-70 h-80 flex flex-col items-center  pt-4 px-2.5 pb-3 rounded-2xl bg-white hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]'>
            <p className='text-4xl text-white bg-blue-600 w-15 h-15 rounded-4xl my-3 flex justify-center items-center'><FaAward /></p>
            <h1 className='text-xl font-semibold py-3.5'>Innovation</h1>
            <p className=' text-black/70 text-center'>We use modern designs and the latest technology to create stylish,
              comfortable, and high-quality shoes for you.</p>
          </div>
          <div className='w-70 h-80 flex flex-col items-center  pt-4 px-2.5 pb-3 rounded-2xl bg-white hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]'>
            <p className='text-4xl text-white bg-blue-600 w-15 h-15 rounded-4xl my-3 flex justify-center items-center'> <FaHeart /></p>
            <h1 className='text-xl font-semibold py-3.5'>Sustainability</h1>
            <p className=' text-black/70 text-center'>We care about the environment and use eco-friendly methods
              and safe materials to help create a better future.</p>
          </div>
        </div>
      </div>
      <section className='py-8 px-3 flex justify-around items-center w-full '>
        <div className='py-5'>
          <img src={img1} alt="" className='w-140 object-cover rounded-2xl h-100' />
        </div>
        <div className='w-140 h-100 py-4 '>
          <h1 className='text-4xl text-blue-500 font-bold py-4 px-1'>Craftsmanship & Quality</h1>
          <p className='py-1 text-xl text-black/70  px-1'>Our shoes are made with great care and attention. We use high-quality materials and carefully check every pair to make sure it is comfortable, strong, and stylish.</p>
          <p className='py-5 text-xl text-black/70  px-1'>We work with experienced shoe makers who know how to create the perfect pair. By combining their skills with modern technology, we make shoes that look great and last for a long time.</p>
        </div>
      </section>
      <section className='text-white py-7 ' style={{ background: 'linear-gradient(135deg, #211b3d, #571789, #1a1a34)' }}>
        <div className='flex flex-col text-center py-4'>
          <h1 className=' text-4xl font-bold py-2 '>
            Our Journey
          </h1>
          <p className='text-white/80 text-xl'>Key milestones in our growth</p>
        </div>
        <div className='flex justify-evenly mx-8 py-7'>
          <div className='relative '>
            <div className='w-65 p-3.5 h-50 flex flex-col justify-center bg-gray-500/30 rounded-2xl hover:-translate-y-1.75 border border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] duration-400 '>
              <h1 className='text-blue-400 text-5xl font-bold py-2.5 px-1'>2018</h1>
              <h2 className='text-xl font-bold py-1'>Founded</h2>
              <p className='py-1 text-white/80'>Start with a vision to revolutionize footwear</p>
            </div>
            <hr className='absolute top-20 w-8  border-[1.34px] border-blue-400 -right-5' />
          </div>
          <div className='relative '>
            <div className='w-65 p-3.5 h-50 flex flex-col justify-center bg-gray-500/30 rounded-2xl hover:-translate-y-1.75 border border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] duration-400 '>
              <h1 className='text-blue-400 text-5xl font-bold py-2.5 px-1'>2020</h1>
              <h2 className='text-xl font-bold py-1'>1M Customers</h2>
              <p className='py-1 text-white/80'>Reached our first million happy customers</p>
            </div>
            <hr className='absolute top-20 w-8  border-[1.34px] border-blue-400 -right-5' />
          </div>
          <div className='relative '>
            <div className='w-65 p-3.5 h-50 flex flex-col justify-center bg-gray-500/30 rounded-2xl hover:-translate-y-1.75 border border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] duration-400 '>
              <h1 className='text-blue-400 text-5xl font-bold py-2.5 px-1'>2023</h1>
              <h2 className='text-xl font-bold py-1'>Global Expansion</h2>
              <p className='py-1 text-white/80'>Expanded to 50+ countries worldwide</p>
            </div>
            <hr className='absolute top-23 w-8 border-[1.34px] border-blue-400 -right-5' />
          </div>
          <div className='relative '>
            <div className='w-65 p-3.5 h-50 flex flex-col justify-center bg-gray-500/30 rounded-2xl hover:-translate-y-1.75 border border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] duration-400 '>
              <h1 className='text-blue-400 text-5xl font-bold py-2.5 px-1'>2026</h1>
              <h2 className='text-xl font-bold py-1'>Industry Leader</h2>
              <p className='py-1 text-white/80'>Recognized as a leading footwear brand</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='text-center border p-12'>
          <h1 className='text-4xl text-blue-600/70 font-bold py-7'>Join Our Journey</h1>
          <p className='text-xl text-black/65 py-2'>Experience the difference that quality, comfort, and style can make in every step you take.</p>
          <button onClick={()=> navigation('/product')} className='text-white py-4 px-7 cursor-pointer hover:scale-107 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] duration-300  font-semibold bg-blue-500/90 rounded-3xl my-4'>Shop Our Collection </button>
        </div>
      </section>
    </div>
  )
}

export default About
