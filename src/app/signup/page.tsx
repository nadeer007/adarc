import React from 'react'
import HighlightBox from './_components/HighlightBox'
import FormSection from './_components/FormSection'
import Wrapper from '@/components/includes/Wrapper'


function Page() {
  
  return (
    <Wrapper className='bg-[#E4E4E4] '>
      <div className=' flex  justify-center items-start pb-4'>
        <FormSection />
        <HighlightBox />
      </div>
    </Wrapper>
  )
}

export default Page
