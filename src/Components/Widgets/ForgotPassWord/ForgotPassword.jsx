import React, { useState } from 'react';
import Generate from '../../../Helper/Generate';
import { Authentication } from '../../../Network/Authentication';
import ToastMessage from '../ToastMessage';
import { ToastContainer } from 'react-toastify';

export default function ({ forgot, setForgot }) {

    const [newPassword, setNewPassword] = useState(false);
    const [OTP, setOTP] = useState(Generate(6));
    const [inputOTP, setInputOTP] = useState("");
    const [verify, setVerify] = useState(false);
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

    };

    console.log(OTP);

    return (
        <div id='modal' onClick={(e) => { if (e.target.id === 'background') { document.getElementById('modal').style.display = 'none' } }}>
            <div
                className=' fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center'
                style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
                id='background'
            >
                <div className='bg-white w-96 space-y-5 flex flex-col justify-center items-center p-3 rounded-md'>
                    <h1 className='text-xl font-medium'>Quên mật khẩu</h1>
                    <form action={onSubmit} className=' w-11/12 space-y-5 flex flex-col justify-center items-center'>
                        <div className=' w-full'>
                            <h1 className=' text-sm text-gray-500'>Nhập email xác thực</h1>
                            <div className='flex items-center justify-between rounded-lg w-full border-2 border-gray-500 px-1  active:ring-2 active:border-blue-400 active:border-2 active:ring-blue-400'>
                                <input
                                    type='text' onChange={(e) => {
                                        setInputOTP(e.target.value);
                                    }}
                                    value={inputOTP} placeholder='Nhập mã xác nhận' className=' border-none active:ring-0 pl-1 py-2 outline-none focus:ring-0 active:border-0 w-9/12'
                                />
                                <h1
                                    className='text-sm text-blue-500 cursor-pointer text-right'
                                    onClick={() => {
                                        ToastMessage.showToastInfoMessage("Kiểm tra email nhé! Code có hiệu quả trong 2 phút");
                                        if (email && !alert) {
                                            Authentication.getCode({
                                                email: user.email,
                                                OTP: OTP
                                            }).catch((err) => {
                                                ToastMessage.showToastWarnMessage(err)
                                            });
                                        }
                                    }}
                                >
                                    Gửi OTP
                                </h1>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={1000}
                                />
                            </div>
                        </div>
                        <button onClick={onSubmit} className='w-1/3 p-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 active:ring-1 active:ring-green-400'>
                            Gửi mã
                        </button>
                        <button onClick={() => {
                            setForgot(false);
                        }}
                            className=' w-1/3 p-2 border-2 text-green-600 font-medium border-green-600 rounded-md active:ring-1 active:ring-green-400'>Quay lại
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
