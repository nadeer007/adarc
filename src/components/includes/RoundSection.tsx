import React from 'react'
import RoundProduct from './RoundProduct';
import { cn } from '@/utils/utils';
import TitleSection from './TitleSection';



export default function RoundSection({ sectionTitle,category=false, data }: any) {
  return (
    <div className='pb-[48px] max-sm:pb-[20px] ' >
      <TitleSection sectionTitle={sectionTitle} />
        <div className={cn('flex gap-[30px] max-md:gap-[20px] px-[10px] w-[100%]  no-scrollbar  items-baseline ',
        category ? 'overflow-x-scroll ' : 'overflow-scroll'
        )}>
        {data?.map((item:any, index:any) => (
        <div key={index} className={cn('items-center',category ? 'w-[13%] max-xl:w-[19%] max-lg:min-w-[23%]  max-lg:max-w-[23%] max-sm:min-w-[20%]  max-sm:max-w-[20%]  ' :'min-w-[16%] w-[16%]' )}>
          <RoundProduct category={category} image={ item?.icon} />
          { category && <div className='mt-[8px]'><h3 className='font-normal text-[22px] rubik_regular text-center max-lg:text-[16px] max-[480px]:text-[14px]'>{item?.name}</h3></div>}
        </div>
      ))}
        </div>
      
    </div>
  );
}
