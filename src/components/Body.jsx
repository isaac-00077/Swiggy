import React from 'react'
import { useEffect, useState } from 'react'
import Dishes from './dishes'
import Restaurants_chain from './Restaurants_chain'
import Restaurants_online from './Restaurants_online'
import { useSelector } from 'react-redux'
import Shimmer from './Shimmer'
import useRestaurantData from '../hooks/useRestaurantData'
import Footer from './Footer'
// import result from '../api_data/res_data.json'

function Body() {
  const [unservicable,topResTitle,topOnlineResTitle,dishes_data,restaurant_chain_data,filterVal] = useRestaurantData();
  
  const filterData= (restaurant_chain_data || []).filter((item)=>{

    if(!filterVal) return true;

    switch(filterVal){
      case "Rating 4.0+": return item?.info?.avgRating>4;
      case "Rs. 300-600": return item?.info?.costForTwo.split(" ")[0].slice(1) >="300" && item?.info?.costForTwo.split(" ")[0].slice(1) <="600";
      case "Offers": return item?.info?.aggregatedDiscountInfoV3
      case "Less than Rs. 300": return item?.info?.costForTwo.split(" ")[0].slice(1) <"300";
      default: return true;
    }
  });

  if(unservicable?.communication){
    return (
      <div className={`flex items-center justify-center flex-col mt-32`}>
        <img className='w-72' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
        <h1 className='text-2xl font-bold ml-4 mt-4'>Location Unserviceable</h1>
        <p className='max-w-[24rem] text-center text-gray-500 mt-1'>We don't have any services here till now. Try changing location.</p>
      </div>
    )
  }

  return (
    <div className='w-full'>
      {
        restaurant_chain_data.length ? (
        <>
          <div className='w-[75%] mx-auto mt-3 overflow-hidden'>
             {dishes_data.length > 0 && <Dishes data={dishes_data}/>}
             <Restaurants_chain data={restaurant_chain_data || []} title={topResTitle}/>
             <Restaurants_online data={filterVal ? filterData : (restaurant_chain_data || [])} title={topOnlineResTitle}/>
        </div>
        <Footer/>
        </>
        ):(<Shimmer/>)
      }
        
    </div>

  )
}

export default Body