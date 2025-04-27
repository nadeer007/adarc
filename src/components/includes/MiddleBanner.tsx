import React from 'react'
import productData from '../../../data.json'
import Image from 'next/image'

export default function MiddleBanner() {

  return (
    <div className='flex items-center justify-between mb-[48px] px-[10px] max-sm:flex-wrap  '>
        {productData.bannerMiddle.map((item,index)=>(
            <div key={index} className='w-[49%] sm:w-[33%] max-sm:last:w-[100%] max-sm:last:mt-[10px] bg-PRIMARY_GREY' style={{ aspectRatio: '1' }}>
                <Image className='w-full ' src={item.image} width={400} height={400} alt='banner' loading='lazy'/>
            </div>
        ))}
        
    </div>
  )
}
