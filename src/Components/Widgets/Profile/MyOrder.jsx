import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function MyOrder() {

  let { state } = useLocation();

  return (
    <div>
      <div className=' flex items-center justify-between shadow-md p-2 bg-gray-100 mb-5'>
        <Link to={'processing'} state={'processing'}>
          <div className={state === 'processing' || state === null ? ` text-red-500 underline underline-offset-8` : ''}>
            Đang xử lý
          </div>
        </Link>
        <Link to={'processed'} state={'processed'}>
          <div className={state === 'processed' ? ` text-red-500 underline underline-offset-8` : ''}>
            Đã xử lý
          </div>
        </Link>
        <Link to={'shipping'} state={'shipping'}>
          <div className={state === 'shipping' ? ` text-red-500 underline underline-offset-8` : ''}>
            Đang vận chuyển
          </div>
        </Link>
        <Link to={'completed'} state={'completed'}>
          <div className={state === 'completed' ? ` text-red-500 underline underline-offset-8` : ''}>
            Hoàn thành
          </div>
        </Link>
        <Link to={'cancelled'} state={'cancelled'}>
          <div className={state === 'cancelled' ? ` text-red-500 underline underline-offset-8` : ''}>
            Đã hủy
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  )
}
