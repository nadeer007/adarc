import Link from 'next/link'
import React from 'react'

export default function TitleSection({ sectionTitle }: any) {
  return (
    <div className='flex justify-between items-center h-[40px] mb-[24px] border-b-[1px] border-solid border-primary_border '>
      <div className=''>
        <h2 className='text-xl text-black/95 opensans_semibold'>{sectionTitle}</h2>
      </div>
      <Link href={''} className='items-center justify-center flex'>
        <span className='text-[13px] font-normal rubik_regular'>View more</span>
      </Link>
    </div>
  )
}
