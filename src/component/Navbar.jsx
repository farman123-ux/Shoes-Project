// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';


// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-white px-5 py-3 shadow-md">
//         <div className="flex items-center gap-3">
//           <NavLink to="/" className="flex items-center gap-2">
//            <h2>Logo</h2>
//           </NavLink>

//           <button
//             type="button"
//             className="block cursor-pointer text-2xl md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             ☰
//           </button>
//         </div>

//         <ul className="hidden gap-5 font-semibold md:flex">
//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/">Home</NavLink>
//           </li>
//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/about">About</NavLink>
//           </li>
//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/product">Product</NavLink>
//           </li>
//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/contact">Contact</NavLink>
//           </li>
//         </ul>

//         <ul
//           className={`fixed top-0 left-0 z-50 flex h-screen w-[60%] flex-col gap-4 bg-white p-5 transition-transform duration-300 md:hidden ${
//             isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <li className="mb-5 text-right text-2xl">
//             <button
//               type="button"
//               className="cursor-pointer"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               ✕
//             </button>
//           </li>

//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
//               Home
//             </NavLink>
//           </li>
//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
//               About
//             </NavLink>
//           </li>
//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/product" onClick={() => setIsMenuOpen(false)}>
//               Product
//             </NavLink>
//           </li>
//           <li className="rounded px-4 py-2 transition hover:bg-black hover:text-white">
//             <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
//               Contact
//             </NavLink>
//           </li>
//         </ul>

//         {isMenuOpen && (
//           <div
//             className="fixed top-0 left-0 z-40 h-screen w-full bg-black/30 md:hidden"
//             onClick={() => setIsMenuOpen(false)}
//           />
//         )}
//       </nav>


//     </>
//   );
// }

// export default Navbar;


import { NavLink } from 'react-router-dom'

function Navbar() {
  
  return (
    <div>
      <nav className='fixed top-0 left-0 z-1 bg-white/40 border-b flex justify-between w-full px-5 py-3  items-center' >
        <div className='flex gap-3 mx-5'>
          <h1 className='rounded px-3 py-0.5 text-center font-bold text-2xl bg-blue-500 text-white'>S</h1>
          <h1 className='text-2xl font-bold text-cyan-700'>StepStyle</h1>
        </div>
        <div>
          <ul className='flex gap-6 mx-15'>
            <li>
              <NavLink to="/" className='font-bold border-transparent hover:border-b-2 hover:border-b-lime-900 hover:transition duration-100 hover:text-red-900'>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className='font-bold border-transparent hover:border-b-2 hover:border-b-lime-900 hover:transition duration-100 hover:text-red-900'>About</NavLink>
            </li>
            <li>
              <NavLink to="/product" className='font-bold border-transparent hover:border-b-2 hover:border-b-lime-900 hover:transition duration-100 hover:text-red-900'>Product</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className='font-bold border-transparent hover:border-b-2 hover:border-b-lime-900 hover:transition duration-100 hover:text-red-900'>Contact</NavLink>
            </li>
          </ul>

        </div>
      </nav>


    </div>
  )
}

export default Navbar

