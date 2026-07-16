import { LuFacebook } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  const navigation = useNavigate()
  return (
    <div className=' py-5 text-white/90' style={{background: 'linear-gradient(135deg, #211b3d, #571789, #1a1a34)'}}>
     <div className='flex justify-around py-5'>
      <div className='w-60 py-4'>
      <div className='flex gap-3 '>
          <h1 className='rounded px-3 py-0.5 text-center font-bold text-2xl bg-blue-500 text-white'>S</h1>
          <h1 className='text-2xl font-bold text-white'>StepStyle</h1>
        </div>
        <p className='py-3'>Premium footwear for every step of your journey. Quality, comfort, and style combined.</p>
        <div className='flex justify-evenly w-50 items-start text-xl py-1 '>
          <a href="#" className='hover:text-white hover:bg-white/25  px-2 py-2 rounded-2xl bg-gray-600/40'><LuFacebook /></a>
          <a href="#" className='hover:text-white hover:bg-white/25  px-2 py-2 rounded-2xl bg-gray-600/40'><FaTwitter /></a>
          <a href="#" className='hover:text-white hover:bg-white/25  px-2 py-2 rounded-2xl bg-gray-600/40'><IoMdCamera /></a>
          <a href="#" className='hover:text-white hover:bg-white/25  px-2 py-2 rounded-2xl bg-gray-600/40'><FaYoutube /></a>
        </div>
      </div>
      <div className='w-60 '>
        <h1 className='text-2xl py-4 text-white font-bold'>Quick Links</h1>
          <p onClick={()=>navigation('/')} className='text-white py-1 cursor-pointer'>Home</p>
          <p onClick={()=>navigation('/product')} className='text-white cursor-pointer py-1 -white'>Product</p>
          <p onClick={()=>navigation('/about')} className='text-white py-1 cursor-pointer'>About Us</p>
          <p onClick={()=>navigation('/contact')} className='text-white py-1 cursor-pointer'>Contact</p>
      </div>
      <div className='w-60 '>
        <h1 className='text-2xl py-4 text-white font-bold'>Categories</h1>
          <p onClick={()=>navigation('/')} className='text-white py-1 cursor-pointer '>Running Shoes</p>
          <p onClick={()=>navigation('/product')} className='text-white cursor-pointer py-1 -white'>Casual Sneakers</p>
          <p onClick={()=>navigation('/about')} className='text-white py-1 cursor-pointer'>Sports Shoes</p>
          <p onClick={()=>navigation('/contact')} className='text-white py-1 cursor-pointer'>Formal Shoes</p>
      </div>
      <div className='w-70 '>
        <h1 className='text-2xl py-4 text-white font-bold'>Contact Us</h1>
         <div className='flex text-center-1 py-1.5'>
           <p className='my-1'><IoLocationOutline /></p>
           <h1>123 Fashion Street, NY 10001, USA</h1>
         </div>
         <div className='flex text-center gap-1 py-1.5'>
          <p className='my-1'><IoCallOutline /></p>
          <h1>+1 (555) 123-4567</h1>
         </div>
         <div className='flex text-center gap-1 py-1.5'>
          <p className='my-1.5'><CiMail /></p>
          <h1>Farman@stepstyle.com</h1>
         </div>
      </div>
      </div>
     <hr className='w-290 mx-10 text-white/30'/>
     <div className='py-5 flex justify-center'>
      <p className='py-3'>© 2026 StepStyle. All rights reserved.</p>
     </div>
    </div>
  )
}

export default Footer
