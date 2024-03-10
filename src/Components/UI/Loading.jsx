import React from 'react'

export default function Loading() {
  return (
    
    <div className="w-full h-full  relative">
        <div className='bg-[rgba(0,0,0,0.5)] absolute top-0 w-full h-full'></div>
        <div className='w-full h-full absolute top-0'>
          <div className="w-full h-full flex justify-center items-center">
            <div className="loadingScreen">
              <div className="loadingScreenline"></div>
              <div className="loadingScreenline"></div>
              <div className="loadingScreenline"></div>
            </div>
          </div>
          </div>
        </div>
  )
}
