import React, { useState } from 'react'
import Restaurant_cards from './Restaurant_cards'
import { useDispatch } from 'react-redux'
import { setActiveFilter } from '../utils/filterSlice'

function Restaurants_online({ data , title}) {

  const filterOptions= [
    { filtername: "Rating 4.0+" },
    { filtername: "Rs. 300-600" },
    { filtername: "Offers" },
    { filtername: "Less than Rs. 300" },
  ]
  
  const [activeBtn, setActiveBtn] = useState(null)
  const dispatch = useDispatch()

  function handleFilterBtn(filtername){
    setActiveBtn(activeBtn === filtername ? null : filtername)
    dispatch(setActiveFilter(filtername === activeBtn ? null : filtername)) 
  }

  return (
    <div>
        <h1 className='text-2xl font-bold mt-8 mb-5'>{title}</h1>
        <div className='-mt-1 mb-8 flex flex-wrap gap-2'> 
          {
            filterOptions.map(({filtername}) => (
              <button key={filtername} onClick={()=>handleFilterBtn(filtername)} className={`border  rounded-full px-4 py-1 text-sm font-medium  shadow-md text-[#5b5b5b] flex items-center gap-1 justify-center ${activeBtn === filtername ? "active":"border-gray-300"}`}>{
                filtername}
                <i className="fa-solid fa-xmark text-[12px] mt-[2px] hidden"></i>
                </button>
            ))
          }
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-20 xl:grid-cols-3 xl:gap-14 xsm:w-[70%] xsm:justify-self-center md:w-full 2xl:grid-cols-4 2xl:gap-x-36 xxl:gap-10'>
        {data.map(({ info ,cta:{link}}, index) => (
          <div className='hover:scale-95 duration-75' key={info.id ?? link ?? index}>
                <Restaurant_cards {...info} link={link} />
            </div>
        ))}
        </div>
    </div>
  )
}

export default Restaurants_online