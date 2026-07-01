import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, deleteFromCart } from '../utils/cartSlice'
import { loginToggle } from '../utils/toggleSlice'
import toast from 'react-hot-toast'

function Cart() {
  const userData = useSelector((state) => state.authSlice.userData)
  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const resInfo = useSelector((state) => state.cartSlice.resInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMore, setIsMore] = useState({})
  

  if (cartData.length === 0) {
    return (
      <div className='w-full py-28'>
        <div className='mx-auto flex flex-col items-center gap-5 justify-center w-[50%]'>
          <img className='w-[271px] h-[256px] object-cover' src="https://media-assets.swiggy.com/swiggy/image/upload/2xempty_cart_yfxml0" alt="" />
          <h1 className='text-xl text-center'>Your cart is empty</h1>
          <p className='text-sm text-gray-500 text-center'>You can go to home page to view more restaurants</p>
          <Link to="/"><button className='bg-[#ff5200] text-white py-2 px-4'>SEE RESTAURANTS NEAR YOU</button></Link>
        </div>
      </div>
    )
  }


  function handleRemoveFromCart(index) {
    if (cartData.length > 1) {
      const updatedCart = [...cartData]
      updatedCart.splice(index, 1)
      dispatch(deleteFromCart(updatedCart))    
    } else {
      handleClearCart()
    }
  }

  function handleClearCart() {
    dispatch(clearCart())
  }

  function handlePlaceOrder() {
    if (!userData) {
      const toastId = 'cart-signin-toast'
      toast.remove(toastId)
      toast.custom(
        (t) => (
          <div
              className={`pointer-events-auto flex w-[20vw] max-w-lg items-start gap-4 rounded-2xl border border-amber-600/70 bg-[linear-gradient(180deg,#ffffff_0%,#fff7ea_100%)] px-4 py-4 ${
                t.visible ? 'toast-drop-in' : 'toast-drop-out'
            }`}
            style={{
              boxShadow: 'none',
              transformOrigin: 'top center',
              marginTop: 0,
            }}
          >
            <div className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fed7aa] text-[#c2410c] ring-1 ring-amber-200'>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>

            <div className='min-w-0 flex-1'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-900'>Secure checkout</p>
              <p className='mt-1 text-sm font-semibold text-slate-950'>Please sign in to place your order.</p>
              <p className='mt-1 text-sm leading-5 text-slate-600'>Continue after signing in to complete checkout</p>
            </div>
          </div>
        ),
        { id: toastId, duration: 1500 }
      )
      dispatch(loginToggle())
      return
    }

    const toastId = 'cart-order-toast'
    toast.remove(toastId)
    toast.custom(
      (t) => (
        <div
            className={`pointer-events-auto flex w-[92vw] max-w-lg items-start gap-4 rounded-2xl border border-emerald-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f3fff6_100%)] px-4 py-4 ${
              t.visible ? 'toast-drop-in' : 'toast-drop-out'
          }`}
          style={{
            boxShadow: 'none',
            transformOrigin: 'top center',
            marginTop: 0,
          }}
        >
          <div className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#15803d] ring-1 ring-emerald-200'>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M20 7L10.5 16.5L4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className='min-w-0 flex-1'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700'>Order confirmed</p>
            <p className='mt-1 text-sm font-semibold text-slate-950'>Your order has been placed successfully.</p>
            <p className='mt-1 text-sm leading-5 text-slate-600'>We will start preparing it shortly.</p>
          </div>
        </div>
      ),
      { id: toastId, duration: 1500 }
    )
    dispatch(clearCart())
    navigate('/')
  }
  let veg="https://i.pinimg.com/564x/61/12/6d/61126d135fe2433d3c744dddc3b0343d.jpg"
  let nonveg="https://i.pinimg.com/474x/14/0b/0e/140b0e8a911d1734c496155aa97a56a8.jpg"

  return (
    <div className='w-full'>
      <div className='w-[95%] lsm:w-[95%] lmd:w-[75%] xl:w-[55%] xxl:w-[40%] mx-auto mt-6'>
        {cartData.length > 0 && (
          <div className='mb-6 flex gap-6'> 
            <div className='flex flex-col gap-5'>
              <img className='size-52 rounded-3xl mt-3' src={resInfo?.cloudinaryImageId ? `https://media-assets.swiggy.com/swiggy/image/upload/${resInfo.cloudinaryImageId}` : ""} alt="" />
              <div className="w-[40%] h-[3px] bg-black"></div>
            </div>
            <div className='flex flex-col justify-start leading-tight'>
            <h1 className='text-[60px] font-semibold'>{resInfo?.name}</h1>
            <p className='text-[24px] text-[#6f7175]'>{resInfo?.areaName}</p>
            <div className="flex items-center gap-1 mt-2"><span><svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#1e933c"><path d="m320-240 160-122 160 122-60-198 160-114H544l-64-208-64 208H220l160 114-60 198ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></span><span className='ml-[-0.1rem]'>{resInfo?.avgRating}</span><div className='w-[0.28rem] h-[0.28rem] rounded-full flex items-center justify-center bg-black'></div><span>{resInfo?.sla?.slaString}</span></div>
          </div>
          </div>)}
          {cartData.map(({id,name,price,defaultPrice,itemAttribute,ratings:{aggregatedRating}={},description,imageId}, i) => (
            <div className='relative' key={id ?? i}>
                <div className='flex w-full justify-between min-h-[182px] '>
                  <div className='w-[70%] mt-2'>
                    {
                        itemAttribute && itemAttribute?.vegClassifier === "VEG" ? <img className='size-4' src={veg} alt="" /> : <img className='size-4' src={nonveg} alt="" />
                    }
                    <h2 className='text-[18px]'>{name}</h2>
                    <p>₹{defaultPrice /100 || price /100}</p>
                    <div className='flex items-center gap-1 text-[13px] mt-1'>{aggregatedRating?.rating ? <><i className="text-[#116649] text-[10px] fa-solid fa-star"></i><span>{aggregatedRating?.rating} ({aggregatedRating?.ratingCountV2})</span></> : ""}</div>
                    <p className="text-[#6f7175] font-thin leading-5 mt-2">
                        {isMore[id] ? description : description?.slice(0,120)}                  
                        {description?.length > 120 && (
                        <span className="font-semibold text-[#4b5054]" onClick={()=>setIsMore(prev => ({...prev,[id]: !prev[id]}))}>{isMore[id] ? "" : "... more"}</span>
                        )}
                    </p>
                  </div>
                  <div className='w-[22%] relative h-full mt-2'>
                    <img  className="object-cover rounded-xl w-[156px] h-[144px] flex float-end" src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt="" />
                    <button onClick={() => handleRemoveFromCart(i)} className='bg-white border py-2 sm:px-5 sm:right-6 xsm:right-6 px-2 right-1  md:px-10 drop-shadow rounded-[0.55rem] text-[#1ba672] absolute md:right-[7px] top-[7.5rem]'>Remove</button>
                  </div>
                </div>
                <hr className='my-4'/>
              </div>
            ))}

        <h1>Total: ₹{cartData.reduce((acc, item) => acc + (item.defaultPrice || item.price), 0) / 100}</h1>
        <div className='flex justify-between mt-2 mb-8'>
          <button onClick={handlePlaceOrder} className='bg-orange-500 text-white py-2 px-4 rounded-md'>
            Place Order
          </button>
          <button onClick={handleClearCart} className='bg-orange-500 text-white py-2 px-4 rounded-md'>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
