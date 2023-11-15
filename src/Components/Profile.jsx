import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './Widgets/Profile/SideBar';
import Footer from './Widgets/Footer/Footer';
import { useSelector } from 'react-redux';
import Login from './Login';
import Loading from './Widgets/Loading/Loading';


export default function Profile() {

  const user = useSelector(state => state.authentication.user);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className=' fixed top-1/2 left-1/2'><Loading /></div>
  }

  if (!user) return (
    <div className=' bg-gray-200 w-full h-full'>
      <div className=' relative top-52'>
        <div className='flex flex-col justify-center items-center'>
          <div className=' w-9/12 flex justify-between max-xl:flex-col'>
            <div className=' bg-white rounded-lg text-xl w-full max-xl:w-full max-xl:mt-4 shadow-xl'>
              <div className=' p-6 ' style={{ minHeight: '400px' }}>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <Footer />
        </div>
      </div>
    </div>
  )

  return (
    <div className=' bg-gray-200 w-full h-full'>
      <div className=' relative top-52'>
        <div className='flex flex-col justify-center items-center'>
          <div className=' w-9/12 flex justify-between max-xl:flex-col'>
            <div className=' w-3/12 px-3 max-xl:px-0 max-xl:w-full'>
              <SideBar />
            </div>
            <div className=' bg-white rounded-lg text-xl w-9/12 max-xl:w-full max-xl:mt-4 shadow-xl'>
              <div className=' p-6 ' style={{ minHeight: '400px' }}>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <Footer />
        </div>
      </div>
    </div>
  )
}
