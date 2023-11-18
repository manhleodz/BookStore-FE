import React, { useEffect, useState } from 'react';
import { Product } from '../../../Network/Product';
import BookCard from '../SaleBook/BookCard';

export default function ListByCategory({ category }) {

    const [list, setList] = useState();

    useEffect(() => {
        Product.GetByCategory(`${category}`).then((res) => {
            setList(res.data);
        }).catch((err) => {
            alert(err.data)
        });
    }, [])

    if (!list) return (
        <div>

        </div>
    )
    return (
        <div className='w-full flex flex-col justify-center items-center mt-7'>
            <div className='w-9/12 mt-8 flex flex-col justify-center items-center shadow-xl bg-white rounded-lg relative z-10'>
                <div className='w-full px-3 py-2 flex items-center bg-green-400 border-none rounded-t-lg'>
                    <h1 className=' text-white text-2xl font-semibold'>Thể loại liên quan</h1>
                </div>
                <div className=' flex items-center justify-between w-full'>
                    <button
                        onClick={() => {
                            document.getElementById('container').scrollLeft -= 200;
                        }}
                        className='z-50 p-2 w-10 h-10 flex justify-center items-center active:scale-105 rounded-full bg-gray-300'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" className=' fill-gray-300'>
                            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                    </button>
                    <div
                        className='flex w-full items-center justify-start mx-auto overflow-hidden transition transform border-gray-200 shadow-sm p-1 border relative z-10' id='container'
                        style={{ width: `1300px`, transitionDuration: '5000ms' }}
                    >
                        <div
                            className='w-full flex whitespace-nowrap relative -z-10 transform transition duration-1000'
                            style={{ width: `${list.length * 200}px` }}
                            onScroll={(e) => {
                                e.timeStamp = 0;
                            }}
                        >
                            {list.map((book, index) => (
                                <div key={index} className=' inline-block'>
                                    <BookCard book={book.Product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            document.getElementById('container').scrollLeft += 200;
                        }}
                        className='z-50 p-2 w-10 h-10 flex justify-center items-center active:scale-105 rounded-full bg-gray-300'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" className=' fill-gray-300'>
                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
