import React from 'react';

import Wrapper from '@/components/includes/Wrapper';
import FilterPage from '../../_components/FilterPage';

function Page({params,searchParams}:{params:any,searchParams:any}) {
  
  return (

      <FilterPage params={params}  searchParams={searchParams}/>
   
  
  );
}

export default Page;
