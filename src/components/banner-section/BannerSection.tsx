import React, { useRef } from 'react';
import productData from '../../../data.json';
import Image from 'next/image';
import Banner from '../../../public/temp/banner.svg';
import MainMenu from './MainMenu';
import fetchApiData from '@/config/fetch-api-data';
import MainBanner from './_components/MainBanner';

const BannerSection = async function() {

    const getData = async () => {
        const response = await fetchApiData<any>('products/list-all-categories/');
        console.log(response, "reponse");

        return response;


    }

    const apiData = await getData();
    let categories = null;
    if (apiData?.status_code === 6000) {
        categories = apiData?.data;
    } else {
        categories = null;
    };


    return (
        <div className="my-8  w-full flex gap-6 max-sm:mb-4  max-[480px]:mb-2"
        //  style={{ height: 'calc(100vh - 290px)' }}
        >
            <div className="w-[25%] relative max-[980px]:hidden">
                <MainMenu data={categories} />
            </div>
            <div className="w-[75%] max-[980px]:w-[100%] h-full flex flex-col gap-4">
                {/* <div ref={imageref}  className="h-[58%] w-full  flex justify-center   overflow-x-scroll">
                    {productData.mainBanner.map((item) => (
                        // <div className='w-full h-full '>
                            <Image src={item?.image} alt="banner" height={100} width={100} className='' />
                        // </div>
                    ))}
                </div> */}
                <MainBanner />

                <div className="h-[42%] max-[480px]:hidden flex gap-4">
                    {productData?.banner?.map((item, index) => (
                        <div key={index} className="w-[50%]  flex justify-center  overflow-hidden">
                            <Image src={item?.image} alt={`banner-${index}`} height={100} width={100} className='object-cover' loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BannerSection;
