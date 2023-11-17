import React, { useEffect, useState } from 'react'
import { CartApi } from '../../../Network/Cart';
import { useNavigate } from 'react-router-dom';
import { Bill } from '../../../Network/Bill';

export default function ListBill({ bill, bills, getBill }) {

    const [cart, getCart] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        CartApi.getCartByBillId(bill.id).then(res => getCart(res.data))
            .catch(err => console.error(err));
    }, [bill]);

    if (!cart) return null;

    return (
        <div
            className=' flex items-start justify-between my-5'
        >
            {cart.length === 1 ? (
                <div
                    className=' w-1/6 cursor-pointer'
                    onClick={() => {
                        navigate(`/bill/${bill.id}`)
                    }}
                >
                    <img alt='sp' src={cart[0].Product.image} className=' w-full' />
                </div>
            ) : (
                <div
                    className=' w-1/6 grid grid-cols-2 grid-rows-2 cursor-pointer'
                    onClick={() => {
                        navigate(`/bill/${bill.id}`)
                    }}
                >
                    {cart.slice(0, 4).map((book, index) => (
                        <img alt='sp' key={index} src={book.Product.image} className='w-full border border-gray-200' />
                    ))}
                    {cart.length > 4 && (<h1 className=' text-base text-gray-400'>Còn thêm</h1>)}
                </div>
            )
            }
            <div
                className=' w-6/12 cursor-pointer'
                onClick={() => {
                    navigate(`/bill/${bill.id}`)
                }}
            >
                <ul className=' list-disc'>
                    {cart.map((book, index) => (
                        <li className=' flex items-start justify-between text-base w-full' key={index}>
                            {book.Product.name}
                            <h1 className=' ml-5'>x{book.amount}</h1>
                        </li>
                    ))}
                </ul>
            </div>
            <h1>
                {bill.payment.toLocaleString()}đ
            </h1>
            {bill.status === 'đang xử lý' && (
                <div
                    className=' h-full flex items-center justify-center'
                    onClick={() => {
                        Bill.updateBill({ status: 'đã hủy' }, bill.id).then(res => {
                            const newbill = bills.filter(dele => dele.id !== bill.id);
                            getBill(newbill);
                        }).catch(err => {

                            console.log(err);
                        });
                    }}
                >
                    <button className=' p-1 text-white bg-red-500 rounded-lg text-base font-semibold hover:bg-red-600'>Hủy đơn</button>
                </div>
            )}

            {bill.status === 'đã hủy' && (
                <div
                    className=' h-full flex items-center justify-center'
                    onClick={() => {
                        Bill.deleteBill(bill.id).then(res => {
                            const newbill = bills.filter(dele => dele.id !== bill.id);
                            getBill(newbill);
                        }).catch(err => {

                            console.log(err);
                        });
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className=' fill-red-600 cursor-pointer'>
                        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                    </svg>
                </div>
            )}
        </div>
    )
}
