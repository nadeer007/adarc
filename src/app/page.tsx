
import React from 'react'
import CategorySection from '@/components/includes/CategorySection';
import BrandSection from '@/components/includes/BrandSection';
import BannerSection from '@/components/banner-section/BannerSection';
import MiddleBanner from '@/components/includes/MiddleBanner';
import BottomBanner from '@/components/includes/BottomBanner';
import type { Metadata } from 'next'
import Wrapper from '@/components/includes/Wrapper';
// import RectangleSection from '@/components/includes/RectangleSection';
import Products from '../../data.json';
import fetchApiData from '@/config/fetch-api-data';
import dynamic from 'next/dynamic';

const RectangleSection = dynamic(() => import('@/components/includes/ClientRectangleSection'));

const getData = async () => {
  const response = await fetchApiData<any>('products/list-products/');
  return response;
}

const getBannerData = async () => {
  const response = await fetchApiData<any>('core/list-banners/');
  return response;
}


const slider_settings = {
  slidesToShow: 6,
  slidesToScroll: 2,
  responsive: [{
    breakpoint: 1280,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 640,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 480,
    settings: {
      arrows: false,
      swipeToSlide: true,
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  ],
};


// export const metadata: Metadata = {
//   title: 'Adarc Computers',
//   description: 'Your Trusted Source for High-End Gaming PCs & Components in UAE',
// }
const Page = async function () {

  const generateDeviceId = () => {
    const deviceID = 'device-' + Math.random().toString(36).slice(2, 9) + Math.random().toString(36).slice(2, 9);
    console.log(deviceID, 'deviceID')
  }
  generateDeviceId()

  const apiData = await getData();
  let products = null;
  if (apiData?.status_code === 6000) {
    products = apiData?.data;
  } else {
    products = null;
  };


  const bannerData = await getBannerData(); 
  let banners = null;
  if (bannerData?.status_code === 6000) {
    banners = bannerData?.data;
  }

  
  return (
    <>

      <div className='w-full scroll'>
        <Wrapper className='lg:pt-[155px] sm:pt-[150px]  pt-[84px] max-sm:px-0 '>
          <BannerSection data={banners.top} />
          <CategorySection />
          <div className=''>
            <RectangleSection className='' datas={products} sectionTitle={'New Arrival'} slider_settings={slider_settings} />
          </div>
          <div><RectangleSection className='' datas={products} sectionTitle={'Popular gaming PC'} slider_settings={slider_settings} /></div>
          <div><RectangleSection className='' datas={products} sectionTitle={'Best Selling Graphic Card'} slider_settings={slider_settings} /></div>
          <BrandSection />
          <div><RectangleSection className='max-md:mb-[20px]' datas={products} sectionTitle={''} deals={true} /></div>
          <MiddleBanner data={banners?.middle} />
          <div><RectangleSection className='' datas={products} viewBy={true} sectionTitle={'Viewed by you'} slider_settings={slider_settings} /></div>
          <BottomBanner />
          <div><RectangleSection className='' datas={products} moreItems={true} sectionTitle={'More items for you'} slider_settings={slider_settings} /></div>
        </Wrapper>


      </div>

    </>
  )
}

export default Page
