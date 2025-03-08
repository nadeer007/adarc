'use client'
import { cn } from '@/utils/utils'
import Image from 'next/image'
import React, { useState } from 'react'


export default function ProductImage({data} :any) {
    const [active,setActive] = useState(0);

  return (
    <div className='w-[100%] px-[16px] py-[24px] items-center '>
    <div className=' flex w-[100%]  h-[500px] max-h-[500px]  justify-center items-center mb-[12px] rounded-[4px] overflow-hidden'>
{    data?.attachments &&  <Image className='flex ' width={100} height={100} src={data?.attachments?.[active]?.attachment}  alt='productImage'   objectFit="cover"
 objectPosition="center"/>} 
    </div>
    <div className='flex flex-row overflow-x-scroll no-scrollbar w-[100%] gap-[16px] bg'>
        { data?.attachments?.map((item: any,index:any)=>(
                    <button   
                    key={index}
                    onClick={()=>{setActive(index)}}
                    onMouseEnter={()=>setActive(index)}
                    className={cn('flex justify-center items-center w-[64px] h-[64px] min-w-[64px] overflow-hidden  rounded-[4px] border-solid border-BLACK',active == index ? 'border-BLACK border-2':'border-select_border_grey border')
                    }
                    >
                    {item?.attachment && <Image className='block object-fill' src={item?.attachment} alt='productImages' width={100} height={100} />}
                </button>
        ))}

    </div>

  </div>
  )
}
