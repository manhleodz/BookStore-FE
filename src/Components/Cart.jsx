import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CouponApi } from '../Network/Coupon';
import { useNavigate, useParams } from 'react-router-dom';
import Table from './Widgets/Payment/Table';
import loginPng from '../Assets/loginpng.png';
import Coupon from './Widgets/Payment/Coupon';
import Footer from './Widgets/Footer/Footer';
import { CartApi } from '../Network/Cart';
import { Bill } from '../Network/Bill';
import { deleteCart } from '../Redux/AuthenticationSlice';

export default function Cart() {

    const cart = useSelector((state1) => state1.authentication.cart);
    const user = useSelector((state2) => state2.authentication.user);
    const dispatch = useDispatch();
    const userId = useParams();
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState([]);
    const [selected, setSelected] = useState([]);
    const [afterCoupon, setAfterCoupon] = useState(0);
    const [loading, setLoading] = useState(true);
    const [couponId, setCouponId] = useState(null);
    var total = 0;

    useEffect(() => {

        document.title = 'Giỏ hàng';

        CouponApi.getList().then(res => setCoupon(res.data));

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [total])

    if (selected.length > 0) {
        selected.map(cart => total += cart.total);
    }

    if (loading) {
        return (
            <div className=' fixed z-50 w-screen h-screen top-0 left-0 flex justify-center items-center'
                style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}>
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    if (!cart || !coupon) return null;

    return (
        <div className='bg-gray-200 h-full flex flex-col pb-56'>
            {!user ? (
                <div className='w-screen overflow-x-hidden'>
                    <div className='relative top-52 bg-gray-200'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className=' flex flex-col justify-center items-center text-4xl w-1/2 h-auto '>
                                <img alt='...' src={loginPng} className='w-7/12' />
                                <h1 className=' font-medium font-sans'>Vui lòng <a className=' underline hover:' href='http://localhost:3001/login'>đăng nhập</a> để tiếp tục</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='relative top-52 bg-gray-200'>
                    <div className='flex flex-col items-center justify-center mb-10'>
                        <div className='w-9/12 flex justify-center max-xl:flex-col'>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-8/12 max-xl:w-full bg-gray-50">
                                <Table selected={selected} setSelected={setSelected} userId={userId} total={total} />
                            </div>

                            <div className=' relative space-y-5 max-xl:space-y-0 max-xl:space-x-5 max-xl:flex max-xl:mt-4'>
                                <Coupon setCouponId={setCouponId} coupon={coupon} setAfterCoupon={setAfterCoupon} total={total} />
                                <div className=' w-full text-2xl text-left font-semibold mx-10 max-xl:mx-0 rounded-lg bg-white p-4 flex flex-col shadow-xl justify-center items-center'>
                                    <div className=' w-full h-auto bg-white text-xl flex justify-between mb-5'>
                                        Thành tiền: <span>{total !== 0 ? (total).toLocaleString() : 0}Đ</span>
                                    </div>
                                    <div className=' w-full h-auto bg-white text-xl flex justify-between mb-5'>
                                        Sau giảm giá: <span>{afterCoupon ? afterCoupon.toLocaleString() : total.toLocaleString()}Đ</span>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                if (selected.length !== 0) {
                                                    if (afterCoupon !== 0) {
                                                        Bill.createBill({
                                                            phone: user.phonenumber,
                                                            address: user.address,
                                                            price: total,
                                                            status: 'đang xử lý',
                                                            CouponId: couponId,
                                                            UserId: user.id,
                                                            payment: afterCoupon
                                                        }).then((res) => {
                                                            if (res.status === 200) {
                                                                let ids = [];
                                                                for (let i = 0; i < selected.length; i++) {
                                                                    ids.push(selected[i].id)
                                                                    const index = cart.findIndex((c) => c.cart.id === selected[i].id);
                                                                    dispatch(deleteCart(index));
                                                                }

                                                                CartApi.buyCart({
                                                                    ids: ids,
                                                                    BillId: res.data.id
                                                                }).then(() => {
                                                                    navigate(`/bill/${res.data.id}`);
                                                                })
                                                            }
                                                        })
                                                    } else {
                                                        Bill.createBill({
                                                            phone: user.phonenumber,
                                                            address: user.address,
                                                            price: total,
                                                            status: 'đang xử lý',
                                                            UserId: user.id,
                                                            payment: total
                                                        }).then((res) => {
                                                            if (res.status === 200) {
                                                                let ids = [];
                                                                for (let i = 0; i < selected.length; i++) {
                                                                    ids.push(selected[i].id)
                                                                    const index = cart.findIndex((c) => c.id === selected[i].id)
                                                                    dispatch(deleteCart(index));
                                                                }
                                                                CartApi.buyCart({
                                                                    ids: ids,
                                                                    BillId: res.data.id
                                                                }).then(() => {
                                                                    navigate(`/bill/${res.data.id}`);
                                                                })
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    alert("Bạn chưa chọn sản phầm nào");
                                                }
                                            }}
                                            type="button"
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-2xl px-5 py-2.5 mr-2 mb-2 uppercase"
                                        >
                                            Thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}
