import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

export function Slider({ slides }) {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                // onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => { }}
                effect={"cube"}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                className=' mx-lg:w-0'
                style={{
                    height: '420px',
                    
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.image}>
                        <div className='flex justify-center items-center'>
                            <img
                                src={slide.image} alt={slide.title}
                                className='object-cover w-full max-lg'
                                style={{
                                    height: "420px",
                                    
                                }}
                            />
                         </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
