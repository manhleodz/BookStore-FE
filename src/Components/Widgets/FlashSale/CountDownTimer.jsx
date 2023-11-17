import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {

    var date = Date.now();

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [inputDate, setInputDate] = useState("31 Dec 2023");


    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    useEffect(() => {

        date = date - 1000;
        const changingDate = new Date(inputDate);
        const currentDate = new Date();
        const totalSeconds = (changingDate - currentDate) / 1000;

        let myInterval = setInterval(() => {
            setDays(formatTime(Math.floor(totalSeconds / 3600 / 24)));
            setHours(Math.floor(totalSeconds / 3600) % 24);
            setMinutes(Math.floor(totalSeconds / 60) % 60);
            setSeconds(Math.floor(totalSeconds % 60));
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [date])

    return (
        <div className=' flex items-center font-light'>
            <div className="countdown-value flex items-center w-8 h-8 rounded-md justify-center bg-white">
                <p className="big-text">{days}</p>
            </div>
            <span className=' pr-3'>Ngày</span>
            <div className="countdown-value flex items-center w-8 h-8 rounded-md justify-center bg-white">
                <p className="big-text">{hours}</p>
            </div>
            <span className=' pr-3'>Giờ</span>
            <div className="countdown-value flex items-center w-8 h-8 rounded-md justify-center bg-white">
                <p className="big-text">{minutes}</p>
            </div>
            <span className=' pr-3'>Phút</span>
            <div className="countdown-value flex items-center w-8 h-8 rounded-md justify-center bg-white">
                <p className="big-text">{seconds}</p>
            </div>
            <span>Giây</span>
        </div>
    );
}