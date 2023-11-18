import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Header from '../Header/Header';
import { useDispatch, useSelector } from "react-redux";
import { Authentication } from '../../../Network/Authentication';
import { setCart, setUser, signOut } from '../../../Redux/AuthenticationSlice';
import { CartApi } from '../../../Network/Cart';
import messageIcon from '../../../Assets/icons8-message-500.svg';
import Chat from '../BoxChat/Chat';

const socket = io.connect(import.meta.env.VITE_CHAT_URL);

export default function Layout({ children }) {

  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const timeOut = setTimeout(() => {
    document.getElementById('background1').style.display = 'block';
    setOpen(true);
  }, 5000)

  useEffect(() => {
    const accessToken = Authentication.getAccessToken();
    if (accessToken !== null) {
      Authentication.refreshStateUser(accessToken)
        .then((response) => {
          if (response.data.error) {
            dispatch(signOut());
          } else {
            Authentication.refreshToken(accessToken)
              .then(response => {
                dispatch(setUser(response.data));
              })

            CartApi.getList(response.data.id).then((response) => {
              dispatch(setCart(response.data));
            });
          }
        });
    }

    return () => clearTimeout(timeOut);
  }, [dispatch]);

  return (
    <div className=' h-full w-screen'>
      <div className=''>
        <div className=' absolute z-50'>
          <Header user={user} />
        </div>
        <div className=' max-xl:mt-20' style={{ width: '100%' }}>
          <main className=' h-full w-screen bg-gray-200'>{children}</main>
        </div>

        <div className='fixed z-50 bottom-5 right-5 rounded-2xl shadow-2xl' id='box-chat'>
          <Chat user={user} socket={socket} open={open} setOpen={setOpen} />
          {!open && (<img
            alt='icon'
            src={messageIcon}
            className=' fixed bottom-2 right-5 w-20 shadow-2xl rounded-full cursor-pointer'
            onClick={() => {
              setOpen(true)
              socket.emit("join_room", user.id);
            }}
          />)}
        </div>
      </div>
      <div id='background1' className=' hidden'>
        <div
          className=' fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center'
          style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
        >
          <div className=' flex flex-col items-center'>
            <img alt='quangcao' src='https://image.moengage.com/fahasamoengage/20231118025055319210K3VWRPFahasaSaleT3BlackFridayPopup350x415pngcompfahasamoengage.png' />
            <button
              className=' text-white text-2xl font-bold border-white border-4 rounded-full w-10 h-10 flex items-center justify-center'
              onClick={() => {
                document.getElementById('background1').remove();
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
