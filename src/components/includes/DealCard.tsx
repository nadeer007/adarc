import { cn } from '@/utils/utils'
import React from 'react'
import String from '../../utils/string'

export default function DealCard({className}:any) {
  return (
    <div className={cn(' relative  rounded-[4px] py-[32px] flex flex-col ',className)} >
        <div className='flex items-center  flex-nowrap '>
            <div className='bg-primary_yellow rounded-[6px] px-[6px] py-[8px] mr-[12px] '>
                <h2 className='font-medium text-[28px] max-xl:text-[22px] max-lg:text-[20px] leading-[32px] text-white '>{String?.title.deals}</h2>
            </div>
            <div className=''>
                <h2 className='font-medium text-[28px] max-xl:text-[22px] max-lg:text-[20px] leading-[39px] text-black '>FOR YOU</h2>
            </div>
            <div></div>
        </div>
        <div className='mt-[51px] py-[12px]'>
            <div className='pb-[16px]'>
            <h4 className=' font-medium text-[18px] max-lg:text-[16px] leading-[22px] text-black '>{String.dealCard.title}</h4>
            </div>
            <div className=''>
            <h6 className='font-normal text-[12px]  leading-[16px] text-black'>{String.dealCard.subTitle}</h6>
            </div>
            
        </div>
        <div className=' w-[100%] flex items-end  absolute bottom-2'>
            <button className=' block text-tang_blue font-semibold text-[12px] leading-[16px] ' >{String.button.discover_more}</button>

        </div>

    </div>
  )
}
