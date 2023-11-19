import React, { useState } from 'react'

export default function ({ forgot, setForgot }) {

    const [newPassword, setNewPassword] = useState(false);
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        
    };

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
                            <input
                                className='active:ring-blue-400 active:border-blue-400 focus-within:ring-blue-400 focus-within:border-blue-400 ring-1 w-full border border-gray-600 rounded-md h-9 px-2'
                                placeholder='Nhập email người dùng'
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <button onClick={onSubmit} className='w-1/3 p-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 active:ring-1 active:ring-green-400'>
                            Gửi mã
                        </button>
                        <button onClick={() => {
                            document.getElementById('modal').style.display = 'none';
                        }}
                            className=' w-1/3 p-2 border-2 text-green-600 font-medium border-green-600 rounded-md active:ring-1 active:ring-green-400'>Bỏ qua
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
