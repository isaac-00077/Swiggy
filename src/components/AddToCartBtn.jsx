import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addToCart,clearCart } from '../utils/cartSlice'

function AddToCartBtn({ info, resInfo }) {
  const [isDiffRes, setIsDiffRes]=useState(false)
  const [isItemAlreadyAdded, setIsItemAlreadyAdded]=useState(false)
  const cartData=useSelector((state) => state.cartSlice.cartItems)
  const getResInfoFromLocalStore=useSelector((state) => state.cartSlice.resInfo)
  const dispatch=useDispatch()

  function handleAddToCart(){
      const isAdded=cartData.find((data)=>data.id===info.id)  
      if(!isAdded){
        if(getResInfoFromLocalStore.name==resInfo.name || getResInfoFromLocalStore.length===0){
          dispatch(addToCart({info,resInfo}))       
        }
        else{
          setIsDiffRes(true)
        }
      }
      else{
        setIsItemAlreadyAdded(true)
      }
    }


  return (
    <>
      <div
        onClick={()=>setIsItemAlreadyAdded(false)}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isItemAlreadyAdded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
        <div
          onClick={(e)=>e.stopPropagation()}
          className={`w-[520px] h-[180px] shadow-md fixed bottom-0 left-1/2 -translate-x-1/2 border bg-white p-[30px] duration-300 ${isItemAlreadyAdded ? "-translate-y-10" : "translate-y-full"}`}
        >
          <h1 className='text-[20px]'>Item already added in cart</h1>
          <p className='text-[14px] text-[#585b5f]'>This item is already in your cart.</p>
          <div className='flex justify-end w-full mt-6'>
            <button onClick={()=>setIsItemAlreadyAdded(false)} className='bg-[#1ba672] py-[10px] px-8 text-[15px] text-white hover:shadow-lg'>OK</button>
          </div>
        </div>
      </div>
      <div
        onClick={()=>setIsDiffRes(false)}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isDiffRes ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          onClick={(e)=>e.stopPropagation()}
          className={`w-[520px] h-[204px] shadow-md fixed bottom-0 left-1/2 -translate-x-1/2 border bg-white p-[30px] duration-300 ${isDiffRes ? "-translate-y-10" : "translate-y-full"}`}
        >
          <h1 className='text-[20px]'>Items already in cart</h1>
          <p className='text-[14px] text-[#585b5f]'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
          <div className='flex justify-between w-full gap-5 mt-6'>
            <button onClick={()=>setIsDiffRes(false)} className='border-2 border-[#1ba672] text-[#1ba672] w-1/2 py-[10px] px-5 text-[15px] hover:shadow-lg'>NO</button>
            <button onClick={()=>{dispatch(clearCart()); setIsDiffRes(false)}} className='bg-[#1ba672] w-1/2 py-[10px] px-5 text-[15px] text-white hover:shadow-lg'>YES,START AFRESH</button>
          </div>
        </div>
      </div>
      <button onClick={handleAddToCart} className='bg-white border py-2 px-10 drop-shadow rounded-[0.55rem] text-[#1ba672] absolute left-[1.25rem] lmd:left-[2.45rem] top-[7.5rem]'>ADD</button>
    </>
  )
}

export default AddToCartBtn