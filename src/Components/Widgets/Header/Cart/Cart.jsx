import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Cart() {

  const cart = useSelector((state1) => state1.authentication.cart);
  const user = useSelector((state2) => state2.authentication.user);
  const navigate = useNavigate();

  if (!cart || !user) return null;

  return (
    <div id='dropdown'>
      <div
        className=" relative flex justify-center items-center cursor-pointer ml-2"
      >
        <div className="relative py-2">
          {cart.length !== 0 ? (
            <div className="t-0 absolute left-3">
              <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-400 p-3 text-xs text-white">{cart.length}</p>
            </div>
          ) : (
            <>
            </>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
      </div>
      <div
        className=' fixed right-56 max-2xl:right-0 max-w-md shadow-lg rounded-lg bg-white text-xl'
        id='dropdown-content'
      >
        <div className='p-2'>
          <div className='flex'>
            <h1>Danh sách giỏ hàng</h1>
          </div>
          {cart.length > 0 && (
            <>
              <div className="relative shadow-md sm:rounded-lg max-h-80 overflow-y-auto overflow-x-hidden">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col">
                        sp
                      </th>
                      <th scope="col">
                        tên
                      </th>
                      <th scope="col" className="pl-3">
                        giá
                      </th>
                      <th scope="col">
                        sl
                      </th>
                      <th scope="col">
                        Tổng giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((book, index) => (
                      <tr key={index} className="bg-white border-b  hover:bg-gray-50 ">
                        <td className="w-3/12">
                          <img src={book.Product.image} alt={book.Product.name} className='' />
                        </td>
                        <td className='w-2/12' >
                          <h1>{book.Product.name}</h1>
                        </td>
                        <td className='pl-3'>
                          <h1>{book.Product.price}đ</h1>
                        </td>
                        <td>
                          <div className="bg-gray-50 w-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 ">
                            {book.amount}
                          </div>
                        </td>
                        <td>
                          <h1>{book.total}</h1>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div
          onClick={() => {
            navigate(`cart/${user.id}`);
          }}
          type="button"
          className=" text-white cursor-pointer flex items-end justify-center bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mx-2 mb-2 ">
          Xem giỏ hàng
        </div>
      </div>
    </div>
  )
}
