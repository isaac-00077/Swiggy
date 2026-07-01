import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function useRestaurantData() {
  const [unservicable, setUnservicable] = useState({})
  const [topResTitle,setTopResTitle]=useState("")
  const [topOnlineResTitle,setTopOnlineResTitle]=useState("")
  const [dishes_data,setDishesData]=useState([])
  const [restaurant_chain_data,setRestaurantChainData]=useState([])
  const coord=useSelector((state) => state.coordinateSlice.place_coordinates)
  const filterVal=useSelector((state) => state.filterSlice.activeFilter)
  

  async function fetchData(){
      const data=await fetch(`${import.meta.env.VITE_SWIGGY_API}/restaurants/list/v5?lat=${coord.lat}&lng=${coord.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      const result=await data.json();
      setUnservicable(result?.data)
      let titleRes=result?.data?.cards.find((data)=>data?.card?.card?.id=="top_brands_for_you")?.card?.card?.header?.title
      let titleOnlineRes=result?.data?.cards.find((data)=>data?.card?.card?.id=="popular_restaurants_title")?.card?.card?.title
    setTopResTitle(titleRes || `Top restaurant chains in ${titleOnlineRes?.split(" ").at(-1) || "your area"}`)
      setTopOnlineResTitle(titleOnlineRes)
      let topDishData=result?.data?.cards.find((data)=>data?.card?.card?.id=="whats_on_your_mind")?.card?.card?.imageGridCards?.info
      setDishesData(topDishData || [])
      let topResData1=result?.data?.cards.find((data)=>data?.card?.card?.id=="top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants
      let topResData2=result?.data?.cards.find((data)=>data?.card?.card?.id=="restaurant_grid_listing_v2"||data?.card?.card?.id=="restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants
      setRestaurantChainData(topResData1 || topResData2 || []);
  }
        
  useEffect(()=>{
      fetchData()
  },[coord])

    return [unservicable,topResTitle,topOnlineResTitle,dishes_data,restaurant_chain_data,filterVal]
}

export default useRestaurantData