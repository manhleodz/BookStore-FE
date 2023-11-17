import React from 'react'
import Footer from './Widgets/Footer/Footer'
import bg from '../Assets/7199788_30496.jpg'

export default function Intro() {
  return (
    <div className='bg-gray-200 h-full'>
      <div className='relative top-52 w-full'>
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='w-9/12 bg-white space-y-10 flex flex-col justify-center items-center'>
            <div className='w-full flex justify-center items-center space-x-10 max-xl:flex-col'>
              <img alt='...' className=' w-6/12' src='https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/44884fd60c6d5aa5849e0428/9.png' />
              <div className=' w-1/3 mt-10 relative my-10'>
                <h1 className=' text-4xl font-semibold mb-8'>About US</h1>
                <h1 className=' text-pink-400  break-words'>
                  Xin chào mọi người, Tôi là Phạm Văn Hùng, sinh viên trường cao đẳng FPT.
                </h1>
                <h1 className=' text-pink-400  break-words'>
                  HungLuxry là dự án làm web bán sách cuối năm học của tôi. Trang web có các tính năng cơ bản của 1 trang web bán sách như: tìm kiếm theo tên, tên tác giả, lọc sách, xem chi tiết sản phẩm, đánh giá sản phẩm, thêm giỏ hàng và mua sách.
                  Trang web có tính năng bảo mật và quản lý thông tin cá nhân của khách hàng.
                </h1>
                <div className=' bg-pink-400 py-6 w-1/3 max-xl:w-full text-white text-center absolute right-0 flex flex-col space-y-3'
                  style={{ borderRadius: '40% 20% / 50% 20%' }}
                >
                  <a className=' text-lg font-semibold underline underline-offset-2 cursor-pointer' href='https://github.com/phamhung2811' target='blank'>-GitHub</a>
                  <a className=' text-lg font-semibold underline underline-offset-2 cursor-pointer pl-5' href='https://www.facebook.com/profile.php?id=100045148546635' target='blank'>-Facebook</a>
                  <a className=' text-lg font-semibold underline underline-offset-2 cursor-pointer pl-6' href='https://www.instagram.com/hugsicula_/' target='blank'>-Instagram</a>
                </div>
              </div>
            </div>
            <h1 className=' text-4xl text-blue-600 pt-20'>Chi tiết sản phẩm</h1>
            <div className='w-full  flex justify-center items-start space-x-10 text-lg max-xl:flex-col max-xl:items-center'>
              <div className=' w-5/12 break-words'>
                -<a className=' cursor-pointer underline hover:text-blue-600 active:scale-105' href='/' target='blank'>Frontend</a>:
                <br></br>ReactJS, Redux/toolkit, TailwindCSS, Firebase, MUI, một vài thư viện để xử lý giao diện và react-i18next để chuyển đổi ngôn ngữ.
                Ngoài ra có sử dụng socket.io-client để sử dụng chat realtime với admin.
                <br></br>
                <br></br>
                <br></br>
                -<a className='cursor-pointer underline hover:text-blue-600 active:scale-105' href='/' target='blank'>Backend</a>:
                <br></br>

                Nodejs, ExpressJS, sequelize, socket.io, JWT để tăng tính bảo mật của tài khoản và nodemailer để gửi mail từ admin về người dùng hoặc ngược lại
              </div>
              <img alt='bg' src={bg} className=' w-5/12 rounded-xl border border-blue-100' />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
