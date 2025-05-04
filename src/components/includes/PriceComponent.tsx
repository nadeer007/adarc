'use client'
import { cn } from '@/utils/utils'
import React from 'react'

export default function PriceComponent({actualPriceClass,badge, data,isHome=true}:any) {
  return (

    <div>
        <div className='mb-[8px] '>
        <h2 className={cn('rubik_semibold text-[22px] max-sm:text-[18px] text-left leading-[26px] text-gunmetal',actualPriceClass?? null)}> <span className={`${isHome ? 'text-[12px]': ''}`}>AED</span> {data?.current_price }</h2>
        </div>
        { data?.is_offer ? <div className='flex flex-row items-center gap-[8px] '>
            <div className= 'flex bg-primary_red rounded-[4px] justify-center items-center py-[4px] px-[6px] min-h-[20px] min-w-[57px]'>
                <span className='flex text-center text-white rubik_semibold leading-[12px] text-[10px] '>{badge}</span>
            </div>
            <div className='flex  justify-center items-center'>
                <h6 className='line-through text-center  rubik_regular leading-[16px] text-gunmetal text-[12px]'>  <span className={`${isHome ? 'text-[14px]': ''}`}>AED</span>  {data?.actual_price}</h6>
            </div>
        </div>:isHome && <div className='h-[20px] w-full'></div>  }
    </div>
  )
}
