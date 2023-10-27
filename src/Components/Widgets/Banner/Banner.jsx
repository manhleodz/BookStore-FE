import React from 'react';
import { Slider } from './Slider';
import slides from './mock.json';

export default function Banner() {
  return (
    <>
        <Slider slides={slides}/>
    </>
  )
}
