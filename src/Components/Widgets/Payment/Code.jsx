import React, {useState} from 'react'

export default function Code({ setCouponId, value, setAfterCoupon, total, selectedCoupon, setSelectedCoupon }) {

    return (
        <>
            <div className=' flex flex-col'>
                <h1 className=' uppercase font-semibold'>{value.name}</h1>
                <p className=' text-sm text-gray-500 w-80' style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}>Chỉ áp dụng với đơn hàng có giá trị trên 300.000đ</p>
                <h1 className=' text-lg'>Chỉ còn {value.quantity} mã</h1>
            </div>
            <div>
                {selectedCoupon === value.id ? (
                    <button
                        onClick={() => {
                            setSelectedCoupon();
                            setAfterCoupon(total)
                            setCouponId(null);
                        }}
                        type="button"
                        className=" w-20 text-gray-900 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        Bỏ
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (value.name.includes("15%")) {
                                setAfterCoupon(total * 0.85);
                            } else if (value.name.includes("20%")) {
                                setAfterCoupon(total * 0.8);
                            } else if (value.name.includes("10%")) {
                                setAfterCoupon(total * 0.9);
                            }
                            setSelectedCoupon(value.id);
                            setCouponId(value.id); 
                        }}
                        type="button"
                        className={` w-20 text-gray-900 bg-gradient-to-r ${total >= 300000 ? 'from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300' : 'bg-gray-600 text-white '}  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2`}
                        disabled={total < 300000}
                    >
                        Áp dụng
                    </button>
                )}
            </div>
        </>
    )
}
