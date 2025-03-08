'use client'
import RectangleSection from '@/components/includes/RectangleSection'
import fetchApiData from '@/config/fetch-api-data';
import React, { useEffect, useState } from 'react'


 function  RecentlyViewed({className}:any) {
  const getrecentData = async () => {
    const response = await fetchApiData<any>('products/list-products/');
    setRecentView(response?.data)
    console.log(response,'hggggg')
    
  };

  const [recentView,setRecentView] = useState([])

  useEffect(()=>{
   getrecentData();

  },[])

  return (
    <div className={`${className}`} >
      <RectangleSection className='' datas={recentView} moreItems={true} sectionTitle={'Recently Viewed'}/>
    </div>
  )
}

export default RecentlyViewed
