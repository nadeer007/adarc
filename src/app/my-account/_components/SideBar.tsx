'use client'
import TitleComponent from '@/app/[productTitle]/components/TitleComponent'
import DropDownButton from '@/components/buttons/DropDownButton'
import Wrapper from '@/components/includes/Wrapper'
import { accountMenu } from '@/utils/staticUtils'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useState } from 'react'

export default function SideBar() {
    const [activeItem, setActiveItem] = useState(1)
    const router = useRouter()

  return (
    <div>
        <div className='w-full border-r-[1.6px] border-solid border-primary_border '>
          {accountMenu?.map((item,index) => (
            <div className='pb-6 border-b-[1.6px] border-solid border-primary_border ' key={index}> 
            <div className='my-6'>
            <TitleComponent titleClass='rubik_medium text-base leading-5 ' title={item.title} />
            </div>
              <div className=''>
                {item?.items?.map((route,indexItem)=>(
                  <div key={route?.id} className='my-2 ' >
                    <DropDownButton 
                    onclick = {()=>{setActiveItem(route?.id);router.push(route.route)}} 
                    buttonStyle={activeItem != route?.id ? 'rounded-[6px] py-[9px] px-2 bg-[white]' :'rounded-[6px] px-2 py-[9px] bg-alice_blue'} 
                    containerClass=' w-full' 
                    titleClass='rubik_regular text-[14px] leading-[18px] text-left' 
                    dropdown={false} title={route.title} />
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
        {/* <div className='w-[70%]'>   
        </div> */}
  </div>
  )
}
