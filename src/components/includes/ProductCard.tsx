// ProductCard.js
import React, { useState } from 'react';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import PriceComponent from './PriceComponent';

interface ProductCardProps {
  className?: string;
  MoreItems?: boolean;

  data: {
    brand:{
      icon?:string;
    };
    primary_attachment?: string;
    name: string;
    price?: any;
    oldPrice?: any,
    offer?: any,
    isOffer?: any,
    price_details?:any,
    badge?:string
  };
  border?: boolean;
}

function ProductCard({ className, data, border = true, MoreItems = false }: ProductCardProps) { // Default value is true
  const [activeHover, setActiveHover] = useState(false); // Manage hover state with useState

  const hoverCard = () => {
      setActiveHover(true); // Set hover state to true
      // console.log(activeHover, 'Hover started');
  };

  const unmountHover = () => {
      setActiveHover(false); // Set hover state to false
      // console.log(activeHover, 'Hover ended');
  };

  return (
    <div
    onMouseEnter={hoverCard} // Trigger hover start
    onMouseLeave={unmountHover} // Trigger hover end
    className={cn(
        'hover:opacity-[.9]  max-sm:shadow-lg transition-all transform px-[16px] py-[12px] rounded-[4px] flex flex-col gap-3 items-center  max-md:px-[10px] max-md:py-[8px]',
        border ? 'border-[.5px] sm:border  border-[#C5CBD5]/50 border-solid' : '',
        activeHover && 'border border-[#0457C8] border-solid  ', 
        className
    )}
    // style={{ transformOrigin: 'center top' }}
>

      <div className={cn('w-[100%] min-h-[180px] hover: hover:scale-[1.05] duration-500 transition-all transform flex justify-center bg-red', MoreItems && '') } style={{aspectRatio:'1'}} >
        {data?.primary_attachment && <Image
          src={data?.primary_attachment}
          alt={data?.name}
          width={100}
          height={100}
          loading='lazy'
          className='object-contain w-[100%] h-[100%]'
          // objectFit="contain"
        />}
      </div >
      <div className=''>
        <div className='min-h-[60px]'>
          <h1 className={cn('   text-left rubik_regular font-normal text-[14px] max-md:text-[13px] three-line-clamp',activeHover && 'text-[#0457C8]')}>
            {data?.name}
          </h1>
        </div>

        <div className='mt-[12px]'>
          <PriceComponent actualPriceClass=''  badge={data?.badge} data={data?.price_details}/>
        </div>
      </div>



    </div>
  );
}

export default ProductCard;
