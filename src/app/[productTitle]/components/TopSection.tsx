import React from 'react';
import ProductImage from './ProductImage';
import ProductMainDetail from './ProductMainDetail';
import ProductAbout from './ProductAbout';
import FrequentlyBought from './FrequentlyBought';
import PeopleAlsoViewed from './PeopleAlsoViewed';
import CompareSection from './CompareSection';
import CustomerSection from './CustomerSection';
import StarSection from './StarSection';
import RightSection from './RightSection';





export default async function TopSection({ productTitle, reviewProduct, Product, recentProduct }: any) {

  return (
    <div className='flex justify-between gap-[16px] relative'>
      <div
        id="left-section"
        className=' flex flex-col overflow-x-hidden  pr-[12px] max-w-[75%] w-[75%] min-w-[75%]'
      >
        <div className='flex gap-[16px]'>
          <div className='w-[51.58%]'>
            <ProductImage data={Product} />
          </div>
          <div className='w-[48.42%]'>
            <ProductMainDetail productTitle={productTitle} product={Product} />
          </div>
        </div>
        <div>
          <ProductAbout description={Product?.description} specification={Product?.specification} />
        </div>
        {/* <FrequentlyBought /> */}
        {/* <PeopleAlsoViewed data={recentProduct} /> */}

        {/* <CompareSection /> */}
        {<StarSection productTitle={productTitle} />}

        <div>
          <CustomerSection productTitle={productTitle} />
        </div>
      </div>
      <div
        className="sticky top-[170px] z-30 h-full "
        id="right-section"
      >        < RightSection Product={Product?.sku} productTitle={productTitle} data={Product} />
      </div>
    </div>
  );
}
