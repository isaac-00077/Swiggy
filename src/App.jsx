import { lazy, Suspense, useEffect, useState } from 'react'
import Head from './components/Head'
import Body from './components/Body'
import Shimmer from './components/Shimmer'
// import Restaurant_menu from './components/Restaurant_menu'
// import Cart from './components/Cart'
import { Route , Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Cart=lazy(()=>import('./components/Cart'))
const Restaurant_menu=lazy(()=>import('./components/Restaurant_menu'))
const Search=lazy(()=>import('./components/Search'))
const ErrorPage=lazy(()=>import('./components/ErrorPage'))

function App() {
  const visible=useSelector((state) => state.toggleSlice.toggleSearchBar)
  const toggleLogin=useSelector((state) => state.toggleSlice.toggleLogin)
  const toggleCard=useSelector((state) => state.toggleSlice.toggleCard)

  useEffect(() => {
    if (visible || toggleLogin || toggleCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
}, [visible, toggleLogin, toggleCard]);


  return(
      <div className={`relative font-gilroy `}>
        <Suspense fallback={<Shimmer />}>
          <Routes>
            <Route path="/" element={<Head />} >
              <Route path="/" element={<Body />} />
              <Route path="/menu/:id" element={<Restaurant_menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<Body />} />
              <Route path="/search" element={<Search />}/>
            </Route>  
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </div>
  );
}

export default App
