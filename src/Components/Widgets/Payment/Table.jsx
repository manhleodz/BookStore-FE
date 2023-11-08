import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, setCart } from '../../../Redux/AuthenticationSlice';
import { CartApi } from '../../../Network/Cart';
import { useNavigate } from 'react-router-dom';


export default function Table({ selected, setSelected, userId, total }) {

  const cart = useSelector((state1) => state1.authentication.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (!cart) return null;

  return (
    <>
      <table className="w-full text-base text-left text-gray-500">
        <thead className="text-base text-gray-700 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              chọn({selected.length})
            </th>
            <th scope="col" className="px-6 py-3">
              Ảnh
            </th>
            <th scope="col" className="px-6 py-3">
              Tên sách
            </th>
            <th scope="col" className="px-6 py-3">
              Số lượng
            </th>
            <th scope="col" className="px-6 py-3">
              Giá
            </th>
            <th scope="col" className="px-6 py-3">
            </th>
          </tr>
        </thead>
          {cart.length === 0 && (
            <h1 className=' absolute text-2xl font-bold'>Không có sản phẩm nào</h1>
          )}
        <tbody>
          {cart.map((book, index) => (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50 ">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1" type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    onClick={(e) => {
                      if (e.target.checked) {
                        setSelected([...selected, book]);
                      } else {
                        const arr = selected.filter(cart => {
                          return cart.id !== book.id;
                        })
                        setSelected(arr);
                        if (selected.length === 0) {
                          total = 0;
                        }
                      }
                    }}
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
              </td>
              <td className=" w-32 p-4">
                <img src={book.Product.image} alt="..." className=' cursor-pointer' onClick={() => navigate(`/detail/${book.Product.name}/${book.Product.id}`)} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 ">
                <h1 className=' w-10/12 cursor-pointer' onClick={() => navigate(`/detail/${book.Product.name}/${book.Product.id}`)}>
                  {book.Product.name}
                </h1>
              </td>
              <td className="px-6 py-4 w-2/12">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (book.amount > 1)
                        CartApi.changeQuantity({
                          id: book.id,
                          amount: book.amount - 1,
                          total: book.Product.price * (book.amount - 1),
                        }).then((res) => {
                          if (res) {
                            setLoading(false);
                            setTimeout(() => {
                              setLoading(true);
                            }, 100);
                            CartApi.getList(userId.userId).then((response) => {
                              if (response.data) {
                                dispatch(setCart(response.data));
                                const arr = selected.filter(cart => {
                                  return cart.id !== book.id;
                                })
                                arr.push({
                                  id: book.id,
                                  amount: book.amount - 1,
                                  total: book.Product.price * (book.amount - 1)
                                })
                                // setSelected(arr);
                              }
                            });
                          }
                        })
                    }}
                    className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <input type="number" readOnly id={`${index}thProduct`} className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 " value={book.amount} required />
                  </div>
                  <button
                    onClick={() => {
                      if (book.Product.quantity - book.Product.sold > book.amount) {
                        CartApi.changeQuantity({
                          id: book.id,
                          amount: book.amount + 1,
                          total: book.Product.price * (book.amount + 1),
                        }).then((res) => {
                          if (res.data) {
                            setLoading(false);
                            setTimeout(() => {
                              setLoading(true);
                            }, 100);
                            CartApi.getList(userId.userId).then((response) => {
                              if (response.data) {
                                dispatch(setCart(response.data));
                                const arr = selected.filter(cart => {
                                  return cart.id !== book.id;
                                })
                                arr.push({
                                  id: book.id,
                                  amount: book.amount + 1,
                                  total: book.Product.price * (book.amount + 1)
                                })
                                // setSelected(arr);
                              }
                            });
                          }

                        })
                        selected.map(cart => total += cart.total);
                      }
                    }
                    }
                    className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                {book.Product.quantity - book.Product.sold < book.amount && (
                  <h1 className=' absolute underline text-red-500'>Chỉ còn lại {book.Product.quantity - book.Product.sold} sản phẩm</h1>
                )}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 w-2/12">
                {book.total.toLocaleString()} Đ
              </td>
              <td className="px-6 py-4"
              >
                <svg
                  onClick={() => {
                    const index = cart.findIndex((c) => c.id === book.id)
                    dispatch(deleteCart(index));
                    CartApi.removeBook(book.id);
                  }}
                  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className=' fill-red-600 cursor-pointer'>
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </td>
            </tr>
          ))}

        </tbody>
        {!loading &&
          <div className=' fixed z-50 w-full h-full top-0 left-0 flex justify-center items-center'
            style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}>
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </table>
    </>
  )
}
