import React, { useState } from 'react';
import Code from './Code';

export default function Coupon({ setCouponId, coupon, setAfterCoupon, total }) {

    const [selectedCoupon, setSelectedCoupon] = useState("");

    return (
        <div className=' w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-10 max-xl:mx-0 rounded-lg'>
            <div className=' bg-gray-50 rounded-lg p-3'>
                <div className=' text-2xl flex items-center justify-between'>
                    <div className='flex items-center '>
                        <img alt='cupon' src='https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/promotion/ico_coupon.svg' />
                        <h1>Mã giảm giá</h1>
                    </div>
                </div>
                {coupon && (
                    <>
                        <div className=' divide-y-2 divide-gray-300 text-xl text-black'>
                            {coupon.slice(0, 3).map((value, id) => (
                                <div className=' flex justify-between items-center' key={id}>
                                    <Code
                                        value={value}
                                        setAfterCoupon={setAfterCoupon}
                                        total={total}
                                        selectedCoupon={selectedCoupon}
                                        setSelectedCoupon={setSelectedCoupon}
                                        setCouponId={setCouponId}
                                    />
                                </div>
                            ))}
                        </div>
                        {coupon.length > 3 && (
                            <>
                                <div
                                    onClick={() => {
                                        document.getElementById("coupon-list").style.display = "block";
                                    }}
                                    className='p-1 w-full bg-blue-100 text-blue-500 rounded-lg flex items-center justify-between cursor-pointer hover:bg-blue-200 active:bg-blue-300'>
                                    Xem thêm mã giảm giá
                                    <span className=' text-lg'>{`>`}</span>
                                </div>
                                <div className=' hidden' id='coupon-list'>
                                    <div
                                        className=' fixed z-50 w-screen h-screen top-0 left-0 flex justify-center items-center'
                                        style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
                                    >
                                        <div className=' bg-white rounded-lg text-black'>
                                            <div className=' p-5'>
                                                <div className=' w-full text-right'>
                                                    <div
                                                        className=' flex items-center justify-center r w-1/12 cursor-pointer p-1 bg-blue-400'
                                                        onClick={() => {
                                                            document.getElementById("coupon-list").style.display = "none";
                                                        }}
                                                    >X</div>
                                                </div>
                                                <div className=' divide-y-2 divide-gray-300 text-xl '>
                                                    {coupon.map((value, id) => (
                                                        <div className=' flex justify-between items-center' key={id}>
                                                            <Code
                                                                value={value}
                                                                setAfterCoupon={setAfterCoupon}
                                                                total={total}
                                                                selectedCoupon={selectedCoupon}
                                                                setSelectedCoupon={setSelectedCoupon}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
