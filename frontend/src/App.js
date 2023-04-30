import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/layout/Header/Header.jsx'
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Search from './components/Search/Search';
import Login from './components/Login/Login';
import React, { useEffect, useState } from 'react';
import store from './Store'
import { useSelector } from 'react-redux';
import { loadUser } from './Reducers/userReducer/userMiddleware';
import UserMenu from './components/layout/UserMenu/UserMenu';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Cart from './components/Cart/Cart';
import ShippingDetails from './components/ShippingDetails/ShippingDetails';
import ConfirmOrder from './components/ConfirmOrder/ConfirmOrder';
import axios from 'axios'
import Payment from './components/Payment/Payment';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import Orders from './components/Orders/Orders';
import Order from './components/Order/Order';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ProductList from './components/Admin/ProductList/ProductList';
import CreateProduct from './components/Admin/CreateProduct/CreateProduct';
import EditProduct from './components/Admin/EditProduct/EditProduct';
import OrderList from './components/Admin/OrdersList/OrderList';
import EditOrder from './components/Admin/EditOrder/EditOrder';
import UserList from './components/Admin/UserList/UserList';
import EditUser from './components/Admin/EditUser/EditUser';

function App() {
  const {loading,error,user,isAuthenticated} = useSelector(state=>state.loginReducer)
  const [stripeApiKey,setStripeApiKey] = useState("")
  const getStripeApiKey = async()=>{
    const {data} = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(()=>{
    store.dispatch(loadUser)
  },[])

  useEffect(()=>{
    getStripeApiKey()
  },[stripeApiKey,isAuthenticated])

  useEffect(() => {
    (function(d, m){
       var kommunicateSettings =
          {"appId":"3fe7858cacfeab801d8fb6f709441edb5","popupWidget":true,"automaticChatOpenOnNavigation":true};
       var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
       s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
       var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
       window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
 }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserMenu user={user}/>}
      <Routes>
        <Route exact path='/' element={<Home />}/>      
        <Route exact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/login'  element={<Login />}/>
        <Route element={<ProtectedRoute/>}>
          <Route exact path='/account' element={<Profile />} />
          <Route exact path='/password/update' element={<UpdatePassword />} />
          <Route exact path='/shipping' element={<ShippingDetails />} />
          <Route exact path='/order/confirm' element={<ConfirmOrder />} />
          <Route exact path='/success' element={<PaymentSuccess />} />
          <Route exact path='/orders' element={<Orders />} />
          <Route exact path='/order/:id' element={<Order/>} />
          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/products' element={<ProductList />} />
          <Route exact path='/admin/product' element={<CreateProduct />} />
          <Route exact path='/admin/product/:id' element={<EditProduct />} />
          <Route exact path='/admin/orders' element={<OrderList />} />
          <Route exact path='/admin/order/:id' element={<EditOrder />} />
          <Route exact path='/admin/users' element={<UserList/>} />
          <Route exact path='/admin/user/:id' element={<EditUser />} />
          <Route exact path='/product/:id' element={<ProductDetails />}/> 
        </Route>
        {
            stripeApiKey && 
            <Route exact path='/payment/process' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
          }
        {isAuthenticated && <Route exact path='/me/update' element={<UpdateProfile />}/>}
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
      
      
      <Footer />
      
    </Router>
  );
}

export default App;
