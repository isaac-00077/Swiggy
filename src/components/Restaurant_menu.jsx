import { act, use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from '../api_data/data.json'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addToCart,clearCart } from '../utils/cartSlice'
import AddToCartBtn from './AddToCartBtn'
import { cardToggle } from '../utils/toggleSlice'
import DetailCardItem from './DetailCardItem'
import { MenuShimmer } from './Shimmer'

function Restaurant_menu() {
  const { id } = useParams()
  let mainId=id.split("-").at(-1).split("rest")[1]
  let card_count=0
  let tp_data=[{creativeId:"TopPicks/Cmb1Veg",price:"359"},{creativeId:"TopPicks/CknPotRic",price:"455"},{creativeId:"TopPicks/PnrPotRic",price:"425"}]
  
  const [resInfo, setResInfo]=useState({})
  const [menuData, setMenuData]=useState([])
  const [discountData, setDiscountData]=useState([])
  const [topPicksData, setTopPicksData]=useState([])
  const [value_offers,setValueOffers]=useState(0)
  const [value_picks,setValuePicks]=useState(0)
  const [isDiffRes, setIsDiffRes]=useState(false)
  const [isItemAlreadyAdded, setIsItemAlreadyAdded]=useState(false)
  const dispatch = useDispatch()
  const cartData=useSelector((state) => state.cartSlice.cartItems)
  const coord=useSelector((state) => state.coordinateSlice.place_coordinates)
  // const [currIndex,setCurrIndex]=useState(null)


  function handlePrevOffers(){
    value_offers > 0 ? setValueOffers((prev)=>prev-40) : ""
  }

  function handleNextOffers(){
    value_offers < 120 ? setValueOffers((prev)=>prev+40) : ""
  }
  function handlePrevPicks(){
    value_picks > 0 ? setValuePicks((prev)=>prev-50) : ""
  }
  function handleNextPicks(){
   value_picks < 50 ? setValuePicks((prev)=>prev+50) : ""
  }
  

  async function fetchMenu() {
    try {
      // const response = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coord.lat}&lng=${coord.lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`)
      // const data = await response.json();
      let infoRes=data?.data?.cards.find((data)=>data?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info
      setResInfo(infoRes);
      let actual_menu=data?.data?.cards.find((data)=>data?.groupedCard)
      setMenuData(actual_menu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((data)=>data?.card?.card?.itemCards || data?.card?.card?.categories))
      let dataDiscount=data?.data?.cards.find((data)=>data?.card?.card?.id=="offerCollectionWidget_UX4")?.card?.card?.gridElements?.infoWithStyle?.offers
      setDiscountData(dataDiscount || []);
      setTopPicksData(tp_data)
       
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMenu()  
  }, [])

  // function toggleFunction(i){
  //   i===currIndex ? setCurrIndex(null) :  setCurrIndex(i);
  // }
  menuData.map(({card:{card:{itemCards}}})=>(
    card_count++
  ))
  return (
    <div className='w-full font-gilroy'>
      {
        menuData.length ? (
          <div className="w-[800px] mx-auto">
            <p className='lmd:w-full w-[90%] mx-auto mt-5 text-[10px]  text-[#9b9c9f]'><Link to="/"><span className='hover:text-black hover:cursor-pointer'>Home / </span></Link><Link to="/"><span className='hover:text-black hover:cursor-pointer'>{resInfo?.city}</span></Link> / <span className='text-black'>{resInfo?.name}</span></p>
            <h1 className='font-extrabold font-gilroy pt-6 pl-2 text-3xl lmd:w-full w-[90%] mx-auto'>{resInfo?.name}</h1>
            <div className='lmd:w-full w-[90%] mx-auto h-[173px]  mt-3 p-[1rem]  rounded-[2.4rem] bg-gradient-to-t from-[#dddde4]'>
              <div className='w-full border p-5 border-[#dddde4] rounded-[1.5rem] h-full bg-white'>
                <div className="flex text-[16px] items-center gap-1 mt-[-0.2rem]"><span><svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#1e933c"><path d="m320-240 160-122 160 122-60-198 160-114H544l-64-208-64 208H220l160 114-60 198ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></span><span className='ml-[-0.1rem]'>{resInfo?.avgRating}</span><span>({resInfo?.totalRatingsString})</span><div className='ml-1 mr-1 w-[0.24rem] h-[0.28rem] rounded-full flex items-center justify-center bg-slate-400'></div><span>{resInfo?.costForTwoMessage}</span></div>
                <p className='pt-2 pl-1 font-bold underline text-[14px] text-[#ff5200] cursor-pointer'>{resInfo?.cuisines?.join(", ")}</p>
                <div className='flex gap-3'>
                  <div className='flex flex-col justify-center items-center pl-1 w-[9px]'>
                    <div className='w-[7px] h-[7px] bg-[#c4c4c4] rounded-full'></div>
                    <div className='w-[1px] h-[25px] bg-[#c4c4c4]'></div>
                    <div className='w-[7px] h-[7px] bg-[#c4c4c4] rounded-full'></div>
                  </div>
                  <div className='text-[14px] gap-[9px] flex flex-col'>
                    <span className='flex gap-3'>Outlet<span className='text-[#02060C99]'>{resInfo?.locality}</span></span>
                    <p>{resInfo?.sla?.slaString}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='overflow-hidden lmd:w-full w-[90%] mx-auto'>
              <div className='flex justify-between mt-7 mx-4'>
                  <h1 className='text-[21px] font-extrabold'> Deals for you</h1>
                  <div className='flex gap-2'>
                    <div onClick={handlePrevOffers} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (value_offers<=0 ? "bg-gray-100":"bg-gray-200")}>
                      <i className={`text-[0.9rem] fa-solid fa-arrow-left `+ (value_offers<=0 ? "text-gray-300" : "text-gray-800")}></i>
                    </div>
                    <div onClick={handleNextOffers} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (value_offers>=120 ? "bg-gray-100":"bg-gray-200")}>
                      <i className={`text-[0.9rem] fa-solid fa-arrow-right `+ (value_offers>=120 ? "text-gray-300" : "text-gray-800")}></i>
                    </div>
                  </div>
              </div>
              <div className={`flex gap-4 mx-4 mt-3  duration-200`} style={{ translate: `-${value_offers}%` }} >
                {
                  discountData.map((data, index) => (
                    <Discount key={data?.info?.offerIds?.[0] ?? data?.offerIds?.[0] ?? index} data={data}/>
                  ))
                }
              </div>
            </div>
            <div className='w-full mt-8 flex justify-center items-center gap-1'>
              <svg width="40" height="12" viewBox="0 0 60 16" fill="none">
                <path d="M58 8H38" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="34" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M32 8C29 8 28 4 25 4C22 4 21 6 21 8C21 10 20 12 17 12C15 12 14 11 13 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <h1 className='text-[14px] tracking-[4px] text-[#02060C99]'>MENU</h1>
              <svg width="40" height="12" viewBox="0 0 60 16" fill="none">
                <path d="M2 8H22" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="26" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M28 8C31 8 32 4 35 4C38 4 39 6 39 8C39 10 40 12 43 12C45 12 46 11 47 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className='h-[48px] bg-[#02060C1A] m-2 flex items-center justify-center relative rounded-xl cursor-pointer  lmd:w-full w-[90%] mx-auto'>
              <div className='text-[rgba(2,6,12,0.6)] p-3'>Search for dishes</div>
              <i className="text-[rgba(2,6,12,0.6)] fa-solid fa-magnifying-glass text-gray-700 absolute top-[1rem] right-3"></i>
            </div>
            <div className='lmd:w-full overflow-hidden w-[90%] mx-auto'>
              <div className='flex justify-between mt-7 mx-4'>
                  <h1 className='text-[21px] font-extrabold'>Top Picks</h1>
                  <div className='flex gap-2'>
                    <div onClick={handlePrevPicks} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (value_picks<=0 ? "bg-gray-100":"bg-gray-200")}>
                      <i className={`text-[0.9rem] fa-solid fa-arrow-left `+ (value_picks<=0 ? "text-gray-300" : "text-gray-800")}></i>
                    </div>
                    <div onClick={handleNextPicks} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (value_picks>=50 ? "bg-gray-100":"bg-gray-200")}>
                      <i className={`text-[0.9rem] fa-solid fa-arrow-right `+ (value_picks>=50 ? "text-gray-300" : "text-gray-800")}></i>
                    </div>
                  </div>
              </div>
              <div className={`flex gap-5 lmd:mx-3 mt-3  duration-200`} style={{ translate: `-${value_picks}%` }} >
                {
                  tp_data.map(({creativeId,price}, index) => (
                    <div className='lmd:min-w-[376px] min-w-[350px] h-[386px] relative' key={creativeId ?? index}>
                      <img className='w-full h-full object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${creativeId}`} alt="" />
                      <div className='flex absolute bottom-6 items-center justify-between w-full px-5'>
                        <p className='text-[16px] text-white'>₹{price}</p>
                        <button className='bg-white border py-2 px-10 drop-shadow rounded-[0.55rem] text-[#1ba672]'>ADD</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <hr className='my-9 -mb-2 border-[8px] border-[#f2f2f3 ] lmd:w-full w-[90%] mx-auto'/> 
            <div className='w-[90%] mx-auto lmd:w-full'>
              {
                  menuData.map(({card:{card}},card_index)=>(
                    <Menu_Card key={card?.title ?? card?.itemCards?.[0]?.card?.info?.id ?? card_index} card={card} text_size="[18px]" card_index={card_index+1} cards_length={card_count} resInfo={resInfo}/>
                  ))
              }
            </div>
            <div className='mt-12 w-[90%] mx-auto overflow-hidden border-t border-[#d8dbe0] bg-[#f3f4f6] px-4 py-6 text-[#2d3148] lmd:w-full'>
              <div className='rounded-2xl bg-[#f3f4f6]'>
                <div className='flex items-center gap-3 border-b border-[#d8dbe0] pb-3 text-sm text-[#7a808a]'>
                  <img
                    className='h-7 w-auto object-contain opacity-80'
                    src='https://media-assets.swiggy.com/swiggy/image/upload/fssai_final_edss9i'
                    alt='FSSAI'
                  />
                  <span>License No. 11523002000023</span>
                </div>

                <div className='border-b border-[#d8dbe0] py-4'>
                  <h3 className='text-[15px] font-semibold text-[#3a3f4a]'>{resInfo?.name}</h3>
                  <p className='mt-1 text-[14px] text-[#59616f]'>Outlet: {resInfo?.areaName}</p>
                  <p className='mt-1 text-[14px] leading-6 text-[#59616f]'>{'Round Building, Bellagio Tower Shop no.3,6,7,8,9,14 Ground, Saat Rasta Circle, Mahalakshmi, Mumbai, Maharashtra 400034'}</p>
                </div>

                <div className='py-6 text-center'>
                  <p className='text-[15px] font-bold text-[#2d3148]'>For better experience, download the Swiggy app now</p>
                  <div className='mt-4 flex flex-wrap items-center justify-center gap-4'>
                    <a href='https://play.google.com/store/apps/details?id=in.swiggy.android' target='_blank' rel='noreferrer'>
                      <img className='h-[3.25rem] w-auto' src='/get-it-on-google-play-badge-seeklogo.png' alt='Get it on Google Play' />
                    </a>
                    <a href='https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920' target='_blank' rel='noreferrer'>
                      <img className='h-[3.25rem] w-auto' src='/download-on-the-app-store-seeklogo.png' alt='Download on the App Store' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ):(<MenuShimmer/>)
      }
     
    </div>
  )
}

function Menu_Card({card, text_size ,card_index,cards_length,resInfo}){
  

  let card_open=false
  if(card["@type"]){
    card_open=true
  }

  const [isOpen, setIsOpen]=useState(card_open)

  function toggleDropdown(){
    setIsOpen((prev)=>!prev)
  }
  
  if(card?.itemCards){
    const {title,itemCards}=card
    return (
      <>
        <div className='mt-7 ml-2'> 
          <div className='flex justify-between mb-6'>
            <h1 className={`text-${text_size} `}>{title} ({itemCards.length})</h1>
            <i className={`fa-solid fa-angle-${isOpen ? "up" : "down"} text-[1.1rem] mr-5`} onClick={()=> toggleDropdown()}></i> 
          </div>
          {isOpen && <Detail_Menu itemCards={itemCards} resInfo={resInfo}/>} 
        </div>
        {text_size === "[18px]" && card_index < cards_length ? <hr className='my-5 border-[8px] border-[#f2f2f3]'/> : text_size === "[16px]" && card_index < cards_length ? <hr className='my-5 mx-2 border-[#d3d3d3]'/> : ""}
      </>
    )
  }
  else{
    const {title,categories}=card
    return(
      <>
        <div  className='mt-7'>
          <h1 className="text-[18px] mx-2">{title}</h1>
          {
            categories.map((data,card_index)=>(
              <Menu_Card key={data?.title ?? data?.card?.title ?? card_index} card={data} text_size="[16px]" card_index={card_index+1} cards_length={categories.length} resInfo={resInfo} />
            ))
          }
        </div>
        <hr className='my-5 border-[8px] border-[#f2f2f3]'/>
      </>
    )
  }
}

function Detail_Menu({itemCards, resInfo}){
  let card_count=0
  return (
    <div>
      {
        itemCards.map(({card:{info}}, index)=>{
          card_count++
          return <DetailMenuCard key={info?.id ?? info?.name ?? index} info={info} itemCards={itemCards} card_count={card_count} resInfo={resInfo} />
        })
      }
    </div>
  )
}

function DetailMenuCard({info, itemCards, card_count, resInfo}){
  const {name,price,defaultPrice,itemAttribute,ratings:{aggregatedRating},description,imageId}=info
  const dispatch = useDispatch()
  const [showDetailCard, setShowDetailCard] = useState(false)
  // const cartData=useSelector((state) => state.cartSlice.cartItems)
  // const getResInfoFromLocalStore=useSelector((state) => state.cartSlice.resInfo)
  // const dispatch = useDispatch()

  // function handleAddToCart(){
  //   const isAdded=cartData.find((data)=>data.id===info.id)  
  //   if(!isAdded){
  //     if(getResInfoFromLocalStore.name==resInfo.name || getResInfoFromLocalStore.length===0){
  //       dispatch(addToCart({info,resInfo}))       
  //     }
  //     else{
  //       openDiffResModal()
  //     }
  //   }
  //   else{
  //     openAlreadyAddedModal()
  //   }
  // }

  const [isMore, setIsMore]=useState(false)

  let veg="https://i.pinimg.com/564x/61/12/6d/61126d135fe2433d3c744dddc3b0343d.jpg"
  let nonveg="https://i.pinimg.com/474x/14/0b/0e/140b0e8a911d1734c496155aa97a56a8.jpg"
  let trimDes=description?.slice(0,120)

  return (
    <>
      <div className='relative'>
        <div className='flex w-full justify-between min-h-[182px]'>
          <div className='w-[70%] mt-2'>
            {
              itemAttribute && itemAttribute?.vegClassifier === "VEG" ? <img className='size-4' src={veg} alt="" /> : <img className='size-4' src={nonveg} alt="" />
            }
            <h2 className='text-[18px]'>{name}</h2>
            <p>₹{defaultPrice /100 || price /100}</p>
            <div className='flex items-center gap-1 text-[13px] mt-1'>{aggregatedRating?.rating ? <><i className="text-[#116649] text-[10px] fa-solid fa-star"></i><span>{aggregatedRating?.rating} ({aggregatedRating?.ratingCountV2})</span></> : ""}</div>
            <p className="text-[#6f7175] font-thin leading-5 mt-2">
              {isMore ? description : trimDes}                  
              {description?.length > 120 && (
                <span className="font-semibold text-[#4b5054]" onClick={()=>setIsMore(!isMore)}>{isMore ? "" : "... more"}</span>
              )}
            </p>
          </div>
          <div className='w-[22%] relative h-full mt-2 '>
            <img onClick={() => { setShowDetailCard(true); dispatch(cardToggle(true)); }} className="object-cover rounded-xl w-[156px] h-[144px] flex float-end" src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt="" />
            {/* <button onClick={handleAddToCart} className='bg-white border py-2 px-10 drop-shadow rounded-[0.55rem] text-[#1ba672] absolute left-[1.25rem] lmd:left-[2.45rem] top-[7.5rem]'>ADD</button> */}
            <AddToCartBtn info={info} resInfo={resInfo} from={"menu"}/>
            {console.log("info_menu:", info)}
            {console.log("resInfo_menu:", resInfo)}
            <p className='text-[#a9aaac] text-[13px] pt-[10.2rem] pl-8 lmd:pl-14'>Customisable</p>
          </div>
        </div>
        {card_count < itemCards.length && <hr className='my-4'/>}
      </div>
      {showDetailCard && <DetailCardItem setShowDetailCard={setShowDetailCard} info={info} resInfo={resInfo} indicator={"Restaurant_menu"} />}
    </>
  )  
}

function Discount({ data :{info:{header,couponCode,offerLogo}}}){
  return(
    <div className='flex min-w-[328px] h-[76px] border p-3 rounded-3xl gap-3'>
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`} alt="" />
      <div>
        <h2 className='text-[18px] font-gilroy'>{header}</h2>
        <p className='text-[14px] text-[#02060C73] font-gilroy'>{couponCode}</p>
      </div>
    </div>    
  )
}

export default Restaurant_menu
