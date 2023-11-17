import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Authentication } from '../../../Network/Authentication';
import toastMessage from '../ToastMessage';

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from '../../../Firebase/StorageFireBase';
import { v4 } from "uuid";
import { setUser } from '../../../Redux/AuthenticationSlice';
import { useTranslation } from 'react-i18next';
import Generate from '../../../Helper/Generate';

export default function Info() {

  const user = useSelector((state2) => state2.authentication.user);
  const dispatch = useDispatch();
  const [changeAddress, setChangeAddress] = useState(true);
  const [changeUsername, setChangeUsername] = useState(true);
  const [changePhone, setChangePhone] = useState(true);
  const [changeEmail, setChangeEmail] = useState(true);
  const [OTP, setOTP] = useState(Generate(6));
  const [inputOTP, setInputOTP] = useState("");
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [phonenumber, setPhone] = useState();
  const [email, setEmail] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState("");
  const [beforeUpload, setBeforeUpload] = useState(null);

  const { t } = useTranslation();

  const uploadFile = () => {
    if (imageUpload === null) {
      const data = {
        avatar: user.avatar,
        username,
        address,
        phonenumber,
        email
      }
      Authentication.changeInfo(data, user.id).then(res => {
        toastMessage.showToastInfoMessage("Thay đổi thành công");
        dispatch(setUser({
          ...user,
          avatar: user.avatar,
          username,
          address,
          phonenumber,
          email
        }))
      })
        .catch((err) => toastMessage.showToastWarnMessage(err.response.data));
    } else {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          if (url !== undefined) {
            setImageUrls(url);
            const data = {
              avatar: url,
              username,
              address,
              phonenumber,
              email
            }
            Authentication.changeInfo(data, user.id).then(res => {
              toastMessage.showToastInfoMessage("Thay đổi thành công");
              dispatch(setUser({
                ...user,
                avatar: url,
                username,
                address,
                phonenumber,
                email
              }))
            }).catch((err) => console.log(err));
          }
        });
      });
    }
  };

  const showToastInfoMessage = (title) => {
    toast.info(title, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const timer = setTimeout(() => {
    setOTP(Generate(6));
  }, 128000);

  if (!user) return null;

  return (
    <div className=' w-full'>
      <h1 className=' text_lg font-semibold'>{t('info')}</h1>
      <div className='flex justify-between divide-x-2 divide-gray-300'>
        <div className=' w-full'>
          <div className=' flex items-center justify-between'>
            <h1>{t('username')}:</h1>
            <div
              className={` ${!changeUsername ? 'shadow-lg shadow-blue-200 ' : ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-between w-8/12 m-2 pl-3 p-2.5  `}
            >
              <input
                id='username'
                className={`bg-gray-50 outline-none border-none  w-10/12 ${changeUsername ? 'text-gray-400 cursor-default' : ''}`}
                defaultValue={user.username}
                readOnly={changeUsername}
                onChange={(e) => setUsername(e.target.value)}
              />
              <h1 className=' text-blue-600 relative right-0 cursor-pointer' onClick={() => { setChangeUsername(false) }}>{t('change')}</h1>
            </div>
          </div>
          <div className=' flex items-center justify-between'>
            <h1>{t('address')}:</h1>
            <div
              className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-between w-8/12 m-2 pl-3 p-2.5  ${!changeAddress ? 'shadow-lg shadow-blue-200 ' : ''}`}
            >
              <input
                id='address'
                className={`bg-gray-50 outline-none border-none w-10/12 ${changeAddress ? 'text-gray-400 cursor-default ' : ''}`}
                defaultValue={user.address}
                readOnly={changeAddress}
                onChange={(e) => setAddress(e.target.value)}
              />
              <h1
                className=' text-blue-600 relative right-0 cursor-pointer'
                onClick={() => {
                  setChangeAddress(false)
                }}
              >
                {t('change')}
              </h1>
            </div>
          </div>
          <div className=' flex items-center justify-between'>
            <h1>{t('phonenumber')}:</h1>
            <div
              className={`${!changePhone ? 'shadow-lg shadow-blue-200 ' : ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-between w-8/12 m-2 pl-3 p-2.5  `}
            >
              <input
                id='phone'
                className={`bg-gray-50 outline-none border-none w-10/12 ${changePhone ? 'text-gray-400 cursor-default' : ''}`}
                defaultValue={user.phonenumber}
                readOnly={changePhone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <h1 className=' text-blue-600 relative right-0 cursor-pointer' onClick={() => { setChangePhone(false) }}>{t('change')}</h1>
            </div>
          </div>
          <div className=' flex items-center justify-between'>
            <h1>Email:</h1>
            <div
              className={`${!changeEmail ? 'shadow-lg shadow-blue-200 ' : ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-between w-8/12 m-2 pl-3 p-2.5  `}
            >
              <input
                id='address'
                className={`bg-gray-50 outline-none border-none w-10/12 ${changeEmail ? 'text-gray-400 cursor-default' : ''}`}
                defaultValue={user.email}
                readOnly={changeEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h1 className=' text-blue-600 relative right-0 cursor-pointer' onClick={() => { setChangeEmail(false) }}>{t('change')}</h1>
            </div>
          </div>
        </div>

        <div
          className=' hidden'
          id='otp'
          onClick={e => {
            if (e.target.id === 'background') {
              document.getElementById('otp').style.display = 'none';
            }
          }}
        >
          <div
            className=' fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center'
            style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
            id='background'
          >
            <div className=' bg-white rounded-xl flex flex-col justify-center items-center w-3/12' id='box'>
              <div className='p-5 flex flex-col justify-center items-center w-full'>
                <h1 className=' font-bold'>Xác nhận thông tin</h1>
                <div className=' space-y-5 mt-5 w-10/12'>
                  <div className=''>
                    <h1 className='text-sm '>Mã xác nhận</h1>
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
                          setTimeout(timer);
                          showToastInfoMessage("Kiểm tra email nhé! Code có hiệu quả trong 2 phút");
                          Authentication.getCode({
                            email: user.email,
                            username: user.username,
                            OTP: OTP
                          }).then(() => {
                            dispatch(setUser({
                              ...user,
                              username: username,
                              avatar: imageUrls,
                              address: address,
                              phonenumber: phonenumber,
                              email: email
                            }))

                          }).catch((err) => {
                            toastMessage.showToastWarnMessage(err);
                          });
                        }}
                      >
                        Gửi OTP
                      </h1>
                      <ToastContainer
                        position="top-right"
                        autoClose={1000}
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
                  className=' p-2 bg-red-600 text-white font-semibold rounded-md w-9/12 my-2'
                  onClick={() => {
                    if (inputOTP === String(OTP)) {
                      uploadFile();
                    } else {
                      toastMessage.showToastWarnMessage("Kiểm tra lại mã nhé")
                    }
                  }}
                >
                  {t('confirm')}
                </button>
                <button
                  className=' p-2 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-md w-9/12 my-2 mb-10'
                  onClick={() => {
                    document.getElementById("otp").style.display = "none";
                  }}
                >{t('return')}</button>
              </div>
            </div>
          </div>
        </div>

        <div className='w-2/6 flex flex-col justify-center items-center'>
          <img
            src={beforeUpload === null ? user.avatar : beforeUpload.preview} alt='avatar' className=' w-32 h-32 rounded-full object-cover' />
          <div>
            <input
              type='file' id='upload' className=' absolute -z-10' hidden
              onChange={(e) => {
                const file = (e.target.files[0]);
                if (file.type === 'image/png' || file.type === 'image/jpeg') {
                  setImageUpload(file);
                  file.preview = URL.createObjectURL(file);
                  setBeforeUpload(file);
                } else {
                  toastMessage.showToastWarnMessage('Chọn file hình ảnh!');
                }
              }}
            />
            {!beforeUpload ? (
              <>
                <label htmlFor="upload" className='bg-blue-400 p-1 rounded-lg text-white font-semibold px-3 cursor-pointer hover:bg-blue-500'>{t('chooseImg')}</label>
              </>
            ) : (
              <>
                <div
                  onClick={() => {
                    setImageUpload(null);
                    setBeforeUpload(null);
                  }}
                  className=' bg-gray-400 p-1 rounded-lg text-white font-semibold px-3 cursor-pointer hover:bg-gray-500'
                >
                  Gỡ ảnh
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className=' w-full flex justify-center items-center'>
        <button
          onClick={() => {
            if (username || address || email || phonenumber || beforeUpload) {

              if (!address) {
                setAddress(user.address);
              }
              if (!email) {
                setEmail(user.email);
              }
              if (!phonenumber) {
                setPhone(user.phonenumber);
              }
              if (!username) {
                setUsername(user.username);
              }
              if (!beforeUpload) {
                setImageUrls(user.avatar);
              }
              document.getElementById('otp').style.display = 'block';
            }
          }}
          type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-5">
          {t('save')}
        </button>
      </div>
      <ToastContainer autoClose={1000}/>
    </div>
  )
}
