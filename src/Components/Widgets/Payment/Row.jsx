import { useEffect, useState } from "react";
import React from 'react'
import { CartApi } from "../../../Network/Cart";
import { useDispatch } from "react-redux";
import { setCart, deleteCart } from "../../../Redux/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import ToastMessage from '../ToastMessage';

export default function Row({ book, index, setLoading, userId, total, setSelected, selected, cart }) {

    const [quantity, setQuantity] = useState();
    const [alert, setAlert] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setAlert();
        if (book.Product.quantity - book.Product.sold < book.amount) {
            setAlert(`Chỉ còn lại ${book.Product.quantity - book.Product.sold} sản phẩm`);
        }
    }, [book]);

    return (
        <tr key={index} className="bg-white border-b text-black hover:bg-gray-50 ">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input
                        id="checkbox-table-search-1" type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                        onClick={(e) => {
                            if (e.target.checked) {
                                setSelected([...selected, book]);
                            } else {
                                const arr = selected.filter(cart => {
                                    return cart.id !== book.id;
                                })
                                setSelected(arr);
                                if (selected.length === 0) {
                                    total = 0;
                                }
                            }
                        }}
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <td className=" w-32 p-4">
                <img src={book.Product.image} alt="..." className=' cursor-pointer' onClick={() => navigate(`/detail/${book.Product.name}/${book.Product.id}`)} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                <h1 className=' w-10/12 cursor-pointer' onClick={() => navigate(`/detail/${book.Product.name}/${book.Product.id}`)}>
                    {book.Product.name}
                </h1>
            </td>
            <td className="px-6 py-4 w-2/12">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => {
                            if (book.amount > 1) {
                                setLoading(false);
                                CartApi.changeQuantity({
                                    id: book.id,
                                    amount: book.amount - 1,
                                    total: book.Product.price * (book.amount - 1),
                                }).then((res) => {
                                    setQuantity(book.amount - 1);
                                    CartApi.getList(userId.userId).then((response) => {
                                        if (response.data) {
                                            dispatch(setCart(response.data));

                                            setTimeout(() => {
                                                setLoading(true);
                                            }, 100);
                                        }
                                    });
                                }).catch(() => {
                                    setTimeout(() => {
                                        setLoading(true);
                                    }, 100);
                                })
                            }
                        }}
                        className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button"
                    >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>
                    <div>
                        <input
                            type="text" id={`${index}thProduct`} className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 "
                            defaultValue={book.amount}
                            value={quantity}
                            onChange={(e) => {
                                if (Number(e.target.value) < 100000 && Number(e.target.value) >= 0) {
                                    setQuantity(e.target.value);
                                } else {
                                    setQuantity(book.amount);
                                }
                            }}
                            onBlur={(e) => {
                                if (quantity !== '') {
                                    if (quantity > 0) {
                                        setLoading(false);
                                        CartApi.changeQuantity({
                                            id: book.id,
                                            amount: quantity,
                                            total: book.Product.price * (quantity),
                                        }).then(() => {
                                            CartApi.getList(userId.userId).then((response) => {
                                                if (response.data) {
                                                    setTimeout(() => {
                                                        setLoading(true);
                                                    }, 100);
                                                    dispatch(setCart(response.data));
                                                }
                                            });
                                        }).catch(() => {
                                            ToastMessage.showToastWarnMessage("Số sản phẩm còn lại không đủ")
                                            setQuantity(book.amount);
                                            setAlert("Số sản phẩm còn lại không đủ");
                                            setTimeout(() => {
                                                setLoading(true);
                                            }, 100);
                                        });
                                    } else {
                                        setQuantity(1);
                                        setLoading(false);
                                        CartApi.changeQuantity({
                                            id: book.id,
                                            amount: 1,
                                            total: book.Product.price * (1),
                                        }).then(() => {
                                            CartApi.getList(userId.userId).then((response) => {
                                                if (response.data) {
                                                    setTimeout(() => {
                                                        setLoading(true);
                                                    }, 100);
                                                    dispatch(setCart(response.data));
                                                }
                                            });
                                        }).catch(() => {
                                            ToastMessage.showToastWarnMessage("Số sản phẩm còn lại không đủ")
                                            setQuantity(book.amount);
                                            setAlert("Số sản phẩm còn lại không đủ");
                                            setTimeout(() => {
                                                setLoading(true);
                                            }, 100);
                                        });
                                    }
                                }
                            }}
                            required
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (book.Product.quantity - book.Product.sold > book.amount) {
                                setLoading(false);
                                CartApi.changeQuantity({
                                    id: book.id,
                                    amount: book.amount + 1,
                                    total: book.Product.price * (book.amount + 1),
                                }).then((res) => {
                                    if (res.data) {
                                        setQuantity(book.amount + 1);
                                        CartApi.getList(userId.userId).then((response) => {
                                            if (response.data) {
                                                setTimeout(() => {
                                                    setLoading(true);
                                                }, 100);
                                                dispatch(setCart(response.data));
                                                setTimeout(() => {
                                                    setLoading(true);
                                                }, 100);
                                            }
                                        });
                                    }
                                }).catch(() => {
                                    ToastMessage.showToastWarnMessage("Số sản phẩm còn lại không đủ")
                                    setQuantity(book.amount);
                                    setAlert("Số sản phẩm còn lại không đủ");
                                    setTimeout(() => {
                                        setLoading(true);
                                    }, 100);
                                });
                                selected.map(cart => total += cart.total);
                            }
                        }
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button"
                    >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
                {alert && (
                    <h1 className=' text-sm font-semibold absolute underline text-red-500'>{alert}</h1>
                )}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 w-2/12">
                {book.total.toLocaleString()} Đ
            </td>
            <td className="px-6 py-4"
            >
                <svg
                    onClick={() => {
                        const index = cart.findIndex((c) => c.id === book.id)
                        dispatch(deleteCart(index));
                        CartApi.removeBook(book.id);
                    }}
                    xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className=' fill-red-600 cursor-pointer'>
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
            </td>
        </tr>
    )
}
