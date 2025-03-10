// src/app/[productTitle]/page.tsx
import React from 'react';
import Head from 'next/head';
import RecentlyViewed from './components/RecentlyViewed';
import Wrapper from '@/components/includes/Wrapper';
import TopSection from './components/TopSection';
import fetchApiData from '@/config/fetch-api-data';

// Define types for props
interface Params {
  productTitle: string;
}

interface ApiResponse<T> {
  status_code: number;
  data: T | null;
  message?: string;
}

interface Product {
  name: string;
  description: string;
  sku: string;
  price: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

interface Props {
  product: Product | null;
  review: any;
  recentProduct: Product[] | null;
  productTitle: string;
}

// Server-side functions to fetch data
const getData = async (productTitle: string) => {
  const response = await fetchApiData<ApiResponse<any>>(
    `products/view-product/${productTitle}`
  );
  console.log('helloo',response)

  return response;
};


export async function generateMetadata({ params }: { params: Params }) {
  const { productTitle } = params;

  const apiData = await getData(productTitle);
  const product = apiData?.data;

  return {
    title: product?.meta_title || product?.name,
    description: product?.meta_description || 'Default description',
    keywords: product?.meta_keywords || '',
  };
}

// This is the server-side page component
const Page = async ({ params}: { params: Promise<Params>}) => {
  const { productTitle } = await params;

  const apiData = await getData(productTitle);


  if (apiData?.status_code !== 6000) {
    return (
      <Wrapper>
        <div className="text-center py-[48px]">
          <h1>Product Not Found</h1>
          <p>Please check the product title or try again later.</p>
        </div>
      </Wrapper>
    );
  }

  const product = apiData.data;


  return (
    <Wrapper className="pt-[139px]">
      <Head>
        <title>{ product?.name}</title>
        <meta name="description" content={product?.description} />
        <meta name="keywords" content={product?.description || ''} />
      </Head>

      <div>
        <TopSection
          productTitle={productTitle}
          Product={product}
          // reviewProduct={review}
          // recentProduct={recentProduct}
        />
        <RecentlyViewed  className="px-[48px] py-[32px]" />
      </div>
    </Wrapper>
  );
};

export default Page;
