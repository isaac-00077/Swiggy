import React from 'react'
import { data } from 'react-router-dom'

function Shimmer() {
  return (
    <div className='w-full'>
        <div className='w-full h-[330px] bg-[#171a29] text-white flex flex-col justify-center items-center gap-8'>
            <div className='relative flex'>
                <span className="loader"></span>
                <img className='size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy.f_auto.q_auto/icecream_wwomsa" alt="" />
            </div>
            <h1 className='text-[27px] text-gray-300'>Looking for great food near you ...</h1>
        </div>
        <div className='w-[80%] mx-auto flex flex-wrap gap-10 items-center justify-center py-10'>
            {Array(18).fill("").map((data, index) => (
                <span className="loader1" key={index}></span>
            ))}
        </div>
    </div>
  )
}

export default Shimmer

export function MenuShimmer(){
    return(
        <div className="w-full lg:w-[50%] mx-auto mt-10">
            <div className="w-full h-40 sm:h-80 rounded-xl animate"></div>
            <div className="w-full flex mt-10 justify-between">
                <div className="w-[45%] h-10 rounded-xl animate"></div>
                <div className="w-[45%] h-10 rounded-xl animate"></div>
            </div>
            <div className="w-full mt-20 flex flex-col gap-10">
                     {Array(5).fill("").map((data, index) => (
                         <div className='w-full h-40 flex justify-between' key={index}>
                        <div className='w-[60%] flex flex-col gap-5 h-full'>
                            <div className="w-[100%] h-5 animate"></div>
                            <div className="w-[50%] h-5 animate"></div>
                            <div className="w-[30%] h-5 animate"></div>
                        </div>
                        <div className='w-[30%] rounded-xl h-full animate'></div>
                   </div>
                ))}
            </div>
        </div>
    )
}


export function SearchShimmer(){
    return(
        <div className="w-full mx-auto">
            <div className='grid grid-cols-2 gap-10 gap-x-96 mt-7 mx-auto pl-11 pb-7'>
                {Array(24).fill("").map((data, index) => (
                    <span className="loader3" key={index}></span>
                ))}
            </div>
        </div>
    )
}