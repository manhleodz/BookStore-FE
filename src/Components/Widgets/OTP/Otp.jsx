import React, { useState } from 'react'
import { Authentication } from '../../../Network/Authentication';
import { ToastContainer } from 'react-toastify';
import toastMessage from '../ToastMessage';

export default function Otp({ username, email, signUp, setReload }) {

    const [OTP, setOTP] = useState(Math.floor(Math.random() * 1000000));
    const [inputOTP, setInputOTP] = useState("");

    const timer = setTimeout(() => {
        setOTP(Math.floor(Math.random() * 1000000));
    }, 600000);

    return (
        <div
            className=' fixed top-0 left-0 w-screen h-screen z-10 flex justify-center items-center'
            style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
            id='background'
        >
            <div className=' bg-white rounded-xl flex flex-col justify-center items-center w-3/12' id='box'>
                <div className='p-5 flex flex-col justify-center items-center w-full'>
                    <h1 className=' font-bold'>Xác nhận thông tin</h1>
                    <div className=' space-y-5 mt-5 w-10/12'>
                        <div className=''>
                            <h1 className='text-sm '>Mã xác nhận</h1>
                            <div className='flex items-center justify-between rounded-lg w-full border-2 border-gray-500 px-1 h-10 active:ring-2 active:border-blue-400 active:border-2 active:ring-blue-400'>
                                <input
                                    type='text' onChange={(e) => {
                                        setInputOTP(e.target.value);
                                    }}
                                    value={inputOTP} placeholder='Nhập mã xác nhận' className=' border-none active:ring-0 outline-none focus:ring-0 active:border-0 w-9/12'
                                />
                                <h1
                                    className='text-sm text-blue-500 cursor-pointer text-right'
                                    onClick={() => {
                                        toastMessage.showToastSuccessMessage("Kiểm tra email nhé! Code có hiệu quả trong 5 phút");
                                        Authentication.getCode({
                                            email: email,
                                            username: username,
                                            OTP: OTP
                                        }).then((res) => {
                                        }).catch((err) => {
                                            toastMessage.showToastWarnMessage(err);
                                        });
                                        setTimeout(timer);
                                    }}
                                >
                                    Gửi OTP
                                </h1>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-9/12 flex flex-col justify-center items-center'>
                    <button
                        className=' p-2 bg-gray-400 text-black rounded-md w-9/12 my-2'
                        onClick={() => {
                            if (inputOTP === String(OTP)) {
                                signUp();
                                const timer = setTimeout(() => {
                                    document.getElementById('otp').style.display = 'none';
                                    setInputOTP("");
                                }, 10000);
                                return () => clearTimeout(timer);
                            } else {
                                toastMessage.showToastWarnMessage("Kiểm tra lại mã nhé")
                            }
                        }}
                    >
                        Xác nhận
                    </button>
                    <button
                        className=' p-2 bg-white border-2 border-red-600 text-red-600 rounded-md w-9/12 my-2 mb-10'
                        onClick={() => {
                            document.getElementById("otp").style.display = "none";
                        }}
                    >Trở về</button>
                </div>
            </div>
        </div>)
}
