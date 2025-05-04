import React from 'react'
import RoundProduct from './RoundProduct';
import { cn } from '@/utils/utils';
import TitleSection from './TitleSection';
import Link from 'next/link';



export default function RoundSection({ sectionTitle,category=false, data }: any) {
  return (
    <div className='mb-[28px] md:mb-[48px] bg-PRIMARY_GREY p-4 rounded-[6px]  ' >
      <TitleSection sectionTitle={sectionTitle} />
        <div className={cn('flex gap-[30px] max-md:gap-[20px] px-[10px] w-[100%]  no-scrollbar  items-baseline ',
        category ? 'overflow-x-scroll ' : 'overflow-scroll'
        )}>
        {data?.map((item:any, index:any) => (
        <Link href={''} key={index} className={cn('items-center w-[122px] min-w-[122px] max-w-[122px] mb-2')}>
          <RoundProduct category={category} image={ item?.icon} />
          { category && <div className='mt-[8px]'><h1 className='font-normal rubik_regular text-center sm:text-[16px] text-[14px] hover:text-[#0457C8] line-clamp-2'>{item?.name}</h1></div>}
        </Link>
      ))}
        </div>
      
    </div>
  );
}
