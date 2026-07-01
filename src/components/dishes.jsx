import React from 'react'
import { useEffect, useState } from 'react'

function Dishes({data}) {    
  const [value,setValue]=useState(0)
  const CARD_WIDTH = 168;
  const VISIBLE_CARDS = 9;
  const maxTranslate = (data.length - VISIBLE_CARDS) * CARD_WIDTH;

  function handlePrev(){
    if (value > 0) {
      setValue(prev => Math.max(prev - CARD_WIDTH, 0));
    }
  }

  function handleNext(){
    if (value < maxTranslate) {
      setValue(prev => Math.min(prev + CARD_WIDTH, maxTranslate));
    }
  }

  return (
    <div>
          <div className='flex justify-between mt-2'>
            <h1 className='text-2xl font-bold'>What's on your mind?</h1>
            <div className='flex gap-2'>
              <div onClick={handlePrev} className={`rounded-full w-9 h-9 flex items-center justify-center cursor-pointer `+ (value<=0 ? "bg-gray-100":"bg-gray-200")}>
                <i className={`text-[1rem] fa-solid fa-arrow-left `+ (value<=0 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
              <div onClick={handleNext} className={`rounded-full w-9 h-9 flex items-center justify-center cursor-pointer `+ (value>=maxTranslate ? "bg-gray-100":"bg-gray-200")}>
                <i className={`text-[1rem] fa-solid fa-arrow-right `+ (value>=maxTranslate ? "text-gray-300" : "text-gray-800")}></i>
              </div>
            </div>
          </div>
          <div style={{transform: `translateX(-${value}px)`}} className={`flex duration-1000`}>
              {
                data.map((item, index)=>(
                  <img key={item.imageId ?? index} className="w-[164px]" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
                ))
              }
          </div>
          <hr className='border'/> 
    </div>
  )
}

export default Dishes