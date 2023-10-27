import React, { useEffect } from 'react';
import khongcan from "../Assets/404 Error with a cute animal-bro.svg";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

  let navigate = useNavigate();

  useEffect(() => {
    document.title = 'Not Found';
  })
  return (
    <div className=' flex flex-col justify-center items-center h-screen bg-white'>
      <img src={khongcan} className=' w-4/12' alt='404'/>
      <button
            onClick={() => {
              navigate("/");
            }}
            className="mt-6 mb-12 bg-gray-700 text-white py-3 px-6 shadow-sm drop-shadow-sm rounded-md font-bold hover:ring-4 hover:ring-gray-400 duration-300 transition-all"
          >
            Go to Home <i className="fa-solid fa-arrow-right"></i>
          </button>
    </div>
  )
}
