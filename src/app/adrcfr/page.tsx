"use client";
import React from 'react';

import Wrapper from '@/components/includes/Wrapper';
import FilterComponents from './_components/FilterComponents';

function Page() {
  
  return (
  <div className='min-h-[80vh]'>
    <Wrapper className='max-[480px]:px-0' >
      <FilterComponents />
    </Wrapper>
  </div>
  );
}

export default Page;
