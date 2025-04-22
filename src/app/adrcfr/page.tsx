"use client";
import React from 'react';

import Wrapper from '@/components/includes/Wrapper';
// import FilterComponents from './_components/FilterComponents';
import dynamic from 'next/dynamic';

// Dynamically import FilterComponents with SSR disabled
const FilterComponents = dynamic(() => import('./_components/FilterComponents'), {
  ssr: false,
});
function Page() {
  
  return (
  <div className='min-h-[80vh]'>
    <Wrapper className='max-[480px]:px-0 max-sm:pt-[115px]' >
      <FilterComponents />
    </Wrapper>
  </div>
  );
}

export default Page;
