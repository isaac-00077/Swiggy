import React from 'react'

function Footer() {
  return (
    <div className='mt-16 border-t border-[#d7dce3] bg-[#f3f4f6]'>
          <div className='mx-auto max-w-[1180px] px-4 py-8 lg:px-0 lg:py-10'>
            <div className='flex flex-col gap-5 border-b border-[#d7dce3] pb-6 lg:flex-row lg:items-center lg:justify-between'>
              <h2 className='max-w-[34rem] text-center text-[1.45rem] font-extrabold leading-tight text-[#2d3148] lg:text-left'>
                For better experience,download the Swiggy app now
              </h2>
              <div className='flex items-center justify-center gap-3'>
                <a href='https://play.google.com/store/apps/details?id=in.swiggy.android' target='_blank' rel='noreferrer'>
                  <img className='h-[3rem] w-auto rounded-[0.65rem]' src='/get-it-on-google-play-badge-seeklogo.png' alt='Get it on Google Play' />
                </a>
                <a href='https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920' target='_blank' rel='noreferrer'>
                  <img className='h-[3rem] w-auto rounded-[0.65rem]' src='/download-on-the-app-store-seeklogo.png' alt='Download on the App Store' />
                </a>
              </div>
            </div>

            <div className='grid gap-10 py-8 sm:grid-cols-2 lg:grid-cols-5'>
              <div className='space-y-3'>
                <img className='h-11 w-auto' src='/swiggy_footer_logo.png' alt='Swiggy' />
                <p className='text-sm text-[#59616f]'>© 2026 Swiggy Limited</p>
              </div>

              <div>
                <h3 className='mb-4 text-[1rem] font-bold text-[#111827]'>Company</h3>
                <ul className='space-y-3 text-[0.95rem] text-[#4b5563]'>
                  <li>About Us</li>
                  <li>Swiggy Corporate</li>
                  <li>Careers</li>
                  <li>Team</li>
                  <li>Swiggy One</li>
                  <li>Swiggy Instamart</li>
                  <li>Swiggy Dineout</li>
                </ul>
              </div>

              <div>
                <h3 className='mb-4 text-[1rem] font-bold text-[#111827]'>Contact us</h3>
                <ul className='space-y-3 text-[0.95rem] text-[#4b5563]'>
                  <li>Help &amp; Support</li>
                  <li>Partner with us</li>
                  <li>Ride with us</li>
                </ul>

                <h3 className='mb-4 mt-8 text-[1rem] font-bold text-[#111827]'>Legal</h3>
                <ul className='space-y-3 text-[0.95rem] text-[#4b5563]'>
                  <li>Terms &amp; Conditions</li>
                  <li>Cookie Policy</li>
                  <li>Privacy Policy</li>
                  <li>Investor Relations</li>
                </ul>
              </div>

              <div>
                <h3 className='mb-4 text-[1rem] font-bold text-[#111827]'>Available in:</h3>
                <ul className='space-y-3 text-[0.95rem] text-[#4b5563]'>
                  <li>Bangalore</li>
                  <li>Gurgaon</li>
                  <li>Hyderabad</li>
                  <li>Delhi</li>
                  <li>Mumbai</li>
                  <li>Pune</li>
                </ul>
                <button className='mt-4 rounded-md border border-[#cfd5df] bg-white px-3 py-1.5 text-sm text-[#4b5563] shadow-sm'>
                  679 cities
                </button>
              </div>

              <div>
                <h3 className='mb-4 text-[1rem] font-bold text-[#111827]'>Life at Swiggy</h3>
                <ul className='space-y-3 text-[0.95rem] text-[#4b5563]'>
                  <li>Explore with Swiggy</li>
                  <li>Swiggy News</li>
                  <li>Snackables</li>
                </ul>

                <h3 className='mb-4 mt-8 text-[1rem] font-bold text-[#111827]'>Social Links</h3>
                <div className='flex items-center gap-4 text-[#4b5563]'>
                  <a href='https://www.linkedin.com/company/swiggy-in/' aria-label='LinkedIn' target='_blank' rel='noreferrer'><i className='fa-brands fa-linkedin text-[1.15rem]'></i></a>
                  <a href='https://www.instagram.com/swiggyindia/' aria-label='Instagram' target='_blank' rel='noreferrer'><i className='fa-brands fa-instagram text-[1.15rem]'></i></a>
                  <a href='https://www.facebook.com/swiggy.in/' aria-label='Facebook' target='_blank' rel='noreferrer'><i className='fa-brands fa-facebook-f text-[1.15rem]'></i></a>
                  <a href='https://in.pinterest.com/swiggyindia/' aria-label='Pinterest' target='_blank' rel='noreferrer'><i className='fa-brands fa-pinterest-p text-[1.15rem]'></i></a>
                  <a href='https://twitter.com/swiggy' aria-label='Twitter' target='_blank' rel='noreferrer'><i className='fa-brands fa-twitter text-[1.15rem]'></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Footer