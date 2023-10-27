import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function SideBar() {

    const {t} = useTranslation();

    return (
        <>
            <div className=' bg-white rounded-lg text-xl w-full h-1/12 p-6  divide-y-2 divide-gray-600 shadow-xl'>
                <h1 className=' text-2xl text-red-600 font-semibold'>{t('account')}</h1>
                <Link to={`info`}>
                    <div className=' text-base text-gray-600 hover:text-yellow-600 cursor-pointer active:text-red-600 my-3 border-b-2 border-gray-300'>
                        {t('info')}
                    </div>
                </Link>
                <Link to={`orders/processing`}>
                    <div className="">
                        <div className=' text-base text-gray-600 hover:text-yellow-600 cursor-pointer active:text-red-600 my-3 border-b-2 border-gray-300'>
                            {t('myorder')}
                        </div>
                    </div>
                </Link>
                <Link to={`comments`}>
                    <div className=' text-base text-gray-600 hover:text-yellow-600 cursor-pointer active:text-red-600 my-3 border-b-2 border-gray-300'>
                        {t('mycmt')}
                    </div>
                </Link>
            </div>
        </>
    )
}
