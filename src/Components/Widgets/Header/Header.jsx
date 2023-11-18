import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import { setLanguage, signOut } from '../../../Redux/AuthenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Cart/Cart';
import { useTranslation } from 'react-i18next';


export default function Header({ user }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const language = useSelector(state => state.authentication.language);

    const { t, i18n } = useTranslation()

    const handleChange = (e) => {
        dispatch(setLanguage(e.target.value));
        i18n.changeLanguage(e.target.value);
    }

    return (
        <>
            <nav
                className="bg-green-200 border-gray-200 fixed w-full top-0"
            >
                <div className='bg-green-500 text-white text-lg flex flex-wrap items-center justify-around'>
                    <h1 className=' font-semibold'>{t('freeship')}</h1>
                    <div className='flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='white' className=' mx-2'>
                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                        </svg>
                        {t('contact')}
                    </div>
                    <div className='flex items-center space-x-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='white' className=' cursor-pointer' onClick={() => { window.open('https://www.facebook.com/profile.php?id=100045148546635', '_blank', 'noopener,noreferrer') }}>
                            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='white' className=' cursor-pointer' onClick={() => { window.open('https://www.instagram.com/hugsicula_/', '_blank', 'noopener,noreferrer') }}>
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='white' className=' cursor-pointer' onClick={() => { window.open('https://twitter.com/', '_blank', 'noopener,noreferrer') }}>
                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                        </svg>
                        <div className=' h-full flex items-center'>
                            {language === 'EN' && (
                                <>
                                    <img alt='...' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041' className=' w-5 h-5 object-cover rounded-full cursor-pointer' />
                                </>
                            )}
                            {language === 'VN' && (
                                <>
                                    <img alt='...' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png' className=' w-5 h-5 object-cover rounded-full cursor-pointer' />
                                </>
                            )}
                        </div>
                        <select className=' bg-gray-500 rounded-md' onChange={handleChange}>
                            <option>
                                VN
                            </option>
                            <option>
                                EN
                            </option>
                        </select>
                    </div>
                </div>
                <div
                    className="max-w-screen-xl flex flex-wrap items-center justify-between max-lg:justify-start max-lg:flex-nowrap max-md:justify-between max-md:flex-col max-sm:justify-between max-sm:flex-col mx-auto p-3"
                >
                    <div
                        className="flex items-center"
                        onClick={() => {
                            sessionStorage.setItem("selectedAuthor", []);
                            sessionStorage.setItem("selectedCategory", []);
                            sessionStorage.setItem("selectedPrice", []);
                            navigate('/');
                        }}
                    >
                        <img src="https://previews.123rf.com/images/muhammadmisbakhujjamil/muhammadmisbakhujjamil1809/muhammadmisbakhujjamil180900002/109100933-bookstore-logo-design-template-icon-vector.jpg" className="h-16 mr-3 rounded-full  cursor-pointer" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-bold whitespace-nowrap text-green-600  cursor-pointer">HungLuxury</span>
                    </div>
                    <div className="flex items-center md:order-2">
                        <div>
                            <button type="button" className="flex items-center mr-3 text-sm rounded-full md:mr-0" id="user-menu-button">
                                <span className="sr-only">Open user menu</span>
                                {(() => {
                                    if (user) {
                                        return (
                                            <div className=' inline-block relative '>
                                                <div className='flex'>
                                                    <span className=' text-base font-medium pointer-events-none'>{t('hello')} {user.username}</span>
                                                    <div className='dropdown-icon' id="user-dropdown">
                                                        <img
                                                            className=" w-8 h-8 rounded-full ml-1"
                                                            src={user.avatar} alt="user"
                                                            id='avatar'
                                                        />
                                                        <div
                                                            className=" dropdown-user z-50 absolute right-0 top-7 text-xl bg-white divide-y divide-gray-100 rounded-lg shadow"
                                                        >
                                                            <ul className="py-2 text-left" aria-labelledby="user-menu-button">
                                                                <li>
                                                                    <div onClick={() => navigate(`/profile/${user.id}/info`)} className=" w-56 cursor-pointer px-4 py-2 text-base text-gray-700 hover:bg-gray-100 flex items-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className=' px-2'>
                                                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                                                        </svg>
                                                                        {t('info')}
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div onClick={() => {
                                                                        dispatch(signOut())
                                                                    }}
                                                                        className="w-56 cursor-pointer px-4 py-2 text-base text-gray-700 hover:bg-gray-100 flex items-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className=' px-2'>
                                                                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                                                                        </svg>
                                                                        {t('logout')}
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <div className=' divide-x-2 divide-slate-500'>
                                                    <span
                                                        className=' mx-1 hover:underline'
                                                        onClick={() => navigate("/login")}
                                                    >
                                                        {t('login')}
                                                    </span>
                                                    <span
                                                        className=' pl-1 hover:underline'
                                                        onClick={() => navigate("/signup")}
                                                    >
                                                        {t('signup')}
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    }
                                })()}
                            </button>
                        </div>
                        <Cart />
                        <button onClick={() => { console.log(click); setClick(!click) }} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center z-50 absolute left-0 top-10 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 border-2 border-gray-500" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className='max-w-screen-xl flex flex-col-reverse items-center justify-between max-md:h-screen max-md:fixed max-md:w-1/2'>
                        <div className={` duration-1000  transition flex flex-col items-center justify-between max-md:-translate-x-full ${click && 'max-md:translate-x-0'} max-md:w-1/2 max-md:bg-white max-md:z-20 max-md:fixed max-md:left-0 max-md:top-0 max-md:h-screen md:flex md:w-auto md:order-1`} id="navbar-user">
                            <ul className="flex flex-col w-full max-md:w-full items-center border-gray-100 rounded-lg justify-center font-medium p-4 md:p-0 mt-4 border rounded-l md:flex-row md:space-x-8 md:mt-0 md:border-0 max-md:h-screen" >
                                <li>
                                    <div className="block cursor-pointer hover:underline text-lg py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={() => { navigate('/') }}>{t('homepage')}</div>
                                </li>
                                <li>
                                    <div className="block cursor-pointer hover:underline text-lg py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={() => { navigate('/about') }}>{t('About')}</div>
                                </li>
                                <li>
                                    <div className="block cursor-pointer hover:underline text-lg py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={() => { navigate('/contact') }}>{t('contact')}</div>
                                </li>
                            </ul>
                            <ul className=' max-md:absolute w-full max-md:top-20'>
                                <Search />
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
