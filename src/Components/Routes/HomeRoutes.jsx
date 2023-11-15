import React, { Suspense, lazy } from 'react';
import Layout from "../Widgets/Layout/Layout";
import { Route, Routes } from 'react-router-dom';
import Info from '../Widgets/Profile/Info';
import MyOrder from '../Widgets/Profile/MyOrder';
import MyComments from '../Widgets/Profile/MyComments';
import Vouchers from '../Widgets/Profile/Vouchers';
import Cancelled from '../Widgets/Profile/Cancelled';
import Shipping from '../Widgets/Profile/Shipping';
import Processed from '../Widgets/Profile/Processed';
import Processing from '../Widgets/Profile/Processing';
import Completed from '../Widgets/Profile/Completed';

const Home = lazy(() => import('../Home'));
const Cart = lazy(() => import('../Cart'));
const Profile = lazy(() => import('../Profile'));
const NotFound = lazy(() => import('../NotFound'));
const DetailProduct = lazy(() => import('../DetailProduct'));
const SearchProducts = lazy(() => import('../SearchProducts'));
const ProcessBill = lazy(() => import('../ProcessBill'));
const Intro = lazy(() => import('../Intro'));
const Contact = lazy(() => import('../Contact'));

export default function HomeRoutes() {

  return (
    <>
      <Layout>
        <Suspense>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='cart/:userId' element={<Cart />} />
            <Route path='bill/:billId' element={<ProcessBill />} />
            <Route path='detail/:name/:id' element={<DetailProduct />} />
            <Route path='about' element={<Intro />} />
            <Route path='contact' element={<Contact />} />
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
        </Suspense>
      </Layout>
    </>
  )
}
