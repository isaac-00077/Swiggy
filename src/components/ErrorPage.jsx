import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-white'>
      <div className='max-w-md w-full text-center py-10 px-6 rounded-xl shadow-sm border border-gray-100'>
        <h1 className='text-3xl sm:text-4xl font-semibold text-[#232b38]'>We&apos;ll be back shortly</h1>
        <p className='mt-4 text-sm sm:text-base text-[#6b7280]'>We are fixing a temporary glitch. Sorry for the inconvenience.</p>
        <button
          onClick={() => navigate('/')}
          className='mt-8 px-6 py-3 bg-[#ff5200] text-white font-semibold rounded-none hover:bg-[#e64a00] transition-colors'
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default ErrorPage