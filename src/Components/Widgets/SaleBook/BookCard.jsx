import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function BookCard({ book }) {

    if (!book) return null;

    const sold = book.sold * 100 / book.quantity;
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div
            className=' bg-white border border-gray-200 m-2 px-3 w-full h-auto hover:shadow-2xl cursor-pointer flex flex-col justify-center items-center'
            style={{ maxWidth: "190px" }}
            onClick={() => {
                navigate(`/detail/${book.name}/${book.id}`);
            }}
        >
            <div className='blurred-img w-full h-auto flex items-center justify-center'>
                <img
                    alt="..." src={book.image} className='object-contain'
                    style={{ height: "220px", maxWidth: "150px" }}
                    title={book.name}
                />
            </div>
            <div className='w-44' >
                <p className='font-medium h-10 pt-3 mb-2 text-left break-words' style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}>{book.name}</p>
                <span className='  relative text-red-500 font-bold text-xl text-left'>{book.price.toLocaleString()}đ</span>
            </div>
            <div className='h-6 w-full bg-red-400 rounded-2xl'>
                <div className={`h-full bg-red-600 rounded-l-2xl ${sold == 100 && 'rounded-2xl'}`} style={{ width: `${sold}%` }}></div>
            </div>
            <h1 className=' relative bottom-6 text-white'>{t('sold')} {book.sold}</h1>
        </div>
    )
}
