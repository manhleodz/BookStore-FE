import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ endTime1 }) {

    let endTime = localStorage.getItem('endTime');
    
    if (!endTime) {
        let endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + endTime1);
    }

    const calculateTimeLeft = () => {
        let diff = new Date(endTime) - new Date();
        let timeLeft = {};

        if (diff > 0) {
            timeLeft = {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        localStorage.setItem('endTime', endTime);
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className=' text-black bg-white rounded-md p-1 font-semibold uppercase'>
            {timeLeft.hours} h {timeLeft.minutes} m {timeLeft.seconds} s
        </div>
    );
}