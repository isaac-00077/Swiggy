import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import places_data from '../api_data/search1.json'
import latlngData from '../api_data/search2.json'
import { searchBarToggle } from '../utils/toggleSlice'
import { useSelector,useDispatch } from 'react-redux'
import { setCoordinates } from '../utils/coordinateSlice'
import { loginToggle } from '../utils/toggleSlice'
import SignInBtn from './SignInBtn'

function Head() {
  const MAX_LENGTH = 35; 
  const navItems=[
    {
        name:"Swiggy Corporate",
        icon:"fa-solid fa-briefcase",
    },
    {
        name:"Search",
        icon:"fa-solid fa-magnifying-glass",
        path:"/search"
    },
    {
        name:"Offers",
        icon:"fa-solid fa-percent",
    },
    {
        name:"Help",
        icon:"fa-regular fa-life-ring",
    },
    {
        name:"Sign In",
        icon:"fa-regular fa-user",
        path:"/signin"
    },
    {
        name:"Cart",
        icon:"fa-solid fa-cart-shopping",
        path:"/cart"
    }
  ]
  
  const toggleLogin=useSelector((state) => state.toggleSlice.toggleLogin)
  const userData=useSelector((state) => state.authSlice.userData)
  const cartData=useSelector((state) => state.cartSlice.cartItems)
  const visible=useSelector((state) => state.toggleSlice.toggleSearchBar)
  const dispatch = useDispatch()
  const [searchResult, setSearchResult] = useState(places_data.data.filter((place) => place?.description?.toLowerCase().startsWith("mumbai")));
  const [address, setAddress] = useState("Mumbai, Maharashtra, India");

  function handleVisibilty(){
    dispatch(searchBarToggle())
  }
  function handleLogin(){
    dispatch(loginToggle())
  }

  async function searchResultFun(value) {
    // const res= await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=mumbai`)  
    // const data= await res.json()
    if (!value.trim()) {        
        return;
    }

    const filteredPlaces = places_data.data.filter((place) =>
        place?.description
        ?.toLowerCase()
        .startsWith(value.toLowerCase())
    );
    setSearchResult(filteredPlaces);
  }

  async function fetchLatandLng(placeId){
    // const res= await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`)  
    // const data= await res.json() 
        const place = latlngData.data.find(
        (item) => item.place_id === placeId
    );

    handleVisibilty()

    setAddress(place?.formatted_address)
    dispatch(setCoordinates({ lat: place.geometry.location.lat, lng: place.geometry.location.lng }))
  }

  return (
    <div className='relative w-full pt-[5.5rem]'>
        <div className='w-full'> 
            <div className={`fixed inset-0 bg-black/50 z-50 ${visible ? 'visible':'invisible'}`} onClick={handleVisibilty}></div>
            <div className={` flex justify-end bg-white lsm:w-[55%] 2xl:w-[43%] xl:w-[50%] xxxl:w-[37%] w-full h-screen fixed top-0 z-[60] duration-500 ${visible ? 'left-0':'-left-[100%]'}`}>
                <div className='flex flex-col gap-4 mt-7 xxxl:w-[50%] lg:w-[60%] 2xl:w-[60%] w-full md:mr-12 ml-6'>
                    <i className="fa-solid fa-xmark text-lg" onClick={handleVisibilty}></i>
                    <input type="text" className='border p-5 focus:outline-none focus:shadow-lg' onChange={(e) => searchResultFun(e.target.value)} />
                    <div className='border p-5'>
                        <ul>
                            {searchResult.length > 0 ? (
                                searchResult.map((data, i) => (
                                    <div className='my-5' key={data.place_id ?? i}>
                                        <div className='flex gap-4'>
                                            <i className="fa-solid fa-location-dot mt-1"></i>
                                            <li onClick={() => fetchLatandLng(data.place_id)}>
                                                {data?.terms?.[0]?.value}
                                                <p className="text-sm opacity-60">{data?.terms?.slice(1).map(term => term.value).join(", ")}</p>
                                                {i < searchResult.length - 1 && <p className='opacity-35'>----------------------------------</p>}
                                            </li>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <li>No results found</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full'> 
            <div className={`fixed inset-0 bg-black/50 z-50 ${toggleLogin ? 'visible':'invisible'}`} onClick={handleLogin}></div>
            <div className={` flex  bg-white xxxxl:w-[34%] xsm:w-[80%] sm:w-[60%] lsm:w-[55%] lg:w-[45%] xxl:w-[40%] w-full h-screen fixed top-0 z-[60] duration-500 ${toggleLogin ? 'right-0':'-right-[100%]'}`}>
                <div className='mt-6 md:ml-9 xxxxl:w-[46%] w-full ml-6 xl:w-[85%] 2xl:w-[80%'> 
                    <i className="fa-solid fa-xmark text-xl text-gray-500" onClick={handleLogin}></i>
                    <div className='flex xxxxl:justify-between w-full items-center ml-2 gap-44'>
                        <div>
                            <h2 className='text-3xl'>{userData ? `Welcome, ${userData.name.split(' ')[0]}` : 'Login'}</h2>
                            <div className='w-7 h-[2px] bg-black mt-3'></div>
                        </div>
                        <img className='max-w-[100px] max-h-[105px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                    </div>
                    <SignInBtn />
                    {!userData && (
                        <p className='text-[12px] text-gray-500 mt-2 ml-2'>
                            By clicking on Login, I accept the <span className='text-gray-950'>Terms & Conditions & Privacy Policy</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
        <div className='w-full shadow-md h-[5.5rem] flex items-center justify-center fixed top-0 left-0 z-40 bg-white'>
            <div className='w-[70%] flex justify-between font-gilroy'>
                <div className='flex items-center xsm:gap-10 gap-4'> 
                    <Link to="/">
                        <img className='size-12' src="https://avatars.githubusercontent.com/u/36199082?s=200&v=4" alt="" />
                    </Link>
                    <div className='flex items-center gap-4' onClick={handleVisibilty}>
                        <p>
                            <span className='text-[0.92rem] font-gilroy font-bold border-b-[2px] border-black md:inline hidden'>Other</span>
                            <span className='text-xs ml-2 opacity-50 hidden lg:inline'>{address.length > MAX_LENGTH ? address.slice(0, MAX_LENGTH - 3) + "..." : address}</span>
                            <span className='text-xs ml-2 opacity-50 lg:hidden'>{address.split(',')[0]}</span>
                        </p>
                        <i className="fa-solid fa-angle-down text-[1rem] text-orange-500 -ml-2 mt-1"></i>
                    </div>
                </div>
                <div className=''>
                    <div className='xxl:flex items-center gap-14 hidden mt-3'>
                        {navItems.map((item, index) => (
                            item.name === "Sign In" ?
                            <div className='cursor-pointer' onClick={handleLogin} key={index}>
                                <div className='flex items-center gap-2'>
                                    {userData ? (
                                        <img className='size-6 rounded-full' src={userData.photo} alt={userData.name} />
                                    ) : (
                                        <i className={`${item.icon} text-gray-700`}></i>
                                    )}
                                    <p className='text-[1rem] text-gray-700'>{userData ? userData.name.split(' ')[0] : item.name}</p>
                                    {item.name === "Cart"  && cartData.length > 0 && (
                                        <span className='text-black  px-2 py-1 text-xs rounded-full bg-orange-400 font-bold'>
                                            {cartData.length}
                                        </span>
                                    )}
                                </div>
                            </div>:
                            <Link to={item.path} key={index}>
                                <div className='flex items-center gap-2'>
                                    <i className={`${item.icon} text-gray-700`}></i>
                                    <p className='text-[1rem] text-gray-700'>{item.name}</p>
                                    {item.name === "Cart"  && cartData.length > 0 && (
                                        <span className='text-black  px-2 py-1 text-xs rounded-full bg-orange-400 font-bold'>
                                            {cartData.length}
                                        </span>
                                    )}
                                </div>
                            </Link>
                            
                        ))}
                    </div>
                    <div className='flex items-center justify-center gap-4 lg:gap-14 xl:gap-24 mt-4 xxl:hidden'>
                        {navItems.map((item, index) => (
                            item.name === "Sign In" ?
                            <div className='cursor-pointer' onClick={handleLogin} key={index}>
                                <div className='flex items-center gap-2'>
                                    {userData ? (
                                        <img className='size-6 rounded-full' src={userData.photo} alt={userData.name} />
                                    ) : (
                                        <i className={`${item.icon} text-gray-700`}></i>
                                    )}
                                    <p className='text-[1rem] text-gray-700 hidden sm:inline'>{userData ? userData.name.split(' ')[0] : item.name}</p>
                                </div>
                            </div>:
                            item.name === "Search" ?
                            <Link to={item.path} key={index}>
                                <div className='flex items-center gap-2'>
                                    <i className={`${item.icon} text-gray-700`}></i>
                                    <p className='text-[1rem] text-gray-700 hidden sm:inline'>{item.name}</p>
                                </div>
                            </Link>:
                            item.name === "Cart" ?
                            <Link to={item.path} key={index}>
                                <div className='flex items-center gap-2'>
                                    <i className={`${item.icon} text-gray-700`}></i>
                                    <p className='text-[1rem] text-gray-700 hidden sm:inline'>{item.name}</p>
                                    {item.name === "Cart"  && cartData.length > 0 && (
                                        <span className='text-black  px-2 py-1 text-xs rounded-full bg-orange-400 font-bold'>
                                            {cartData.length}
                                        </span>
                                    )}
                                </div>
                            </Link>:""
                    ))}
                    </div>
                </div>
            </div>
        </div>
        <Outlet />
        <div className={`fixed bottom-0 left-1/2 z-40 w-[90%] sm:w-[85%] lg:w-[65%] xl:w-[57%] 2xl:w-[47%] xxxl:w-[39%] -translate-x-1/2 bg-[#1ba672] text-white shadow-[0_-6px_18px_rgba(0,0,0,0.12)] transition-all duration-300 ${cartData.length ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
            <div className='flex w-full items-center justify-between px-4 py-3'>
                <div className='flex items-center gap-2 font-semibold'>
                    <span className='text-sm'>{cartData.length} item{cartData.length > 1 ? "s" : ""} added</span>
                </div>
                <Link to="/cart" className='flex items-center gap-1 text-sm font-semibold'>
                    <span className='text-[15px]'>VIEW CART</span>
                    <i className="fa-solid fa-bag-shopping"></i>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Head