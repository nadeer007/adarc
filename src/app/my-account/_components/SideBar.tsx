'use client'
import TitleComponent from '@/app/product/[productTitle]/components/TitleComponent'
import DropDownButton from '@/components/buttons/DropDownButton'
import Wrapper from '@/components/includes/Wrapper'
import { accountMenu } from '@/utils/staticUtils'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import left_arrow from '../../../../public/assets/icons/left-arrow.svg'
import React, { useState } from 'react'
import Image from 'next/image'

export default function SideBar() {
  const [activeItem, setActiveItem] = useState(1)
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      {/* Sidebar */}
      <div className={`border-r-[1.6px] border-solid max-[850px]:border-none border-primary_border overflow-hidden transition-all duration-200
        ${visible ? 'fixed pt-[140px] top-0 left-0 h-full p-3 max-w-[300px] bg-white z-50 shadow-lg' : ' max-[850px]:w-0'}
    `}>
        {accountMenu?.map((item, index) => (
          <div className='pb-6 border-b-[1.6px] border-solid border-primary_border ' key={index}>
            <div className='my-6'>
              <TitleComponent titleClass='rubik_medium text-base leading-5 ' title={item.title} />
            </div>
            <div className=''>
              {item?.items?.map((route, indexItem) => (
                <div key={route?.id} className='my-2 ' >
                  <DropDownButton
                    onclick={() => { setActiveItem(route?.id); router.push(route.route);setVisible(false) }}
                    buttonStyle={activeItem != route?.id ? 'rounded-[6px] py-[9px] px-2 bg-[white]' : 'rounded-[6px] px-2 py-[9px] bg-alice_blue'}
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


      <div
        className={`absolute hidden border-gray-400 border border-solid rounded-[6px] max-[850px]:flex top-1/2 left-[-10px] transform -translate-y-1/2 w-[20px] p-1 items-center cursor-pointer transition-transform duration-300 ${visible ? 'rotate-0' : 'rotate-180'
          }`}
        onClick={() => setVisible(!visible)}
      >
        <Image src={left_arrow} alt="Toggle Sidebar" height={20} width={20} />
      </div>

      {/* Background Overlay when Sidebar is Open */}
      {visible && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setVisible(false)}></div>}
    </div>
  )
}
