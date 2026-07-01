import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantSearch({data:{card:{card:{info:{id,cloudinaryImageId,areaName,locality,totalRatingsString,aggregatedDiscountInfoV3,promoted=false,cuisines,costForTwoMessage,name,avgRating,sla:{slaString,lastMileTravelString}}}}}}) {
  const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return (
    <Link to={`/menu/${[slugify(name), slugify(locality), slugify(areaName)].filter(Boolean).join("-")}-rest${id}`}>
      <div className='m-[11.5px] p-4 bg-white  flex gap-4 items-center'>
        <div className=''>
          <div className='w-[88px] h-[96px] relative'>
              <img className='rounded-lg w-full h-full  object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`} alt="" />
              {aggregatedDiscountInfoV3?.discountTag && <p className={`text-[9px] bg-[#ed5e0e] text-white absolute px-3 py-[2px] rounded-t-lg ${aggregatedDiscountInfoV3?.subHeader ? 'bottom-[26px] left-[11px]' : 'bottom-4 left-[10px]'}`}>{aggregatedDiscountInfoV3?.discountTag}</p>}
              {aggregatedDiscountInfoV3?.header && <div className={`text-[#ff5200] absolute  flex flex-col rounded-[0.25rem] shadow-lg items-center border bg-white  gap-[2px] justify-center ${aggregatedDiscountInfoV3?.subHeader ? 'w-[74px] h-[36px] -bottom-2 right-[6px]' : 'w-[72px] h-[26px] pt-[2px] -bottom-2 right-[8px]'} text-center`}>
                <p className='text-[14.98px] w-[70.96px] h-[13.98px] flex items-center justify-center'>{aggregatedDiscountInfoV3?.header}</p>
                {aggregatedDiscountInfoV3?.subHeader && <p className='text-[7.98px] w-[70.96px] h-[6.98px]'>• {aggregatedDiscountInfoV3?.subHeader} •</p>}
              </div>}
          </div>
        </div>
        <div>
          <p>{name}</p>
          <p className='text-[13.02px] text-[#676a6d] flex items-center'><i className="fa-solid fa-star text-[10px] pr-[17px]"></i>{avgRating} ({totalRatingsString})<span className='text-[12px] text-[#676a6d] px-1'> • </span>{slaString}</p>
          <div>
            <p className='text-[14px] text-[#808285] line-clamp-1'>{cuisines.join(", ")}</p>
            <div className='-mt-1'>
                <span className='text-[14px] text-[#808285]'>{areaName}</span><span className='text-[12px] text-[#676a6d]'> • </span><span className='text-[12px] text-[#676a6d]'>{lastMileTravelString}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantSearch

export function withHoc(WrappedCom){
  return (prop)=>{
    return(
      <div className='relative'>
        <p className='text-[12px] bg-[#080808] opacity-70 text-white absolute top-8 z-50 left-6 px-1 rounded-[4px]'>Ad</p> 
        <WrappedCom {...prop} />
      </div>
    );
  }
}