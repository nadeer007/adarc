'use client'
import React, { useState } from 'react'
import TitleComponent from './TitleComponent'
import Strings from '../../../../utils/string'
import { aboutProduct } from '@/utils/staticUtils'
import DropDownButton from '@/components/buttons/DropDownButton';
import { cn } from '@/utils/utils'

export default function ProductAbout({ description, specification }: any) {

  const [isActive, setActivate] = useState(false);
  const [isSpecActive, setSpecActive] = useState(false)


  return (
    <div className='py-[48px]'>
      <div className='mb-[19px]'>
        <TitleComponent title={Strings.productPage.aboutTitle} titleClass='rubik_semibold text-[20px] leading-[24px]' containerClass='' />
      </div>

      <div>
        <div className={cn('border-t-[0.6px] border-solid border-primary_border pt-[19px] pb-[12px] ')}>
          <DropDownButton rotate_angle={'-rotate-180'} onclick={() => setActivate(!isActive)} isActive={isActive} titleClass='text-[16px] rubik_regular leading-[20px] ' containerClass='' title={'Description'} />
        </div>
        {description?.length > 1 && isActive && <div
          className='rubik_regular text-[14px] text-shadow_gray'

          dangerouslySetInnerHTML={{ __html: description }}
        >

        </div>}
        <div className={cn('border-t-[0.6px] border-solid border-primary_border pt-[19px] pb-[12px] ', isSpecActive && 'mb-[20px]')}>
          <DropDownButton rotate_angle={'-rotate-180'} onclick={() => setSpecActive(!isSpecActive)} isActive={isSpecActive} titleClass='text-[16px] rubik_regular leading-[20px] ' containerClass='' title={'Specification'} />
        </div>

        {specification?.length > 1 && isSpecActive && <div
          className='rubik_regular text-[14px] text-shadow_gray'

          dangerouslySetInnerHTML={{ __html: specification }}
        >

        </div>}

      </div>


    </div>
  )
}
