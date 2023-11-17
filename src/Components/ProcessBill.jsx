import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bill } from '../Network/Bill';
import { useSelector } from "react-redux";
import { CartApi } from '../Network/Cart';
import { useNavigate } from 'react-router-dom';
import { firebase, auth } from '../Firebase/StorageFireBase';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from "otp-input-react";
import toast from './Widgets/ToastMessage';
import VerifyBill from './Widgets/OTP/VerifyBill';

export default function ProcessBill() {

  const billId = useParams().billId;
  const [bill, getBill] = useState();
  const [open, getOpen] = useState(false);
  const [name, getName] = useState();
  const [phone, getPhone] = useState();
  const [address, getAddress] = useState();
  const [note, getNotes] = useState();
  const [alert, getAlert] = useState();
  const user = useSelector(state => state.authentication.user);
  const navigate = useNavigate();

  const submit = () => {

    if (!name) {
      getAlert("Nhập cả họ và tên");
      window.scrollTo(0, 0)
      return;
    }

    if (!address) {
      getAlert("Chưa nhập địa chỉ");
      window.scrollTo(0, 0)
      return;
    }

    if (!/^[2-9]{2}[0-9]{9}$/.test(phone)) {
      getAlert("Số điện thoại không hợp lệ");
      window.scrollTo(0, 0)
      return;
    }

    if (/^[2-9]{2}[0-9]{9}$/.test(phone)) {
      document.getElementById('OTP').style.display = 'block';
      getAlert();
    }
  }

  useEffect(() => {

    Bill.getBillById(billId).then(res => {
      getBill(res.data);
    }).catch(err => {
      console.log(err);
    });
  }, [billId])

  if (!bill || !user) return null;

  return (
    <div className=' h-full w-screen bg-gray-200'>

      <div className=' relative top-52'>
        <div className=' flex flex-col items-center justify-center space-y-5 bg-gray-200'>
          <div className=' w-10/12 shadow-sm bg-white p-5 divide-y-2 divide-gray-200'>
            {bill.status === 'đang xử lý' && (
              <h1 className=' text-xl text-red-600 underline'>*Lưu ý: Các đơn hàng chưa xác thực sẽ bị xóa sau 3 ngày</h1>
            )}
            <h1 className=' text-xl font-semibold'>Địa chỉ giao hàng</h1>
            <div>
              <div className=' max-w-3xl'>
                <div className='flex items-center justify-between mt-2'>
                  <h1>Tên người nhận:</h1>
                  <div className=' w-8/12'>
                    {bill.status !== 'đang xử lý' ? (
                      <input placeholder='Nhập họ và tên người nhận' className='w-full p-1 border-gray-300 border-2' defaultValue={bill.receiver} disabled />
                    ) : (
                      <>
                        <input placeholder='Nhập họ và tên người nhận' className='w-full p-1 border-gray-300 border-2' onChange={(e) => getName(e.target.value)} />
                        <label htmlFor="receiver" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">receiver</label>
                        <h1 className=' text-red-500 text-md font-bold'>{alert === "Nhập cả họ và tên" && alert}</h1>
                      </>
                    )}
                  </div>
                </div>
                <div className='flex items-center justify-between mt-2'>
                  <h1>Số điện thoại:</h1>
                  <div className=' w-8/12'>
                    {bill.status !== 'đang xử lý' ? (
                      <PhoneInput
                        country={'vn'}
                        value={bill.phone}
                        disabled
                      />
                    ) : (
                      <>
                        <PhoneInput
                          country={'vn'}
                          value={phone}
                          onChange={getPhone}
                        />
                        <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">phone</label>
                        <h1 className=' text-red-500 text-md font-bold'>{alert === "Số điện thoại không hợp lệ" && alert}</h1>
                      </>
                    )}
                  </div>
                </div>
                <div className='flex items-center justify-between mt-2'>
                  <h1>Địa chỉ nhận hàng:</h1>
                  <div className=' w-8/12'>
                    {bill.status !== 'đang xử lý' ? (
                      <input placeholder='Nhập họ và tên người nhận' className='w-full p-1 border-gray-300 border-2' defaultValue={bill.address} disabled />
                    ) : (
                      <div className=' flex items-center'>
                        <div className=' w-full'>
                          <input placeholder='Nhập địa chỉ người nhận' className='w-full p-1 border-gray-300 border-2' onChange={e => getAddress(e.target.value)} />
                          <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">address</label>
                          <h1 className=' text-red-500 text-md font-bold'>{alert === "Chưa nhập địa chỉ" && alert}</h1>
                        </div>
                        <h1 className=' m-1 cursor-pointer' title='Nhập chi tiết địa chỉ để đơn vị vận chuyển đến bạn nhanh nhất nhé'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=' w-10/12 shadow-sm bg-white p-5 divide-y-2 divide-gray-200'>
            <h1 className=' text-xl font-semibold'>Phương thức vận chuyển</h1>
            <div>
              <div className='flex items-center text-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className='fill-red-600 pr-3'>
                  <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                </svg>
                <h1>
                  Hùng Lĩnh express
                </h1>
              </div>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className='fill-green-500 pr-3'>
                  <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" />
                </svg>
                <h1>Miễn phí ship</h1>
              </div>
            </div>
          </div>
          <div className=' w-10/12 shadow-sm bg-white p-5 divide-y-2 divide-gray-200'>
            <h1 className=' text-xl font-semibold'>Phương thức thanh toán</h1>
            <h1 className='text-red-600 text-lg'>Coming soon</h1>
          </div>

          <div className=' w-10/12 shadow-sm bg-white p-5 divide-y-2 divide-gray-200'>
            <h1 className=' text-xl font-semibold'>Thông tin khác</h1>
            <div>
              {bill.status !== 'đang xử lý' ? (
                <>
                  <div className=' flex items-center'>
                    <input type='checkbox' className=' rounded-md' checked disabled />
                    <h1>Ghi chú</h1>
                  </div>
                  <input placeholder='Nhập ghi chú' className=' w-1/3 border-2 border-gray-400 p-2 rounded-sm' defaultValue={bill.note} disabled />
                </>
              ) : (
                <>
                  <div className=' flex items-center'>
                    <input
                      type='checkbox'
                      onChange={(e) => {
                        if (e.target.checked) {
                          getOpen(true);
                        } else {
                          getOpen(false);
                        }
                      }}
                      className=' rounded-md '
                    />
                    <h1>Ghi chú</h1>
                  </div>
                  {open && (
                    <input placeholder='Nhập ghi chú' className=' w-1/3 border-2 border-gray-400 p-2 rounded-sm' onChange={(e) => getNotes(e.target.value)} />
                  )}
                </>
              )}

              <div className=' flex items-center text-black'>
                <input type='checkbox' className=' rounded-md' checked disabled />
                <h1>Bằng việc tiến hành đặt mua, khách hàng đồng ý với các điều kiện giao dịch được ban hành bởi Hung Store.</h1>
              </div>
            </div>
          </div>

          <div className=' w-10/12 shadow-sm bg-white p-5 divide-y-2 divide-gray-200 mb-56'>
            <h1 className=' text-xl font-semibold'>Kiểm tra lại đơn hàng</h1>
            <div className=' space-y-3 divide-y-2 divide-gray-200'>
              {bill.Carts.map((book, index) => (
                <div key={index} className=' flex items-center justify-around pt-1'>
                  <div className=' flex w-1/2'>
                    <img alt={book.Product.name} src={book.Product.image} className=' w-1/6' />
                    <h1 className=''>{book.Product.name}</h1>
                  </div>
                  <h1>{(book.Product.price.toLocaleString())}đ</h1>
                  <h1 className=' text-lg font-bold'>{book.amount}</h1>
                  <h1 className=' text-yellow-500 font-semibold'>{book.total.toLocaleString()}đ</h1>
                </div>
              ))}
            </div>
            <div className=' flex items-center justify-between'>
              {bill.payment !== bill.price ? (
                <h1 className=' flex items-center text-lg font-semibold'>
                  Đã áp mã giảm giá
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" className='ml-1 bg-yellow-200 fill-red-600'>
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                </h1>
              ) : (
                <h1 className='text-lg font-semibold'>Chưa áp mã giảm giá</h1>
              )}
              <div className='text-right flex pr-14'>
                <h1 className=' text-2xl font-semibold'>Thanh toán: </h1>
                {bill.payment !== bill.price ? (
                  <div className='text-lg'>
                    <h1>{(bill.payment.toLocaleString())}đ</h1>
                    <h1 className='line-through text-gray-400'>{bill.price.toLocaleString()}đ</h1>
                  </div>
                ) : (
                  <h1 className=' text-lg'>{bill.payment.toLocaleString()}đ</h1>
                )}
              </div>
            </div>
          </div>
          <div
            className=' w-screen h-screen hidden' id='OTP'
            onClick={(e) => {
              if (e.target.id === 'form') {
                document.getElementById('OTP').style.display = 'none';
              }
            }}
          >
            <VerifyBill phone={phone} getPhone={getPhone} bill={bill} name={name} address={address} note={note} />
          </div>

          <div className='h-32'></div>

          <div className=' w-screen shadow-2xl bg-white p-8 divide-y-2 divide-gray-200 fixed bottom-0 flex items-center justify-around'>
            <div className=' flex items-center space-x-2 cursor-pointer' onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              <h1 className=' text-2xl font-semibold'>Quay lại</h1>
            </div>
            {bill.status === 'đã xử lý' && (
              <button
                type="button"
                className="focus:outline-none text-white bg-gray-600 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2"
                disabled
              >
                Đã xác nhận thanh toán
              </button>
            )}

            {bill.status === 'đang vận chuyển' && (
              <button
                type="button"
                className="focus:outline-none text-white bg-gray-600 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2"
                disabled
              >
                Đơn hàng đang vận chuyển đến bạn
              </button>
            )}

            {
              bill.status === 'hoàn thành' && (
                <button
                  disabled
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Nhận hàng thành công
                </button>
              )
            }

            {
              bill.status === 'đang xử lý' && (
                <button

                  onClick={submit}
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 "
                >
                  Xác nhận thanh toán
                </button>
              )
            }

            {
              bill.status === 'đã hủy' && (
                <button

                  onClick={() => {
                    Bill.updateBill({ status: 'đang xử lý' }, billId).then(() => {

                      window.location.reload();
                    });
                  }}
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Mua lại
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
