import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {

    var date = Date.now();

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [inputDate, setInputDate] = useState("1 Dec 2023");
    const [currentDate, setCurrentDate] = useState(inputDate);
    const [endTime, setEndTime] = useState(null);
    const [flashSale, setFlashSale] = useState(null);
    const [page, setPage] = useState(1);


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
        <div className=' flex items-center space-x-3'>
            <div className="countdown-value flex items-center w-10 h-10 justify-center bg-white">
                <p className="big-text">{days}</p>
            </div>
            <span>Ngày</span>
            <div className="countdown-value flex items-center w-10 h-10 justify-center bg-white">
                <p className="big-text">{hours}</p>
            </div>
            <span>Giờ</span>
            <div className="countdown-value flex items-center w-10 h-10 justify-center bg-white">
                <p className="big-text">{minutes}</p>
            </div>
            <span>Phút</span>
            <div className="countdown-value flex items-center w-10 h-10 justify-center bg-white">
                <p className="big-text">{seconds}</p>
            </div>
            <span>Giây</span>
        </div>
    );
}