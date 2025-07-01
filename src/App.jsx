import React,{useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Cart from './screens/Cart/Cart'
import Home from './screens/Home/Home'
import Placeorder from './screens/Placeorder/Placeorder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Footer from './components/Footer/Footer'
import {ToastContainer} from 'react-toastify'
import Verify from './screens/Verify/verify'
import MyOrders from './screens/MyOrders/myOrders'
import { Toaster } from 'react-hot-toast';

const App = () => {

  
  const [showLogin,setshowLogin] = useState(false);
  return (
    <>
    <ToastContainer/>
     <Toaster position="bottom-right" />
    {showLogin ? <LoginPopup setshowLogin={setshowLogin}/> : <></>}
    <div className='app'>
      <Navbar showLogin= {showLogin} setshowLogin = {setshowLogin} />
      <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/cart' element={<Cart/>}></Route>
       <Route path='/placeorder' element={<Placeorder/>}></Route>
       <Route path='/verify' element={<Verify/>}></Route>
       <Route path='/myorders' element={<MyOrders/>}></Route>
      </Routes>

    </div>
    <Footer/>
    </>
  )
}

export default App