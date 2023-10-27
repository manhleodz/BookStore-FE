import React, { useEffect, useState } from 'react';
import BookCard from '../SaleBook/BookCard';
import CountDownTimer from './CountDownTimer';
import axios from 'axios';
import { getApiUrl } from '../../../Utils/Config/getApiUrl';

export default function FlasheSale() {

    const [endTime, setEndTime] = useState(null);
    const [flashSale, setFlashSale] = useState(null);

    useEffect(() => {
        axios.get(`${getApiUrl}/flashsale`).then((response) => {
            if (response) {
                setEndTime(response.data[0].endTime);
            }
        }).catch((error) => {
            console.log(error);
        });

        axios.get(`${getApiUrl}/flashsale/products`).then((response) => {
            setFlashSale(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    if (!flashSale) return null;

    return (
        <div className='w-full flex flex-col justify-center items-center mt-7'>
            <div className='w-9/12 mt-8 flex flex-col justify-center items-center shadow-xl bg-white rounded-lg'>
                <div className=' w-full p-3  flex items-center bg-green-400 border-none rounded-lg'>
                    <div className=' w-7 h-7 flex items-center justify-center rounded-full bg-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='white'>
                            <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
                        </svg>
                    </div>
                    <div className='font-bold text-xl ml-1 w-full flex justify-between'>
                        <h1 className='text-white'>FLASH SALE:</h1>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-normal'>Kết thúc sau:</h1>
                            <CountDownTimer endTime1={endTime}/>
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-center mx-auto'>
                    <div
                        className='w-full overflow-auto  flex whitespace-nowrap'
                        onScroll={(e) => {
                            e.timeStamp = 0;
                        }}
                    >
                        {flashSale.map((book, index) => (
                            <div key={index} className=' inline-block'>
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-lg px-10 py-2 hover:bg-green-600   text-center mr-2 mb-2 bg-green-500">
                    Thêm
                </button>
            </div>
        </div>
    )
}
