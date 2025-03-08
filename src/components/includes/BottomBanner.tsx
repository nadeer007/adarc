import React from 'react'
import productData from '../../../data.json'
import Image from 'next/image'

export default function BottomBanner() {
  return (
    <div className='flex items-center justify-between mb-[48px]'>
         {productData.bannerBottom.map((item,index)=>(
            <div key={index} className='w-[49%] bg-PRIMARY_GREY' style={{aspectRatio : '3'}}>
                <Image src={item.image} width={100} height={100} alt='banner' loading='lazy'/>
            </div>
        ))}
    </div>
  )
}
