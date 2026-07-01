import React, { useEffect, useState } from 'react'
import Restaurant_cards from './Restaurant_cards'

function Restaurants_chain({ data, title }) {

    const CARD_WIDTH = 349;
    const VISIBLE_CARDS = 4;

    const maxTranslate = (data.length - VISIBLE_CARDS) * CARD_WIDTH;
  
    const [value,setValue]=useState(0)

    function handleNext() {
        if (value < maxTranslate) {
            setValue(prev =>
            Math.min(prev + CARD_WIDTH, maxTranslate)
            );
        }
    }

    function handlePrev() {
        if (value > 0) {
            setValue(prev =>
            Math.max(prev - CARD_WIDTH, 0)
            );
        }
    }

    return (
        <div className='mt-10'>
            <div className='flex justify-between mt-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <div className='flex gap-2'>
                <div onClick={handlePrev} className={`rounded-full w-9 h-9 flex items-center justify-center cursor-pointer `+ (value<=0 ? "bg-gray-100":"bg-gray-200")}>
                    <i className={`text-[1rem] fa-solid fa-arrow-left `+ (value<=0 ? "text-gray-300" : "text-gray-800")}></i>
                </div>
                <div onClick={handleNext} className={`rounded-full w-9 h-9 flex items-center justify-center cursor-pointer `+ (value>=maxTranslate ? "bg-gray-100":"bg-gray-200")}>
                    <i className={`text-[1rem] fa-solid fa-arrow-right `+ (value>=maxTranslate ? "text-gray-300" : "text-gray-800")}></i>
                </div>
                </div>
            </div>
            <div className={`flex mt-4 gap-10 duration-[300ms]`} style={{transform: `translateX(-${value}px)`}}>
                {
                    data.map(({ info ,cta:{link}}, index) => (
                        <div className='hover:scale-95 duration-75' key={info.id ?? link ?? index}>
                            <Restaurant_cards {...info} link={link} />
                        </div>
                    ))
                }
            </div>
            <hr className='border mt-9'/> 
        </div>
    )
}

export default Restaurants_chain