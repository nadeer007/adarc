import React from 'react'
import RoundProduct from './RoundProduct';
import { cn } from '@/utils/utils';
import TitleSection from './TitleSection';



export default function RoundSection({ sectionTitle,category=false, data }: any) {
  return (
    <div className='pb-[48px] ' >
      <TitleSection sectionTitle={sectionTitle} />
        <div className={cn('flex gap-[30px] max-md:gap-[20px] w-[100%]  no-scrollbar  items-baseline ',
        category ? 'flex-wrap justify-center' : 'overflow-scroll'
        )}>
        {data?.map((item:any, index:any) => (
        <div key={index} className={cn('items-center    ',category ? 'w-[13%] max-xl:w-[19%] max-lg:w-[23%] ' :'min-w-[16%] w-[16%]' )} key={item.id}>
          <RoundProduct category={category} image={ item.icon} />
          { category && <div className='mt-[8px]'><h3 className='font-normal text-[22px] rubik_regular text-center max-lg:text-[18px] max-[480px]:text-[16px]'>{item?.name}</h3></div>}
        </div>
      ))}
        </div>
      
    </div>
  );
}
