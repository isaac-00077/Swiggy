import React from 'react'
import { Link } from 'react-router-dom'

function Restaurant_cards(info) {
  return (
    <Link to={`/menu/${info?.link.split('/')[5]}`}>
        <div className='min-w-[312px] h-[208px] relative'>
            <img className='w-full h-full rounded-2xl object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`} alt="" />
            <div className='rounded-2xl absolute w-full h-full top-0 bg-gradient-to-t from-black from-1% to-transparent to-40%'></div>
            <p className='font-sans absolute bottom-0 text-white text-xl ml-3 mb-2 font-extrabold'>{info?.aggregatedDiscountInfoV3?.header ? info?.aggregatedDiscountInfoV3?.subHeader ? `${info?.aggregatedDiscountInfoV3?.header} ${info?.aggregatedDiscountInfoV3?.subHeader}` : info?.aggregatedDiscountInfoV3?.header : ""}</p>
        </div>
        <div className='mt-[0.60rem] font-gilroy ml-3'>
            <h2 className='text-lg font-bold'>{info?.name}</h2>
            <div className="flex items-center gap-1 mt-[-0.2rem]"><span><svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#1e933c"><path d="m320-240 160-122 160 122-60-198 160-114H544l-64-208-64 208H220l160 114-60 198ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></span><span className='ml-[-0.1rem]'>{info?.avgRating}</span><div className='w-[0.28rem] h-[0.28rem] rounded-full flex items-center justify-center bg-black'></div><span>{info?.sla?.slaString}</span></div>
            <p className='text-[#86888b] text-base line-clamp-1'>{info?.cuisines?.join(", ")}</p>
            <p className='text-[#86888b] mt-[-0.1rem]'>{info?.areaName}</p>
        </div>
    </Link>
  )
}

export default Restaurant_cards