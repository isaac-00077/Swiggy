import React from 'react'
import { data } from 'react-router-dom'
import { veg, nonveg } from '../utils/links'
import AddToCartBtn from './AddToCartBtn'
import { Link } from 'react-router-dom'
import DetailCardItem from './DetailCardItem'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { cardToggle } from '../utils/toggleSlice'
import { setSimiliarResDish } from '../utils/toggleSlice'

function DishesSearch({data:{info,hideRestaurantDetails,restaurant:{info:resInfo}}}) {  
  const dispatch = useDispatch()
  const {id:cartResId}=useSelector((state) => state.cartSlice.resInfo)
  const [showDetailCard, setShowDetailCard] = useState(false)
  const {imageId="",name,price,isVeg=0,id:itemId}=info
  const {id,name:resName,areaName,locality,avgRating,sla:{slaString},slugs:{city,restaurant:resLocation},totalRatingsString,aggregatedDiscountInfoV3,aggregatedDiscountInfoV2}=resInfo
  const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
 
  function handleSameRes(){
    if(id === cartResId || !cartResId){
      dispatch(setSimiliarResDish({
            isSimiliarDish:true,
            city,
            resId:id,
            resLocation,
            itemId
        }))
    }

  }

  return (
    <>
        <div className='m-2 mt-3 mx-[8.5px] px-4 pt-5 bg-white shadow-md rounded-[1.25rem] w-[96%]'>
            {!hideRestaurantDetails && 
            <>
                <Link to={`/menu/${[slugify(resName), slugify(locality), slugify(areaName)].filter(Boolean).join("-")}-rest${id}`}>
                    <div className='flex justify-between items-center'> 
                        <div>
                            <p className='text-sm text-[#4d5054]'>By {resName}</p>
                            <p className='text-[13.02px] text-[#676a6d] flex items-center'><i className="fa-solid fa-star text-[10px] pr-[17px]"></i>{totalRatingsString ? `${avgRating} (${totalRatingsString}) • ${slaString}` : `${avgRating} • ${slaString}`}</p>
                            {aggregatedDiscountInfoV3?.header ? (
                                <p className='text-[13.02px] text-[#ED5E0E] flex items-center'>
                                    <i className="fa-solid fa-percent text-[10px] pr-[14px]"></i>
                                    {aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader}
                                </p>
                            ) : aggregatedDiscountInfoV2?.header ? (
                                <p className='text-[13.02px] text-[#ED5E0E] flex items-center'>
                                    <i className="fa-solid fa-percent text-[10px] pr-[14px]"></i>
                                    {aggregatedDiscountInfoV2?.header} {aggregatedDiscountInfoV2?.subHeader}
                                </p> ):""}
                        </div>
                        <i className="fa-solid fa-arrow-right text-[#868891] text-lg"></i>
                    </div>
                </Link>
                <div className="border-t-2 border-dotted my-3"></div>
            </>}
            <div className='my-4 flex justify-between'>
                <div className='w-[49%]'>
                    <div className='size-4 mt-2'>
                        {
                        isVeg ? <img src={veg} alt="" /> : <img src={nonveg} alt="" />
                        }
                    </div>
                    <p className='text-[18px]'>{name}</p>
                    <p>₹{price / 100}</p>
                    <button onClick={() => { setShowDetailCard(true); dispatch(cardToggle(true)); }} className={`border border-[#c9c7c7] rounded-full px-2 py-[3px]  text-[13px]  text-[#5b5b5b] flex items-center gap-1 justify-center cursor-pointer mt-3`}>
                        More Details
                        <i className="fa-solid fa-angle-right text-[10px]"></i>
                    </button>
                </div>
                <div className='w-[47%] relative h-full mt-2 '>
                    <img onClick={() => { setShowDetailCard(true); dispatch(cardToggle(true)); }} className="object-cover rounded-xl w-[156px] h-[144px] flex float-end" src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt="" />
                    <div onClick={handleSameRes}>
                        <AddToCartBtn info={info} resInfo={resInfo} />
                    </div>
                    <p className='text-[#a9aaac] text-[13px] pt-[10.2rem] pl-8 lmd:pl-14'>Customisable</p>
                </div>
            </div>
        </div>
        {showDetailCard && <DetailCardItem setShowDetailCard={setShowDetailCard} info={info} resInfo={resInfo} indicator={"DishesSearch"} />}
    </>
  
  )
}

export default DishesSearch