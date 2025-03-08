import { cn } from '@/utils/utils';
import Link from 'next/link'
import React from 'react'

interface RoundProductProps {
  image: string;
  category: Boolean
}
export default function RoundProduct({ image, category }: RoundProductProps) {

  return (
    <div className={cn('hover:opacity-[.9] items-center  rounded-full bg-PRIMARY_GREY', category ==false && '')} style={{aspectRatio:'1'}}>
      <Link className='flex items-center w-[100%] h-[100%] justify-center' href={''}>
        <div className='w-[70%] h-[70%] items-center justify-center' >
          {image ?
            <img src={image}
              alt="productImage"
              width={100}
              height={100} /> : ""}
        </div>

      </Link>

    </div>
  )
}
