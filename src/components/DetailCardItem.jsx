import React from 'react'
import { useDispatch } from 'react-redux'
import { cardToggle } from '../utils/toggleSlice'
import { veg, nonveg } from '../utils/links'
import AddToCartBtn from './AddToCartBtn'

function DetailCardItem({ setShowDetailCard, info, resInfo,indicator }) {
  const {imageId="",name,price,defaultPrice,isVeg=0,description,ratings:{aggregatedRating}={}}=info
  const dispatch = useDispatch()
  return (
    <div onClick={() => { setShowDetailCard(false); dispatch(cardToggle(false)); }} className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-3xl overflow-hidden w-[500px] ${indicator === "Restaurant_menu" ? "max-h-[699px]" : "h-[591px]"}`}>
        <div className={`${indicator === "Restaurant_menu" ? "h-[57.2%]" : "h-[68%]"} relative`}>
          <img className='w-full h-full object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt="" />
          <div onClick={() => { setShowDetailCard(false); dispatch(cardToggle(false)); }} className='cursor-pointer absolute top-5 right-5 bg-white size-7 flex items-center justify-center rounded-full'>
            <i className="fa-solid fa-xmark  text-[12px] text-[#505357]"></i>
          </div>
        </div>
        <div className='px-4  pt-2 pb-8'>
          <div className='size-4 mt-[6px]'>
            {
              isVeg ? <img src={veg} alt="" /> : <img src={nonveg} alt="" />
            }
          </div>
          <div className='w-full'>
            <div className='w-[74%] leading-tight mt-[4px]'>
              <p className='text-[18px] tracking-tight text-[#414449]'>{name}</p>
              <p className='mt-1'>₹{defaultPrice /100 || price /100}</p>
              { indicator === "Restaurant_menu" && (
                <div className='flex items-center gap-1 text-[13px] mt-2'>{aggregatedRating?.rating ? <><i className="text-[#116649] text-[10px] fa-solid fa-star"></i><span>{aggregatedRating?.rating} ({aggregatedRating?.ratingCountV2})</span></> : ""}</div>
              )}
            </div>
            <div className='relative'>
              <div className={`absolute ${indicator === "Restaurant_menu" ? "bottom-1 right-4" : "bottom-2 right-4"} `}>
                <AddToCartBtn info={info} resInfo={resInfo} />
                <p className='text-[#a9aaac] text-[13px] pt-[10.2rem] pl-8 lmd:pl-14'>Customisable</p>
              </div>
            </div>
          </div>
          <p className='text-[#676a6d] leading-tight mt-3 tracking-tight'>{description}</p>
        </div>
      </div>
    </div>      
  )
}

export default DetailCardItem