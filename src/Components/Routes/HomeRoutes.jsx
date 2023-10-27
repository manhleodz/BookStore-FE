import React from 'react';
import Home from "../Home";
import Layout from "../Widgets/Layout/Layout";
import NotFound from '../NotFound';
import { Route, Routes } from 'react-router-dom';
import DetailProduct from '../DetailProduct';
import SearchProducts from '../SearchProducts';
import Profile from '../Profile';
import Cart from '../Cart';
import Info from '../Widgets/Profile/Info';
import MyOrder from '../Widgets/Profile/MyOrder';
import MyComments from '../Widgets/Profile/MyComments';
import Vouchers from '../Widgets/Profile/Vouchers';
import Cancelled from '../Widgets/Profile/Cancelled';
import Shipping from '../Widgets/Profile/Shipping';
import Processed from '../Widgets/Profile/Processed';
import Processing from '../Widgets/Profile/Processing';
import Completed from '../Widgets/Profile/Completed';
import ProcessBill from '../ProcessBill';
import Intro from '../Intro';
import Contact from '../Contact';
export default function HomeRoutes() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='cart/:userId' element={<Cart />} />
          <Route path='bill/:billId' element={<ProcessBill />} />
          <Route path='detail/:name/:id' element={<DetailProduct />} />
          <Route path='about' element={<Intro/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='products/:wordEntered' element={<SearchProducts />} />
          <Route path='profile/:id' element={<Profile />}>
            <Route path='info' element={<Info />} />
            <Route path='orders' element={<MyOrder />}>
              <Route path='cancelled' element={<Cancelled />} />
              <Route path='shipping' element={<Shipping />} />
              <Route path='processing' element={<Processing />} />
              <Route path='processed' element={<Processed />} />
              <Route path='completed' element={<Completed />} />
            </Route>
            <Route path='comments' element={<MyComments />} />
            <Route path='vouchers' element={<Vouchers />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  )
}
