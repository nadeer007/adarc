import React from 'react'
import { getIcon } from '../image/Icon'
import strings from '@/utils/string'
import Wrapper from './Wrapper'
import { div } from 'framer-motion/client'
// update the path as needed

function HighlightSection() {
  
  return (
    <div className='bg-PRIMARY_GREY max-sm:hidden'>
          <Wrapper className='  w-full text-[#E3E8EF] !py-[24px]'>
      <div className='flex justify-between items-baseline  gap-[6px] w-full  text-TEXT_BLACK'>
      {strings.highlightsection.map((item:any, index) => (
        <div key={index} className='flex flex-col justify-between items-center text-left gap-2'>
          <div className='flex  items-center justify-start m-1 w-full '>{getIcon({ icon: item.icon, className: "w-[24px] h-[24px]" })}</div>
          <div className='rubik_regular font-medium text-[16px] text-left w-full'>{item.title}</div>
          
          <div className='text-[12px] font-normal rubik_regular text-left w-full max-md:hidden '>{item.description}</div>
         <a href={item?.link} className='text-[#46474A] rubik_regukar text-[12px] text-left w-full underline'>{item.link_text}</a>
        </div>
      ))}
    </div>
    </Wrapper>
    </div>


    
  )
}

export default HighlightSection
