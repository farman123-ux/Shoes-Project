import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './component/pages/Home'
import About from './component/pages/About'
import Product from './component/pages/product/Product'
import RunningShoesDetail from './component/pages/product/category/running/RunningShoesDetail'
import Contact from './component/pages/Contact'
import Footer from './component/Footer'
import CausalShoesDetail from './component/pages/product/category/causal/CausalShoesDetail'
import SportsShoesDetail from './component/pages/product/category/Sports/SportsShoesDetail'
import BasketBallShoesDetail from './component/pages/product/category/basketball/BasketBallShoesDetail'
import ChildShoesDetail from './component/pages/product/category/child/ChildShoesDetail'
import FormalShoesDetial from './component/pages/product/category/formal/FormalShoesDetail'
import CartPage from './component/pages/CartPage'
import OrdersPage from './component/pages/OrdersPage'
import LoginPage from './component/pages/LoginPage'

const productCategoryRoutes = {
  all: '/product/all',
  running: '/product/running-shoes',
  causal: '/product/causal-shoes',
  sports: '/product/sports-shoes',
  basketball: '/product/basketball-shoes',
  formal: '/product/formal-shoes',
  child: '/product/child-shoes',
}

const productRoutes = [
  { path: '/product', category: 'all' },
  { path: productCategoryRoutes.all, category: 'all' },
  { path: productCategoryRoutes.running, category: 'running' },
  { path: productCategoryRoutes.causal, category: 'causal' },
  { path: productCategoryRoutes.sports, category: 'sports' },
  { path: productCategoryRoutes.basketball, category: 'basketball' },
  { path: productCategoryRoutes.formal, category: 'formal' },
  { path: productCategoryRoutes.child, category: 'child' },
]

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

        {/* Login Route */}
        <Route path='/login' element={<LoginPage />} />

        {/* Dedicated Cart & Checkout Page */}
        <Route path='/cart' element={<CartPage />} />

        {/* Dedicated Orders History Page */}
        <Route path='/orders' element={<OrdersPage />} />

        {/* Product category routes */}
        {productRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Product
                initialCategory={route.category}
                categoryRoutes={productCategoryRoutes}
              />
            }
          />
        ))}

        {/* Shoe Detail routes */}
        <Route path='/product/running-shoes/:heading' element={<RunningShoesDetail />} />
        <Route path='/product/causal-shoes/:heading' element={<CausalShoesDetail />} />
        <Route path='/product/sport-shoes/:heading' element={<SportsShoesDetail />} />
        <Route path='/product/basketball-shoes/:heading' element={<BasketBallShoesDetail />} />
        <Route path='/product/childs-shoes/:heading' element={<ChildShoesDetail />} />
        <Route path='/product/formal-shoes/:heading' element={<FormalShoesDetial />} />

        <Route path='/contact' element={<Contact />} />
      </Routes>

      <Footer />
    </>
  )
}
