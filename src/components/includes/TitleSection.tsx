import { cn } from '@/utils/utils'
import Link from 'next/link'
import React from 'react'

export default function TitleSection({ sectionTitle, className,isViewMore=false }: {
  sectionTitle: any,
  className?: any,
  isViewMore?:any
}) {
  return (
    <div className={cn('flex justify-between items-center h-[40px] mb-[24px]  ', className)}>
      <div className=''>
        <h2 className='text-lg md:text-xl text-black/95 opensans_semibold'>{sectionTitle}</h2>
      </div>
      {isViewMore && <Link href={''} className='items-center justify-center flex'>
        <span className='text-[13px] font-normal rubik_regular'>View more</span>
      </Link>}
    </div>
  )
}
