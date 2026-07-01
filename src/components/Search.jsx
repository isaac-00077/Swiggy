import React, { use, useEffect } from 'react'
import { useState } from 'react'
import data from '../api_data/search3.json'
import DishesSearch from './DishesSearch';
import RestaurantSearch, { withHoc } from './RestaurantSearch';
import { useSelector,useDispatch } from 'react-redux';
import { resetSimiliarResDish } from '../utils/toggleSlice';
import { SearchShimmer } from './Shimmer';
import { useRef } from 'react';


function Search() {

  const [searchQuery, setSearchQuery]=useState('');
  const filterOptions= [
    { filtername: "Restaurants" },
    { filtername: "Dishes" }
  ]
  
  const PromotedRes=withHoc(RestaurantSearch);
  const inputRef = useRef();
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similiarResDishes, setSimilarResDishes] = useState([]);
  const [activeBtn, setActiveBtn] = useState(filterOptions[1].filtername)
  const [searchDishes, setSearchDishes] = useState([])
  const [searchRestaurants, setSearchRestaurants] = useState([])
  const coordinates = useSelector((state) => state.coordinateSlice.place_coordinates);
  const dispatch = useDispatch();
  const {isSimiliarDish,city,resId,resLocation,itemId}=useSelector((state) => state.toggleSlice.toggleSimiliarDish)

  function handleFilterBtn(filtername){
    setActiveBtn(activeBtn === filtername ? activeBtn : filtername)       
  }

  let x=""
  function handleSearchQuery(e){
    let val=e.target.value    
    if(e.keyCode == 13){
        setSearchQuery(val)
        setSelectedResDish(null)
    }
  }

  function clearSearch(){
    inputRef.current.value = "";
    setSearchQuery("")
    setSelectedResDish(null)
  }

  function handleSearchBar(val){
    if(!val){
      setSearchQuery("")
      setSelectedResDish(null)
    }
  }
  
  useEffect(() => {
      if(isSimiliarDish){
        fetchSimilarResDishes()
    }
  },[isSimiliarDish])

  async function fetchSimilarResDishes(){
    let pathname = `/city/${city}/${resLocation}`
    let encodedPath = encodeURIComponent(pathname)
    // let data=await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/search/v3?lat=${coordinates.lat}&lng=${coordinates.lng}&str=${searchQuery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)
    // let result=await data.json();
    // console.log(data.data.cards[1].card.card.info);
    setSelectedResDish(data.data.cards[1])
    setSimilarResDishes(data.data.cards[2].card.card.cards)
    dispatch(resetSimiliarResDish())
    // console.log(data.data.cards[2].card.card.cards);    
  }

  async function fetchDishes(){
    let data=await fetch(`${import.meta.env.VITE_SWIGGY_API}/restaurants/search/v3?lat=${coordinates.lat}&lng=${coordinates.lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`)
    let result=await data.json();
    result?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards ?
    setSearchDishes((result?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
        (data)=>data?.card?.card?.info
    )) : setSearchDishes([])
  }

  async function fetchRestaurantData(){
    let data=await fetch(`${import.meta.env.VITE_SWIGGY_API}/restaurants/search/v3?lat=${coordinates.lat}&lng=${coordinates.lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`)
    let result=await data.json();
    result?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards ? setSearchRestaurants((result?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
        (data)=>data?.card?.card?.info
    )) : setSearchRestaurants([])                                                                   
  }

  useEffect(() => {
    if(searchQuery === ""){
      return
    }
    fetchDishes()
    fetchRestaurantData()
  },[searchQuery])

  return (
    <div className='w-[860px] mx-auto'>
        <div className='relative mt-10'>
          <input onKeyDown={handleSearchQuery} onChange={(e) => handleSearchBar(e.target.value)} ref={inputRef} type="text"  placeholder='Search for restaurants and food' className='w-full border-[#e5e7eb] border-2 px-6 py-3  focus:outline-none' />
          {searchQuery ? <i onClick={clearSearch} className="fa-solid fa-x absolute top-3 text-[#535766] right-4 text-lg"></i>:
          <i onClick={handleSearchQuery} className="fa-solid fa-magnifying-glass absolute top-3 text-[#535766] right-4 text-lg"></i>}
        </div>
        <div className='mt-1 flex flex-wrap '> 
          { !selectedResDish &&
            filterOptions.map(({filtername}) => (
              <button key={filtername} onClick={()=>handleFilterBtn(filtername)} className={`pb-1 px-4 py-1 text-sm font-medium flex items-center gap-1 justify-center ${activeBtn === filtername ? "text-black border-b-4 rounded-b-sm  border-[#ff5200]":"text-[#676a6d]"}`}>{
                filtername}
                </button>
            ))
          }
        </div> 
          <div className='w-[860px] bg-[#f4f5f7] grid grid-cols-2 px-[8px]'>
            { selectedResDish
              ? <>
                  <div>
                    <p className='pl-3 mt-4'>Item added to Cart</p>
                    <DishesSearch data={selectedResDish.card.card} />
                    <p className='pl-3 text-gray-500'>More dishes from this restaurant</p>
                  </div>
                  <br />
                  {
                    similiarResDishes.map((data, index)=>{
                      return <DishesSearch key={data?.card?.card?.info?.id ?? index} data={{...data.card,restaurant: selectedResDish.card.card.restaurant}} />
                    })
                  }
                </>
              :  activeBtn === "Dishes" ? (
                  searchDishes.length ?
                    (searchDishes.map((data)=>(
                        <div className='pt-2' key={data?.card?.card?.info?.id ?? data?.card?.card?.info?.name}>
                          <DishesSearch data={data.card.card} />
                        </div>
                    ))):searchQuery?<SearchShimmer />:""

                ):(
                    searchRestaurants.length ?
                      (searchRestaurants.map((data)=>(
                        data?.card?.card?.info?.promoted ? 
                        <PromotedRes key={data?.card?.card?.info?.id ?? data?.card?.card?.info?.name} data={data} />:
                        <div className='pt-2' key={data?.card?.card?.info?.id ?? data?.card?.card?.info?.name}>
                            <RestaurantSearch data={data} />
                        </div>
                          )
                      )):searchQuery?<SearchShimmer />:""
                )
            }
        </div>
    </div>
  )
}

export default Search