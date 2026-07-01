import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebaseAuth'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addUserData } from '../utils/authSlice'
import { useNavigate } from 'react-router-dom'
import { removeUserData } from '../utils/authSlice'
import { loginToggle } from '../utils/toggleSlice'

function SignInBtn() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector((state) => state.authSlice.userData)

  async function handleAuth(){
    let data=await signInWithPopup(auth,provider)
    const userData={
        name:data.user.displayName,
        photo: data.user.photoURL
    }    
    dispatch(addUserData(userData))
    dispatch(loginToggle())
    navigate("/")
  }
  async function handleLogOut(){
    await auth.signOut(auth)
    dispatch(removeUserData())
    dispatch(loginToggle())
  }

  return (
    <div className='flex'>
      {
        !userData &&
        <button onClick={handleAuth} className='bg-[#ff5200] text-white py-3 px-[5.8rem] hover:shadow-md mt-10 ml-2'>
          <i className="fa-brands fa-google text-white mr-2"></i>
          Login with Google
        </button>
      }
        {
            userData && 
            <button onClick={handleLogOut} className='bg-[#ff5200] text-white py-3 px-24  hover:shadow-md mt-10 ml-2'>
                Log Out
            </button>
        }
        
    </div>
  )
}

export default SignInBtn