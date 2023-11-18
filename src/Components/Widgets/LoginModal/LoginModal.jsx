import React, { useState } from 'react';
import { Authentication } from '../../../Network/Authentication';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Redux/AuthenticationSlice';

export default function LoginModal() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState();
  const [forgot, setForgot] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!alert) {
      Authentication.login(
        {
          username: username,
          password: password,
        },
        (user) => {
          const timeOut = setTimeout(() => {
            dispatch(setUser(user));
            clearTimeout(timeOut);
          }, 1000);
        },
        (error) => {
          setAlert(error);
        }
      )
    }
  }

  return (
    <div
      className=' fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center'
      style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
      id='background'

    >
      <form action={(e) => {
        e.preventDefault();
        onsubmit(e);
      }} className=' bg-white w-96 space-y-5 flex flex-col justify-center items-center p-3 rounded-md'>
        <h1 className='text-xl font-medium'>Đăng nhập</h1>
        <div className=' w-11/12'>
          <h1 className=' text-sm text-gray-500'>Tên người dùng</h1>
          <input
            className='active:ring-blue-400 active:border-blue-400 focus-within:ring-blue-400 focus-within:border-blue-400 ring-1 w-full border border-gray-600 rounded-md h-9 px-2' placeholder='Nhập tên người dùng'
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value.length < 6) {
                setAlert("Tên người dùng gồm ít nhất 6 chữ cái");
              } else {
                setAlert();
              }
            }}
            value={username}
          />
          {(alert === "Tên người dùng không tồn tại" || alert === "Tên người dùng gồm ít nhất 6 chữ cái") && (
            <h1 className=" text-red-600 font-semibold text-sm absolute">
              {alert}
            </h1>
          )}
        </div>
        {!forgot ? (
          <div className=' w-11/12'>
            <h1 className=' text-sm text-gray-500'>Tên người dùng</h1>
            <div className='w-full flex items-center active:ring-blue-400 active:border-blue-400 focus-within:ring-blue-400 focus-within:border-blue-400 ring-1 border border-gray-600 rounded-md'>
              <input
                id='password' type="password"
                className=' rounded-l-md h-9 px-2 w-full' placeholder='Nhập tên người dùng'
                onChange={(e) => {
                  if (e.target.value.length < 8) {
                    setAlert("Mật khẩu phải nhiều hơn 7 kí tự");
                  } else {
                    setAlert();
                  }
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <h1
                className=' cursor-pointer border rounded-r-md h-9 px-2 py-1 bg-gray-300'
                onClick={() => {
                  let x = document.getElementById('password');
                  if (x.type === 'password') {
                    x.type = 'text';
                  } else {
                    x.type = 'password';
                  }
                }}
              >
                Hiện
              </h1>
            </div>
            {(alert === "Mật khẩu phải nhiều hơn 7 kí tự" || alert === "Sai mật khẩu") && (
              <h1 className="text-red-600 font-semibold text-sm absolute my-3">
                {alert}
              </h1>
            )}
            <h1 className=' text-sm text-blue-600 cursor-pointer hover:text-blue-700'>Quên mật khẩu?</h1>
          </div>
        ) : (
          <></>
        )}
        <button onClick={onSubmit} className=' w-1/3 p-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 active:ring-1 active:ring-green-400'>Đăng nhập</button>
        <button onClick={() => {
          document.getElementById('modal').style.display = 'none';
        }}
          className=' w-1/3 p-2 border-2 text-green-600 font-medium border-green-600 rounded-md active:ring-1 active:ring-green-400'>Bỏ qua
        </button>
      </form>
    </div>
  )
}
