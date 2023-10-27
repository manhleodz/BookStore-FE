import React from 'react';
import Countdown from "react-countdown";

const Completionist = () => <span>You are good to go!</span>;

export default function CountDown() {
    return (
        <Countdown date={Date.now() + 86400000}>
            <Completionist />
        </Countdown>
  )
}
