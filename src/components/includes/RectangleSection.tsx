// ProductSection.js
'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/utils/utils';
import TitleSection from './TitleSection';
import ScrollIcon from './ScrollIcon';
import Slider from "react-slick";
import DealCard from './DealCard';
import { useRouter } from 'next/navigation';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fetchApiData from '@/config/fetch-api-data';
import Link from 'next/link';


function RectangleSection(
    {
        className,
        datas,
        sectionTitle, viewBy = false,
        moreItems,
        deals = false,
        slider_settings,
        wishlist = false,

    }: {
        className?: string;
        datas: any;
        sectionTitle: string;
        viewBy?: boolean;
        moreItems?: boolean;
        deals?: boolean;
        slider_settings?: any;
        wishlist?: any;
    }
) {

    const router = useRouter();
    const [maxIndex, setMaxIndex] = useState(2);

  useEffect(() => {
    const updateMaxIndex = () => {
      if (window.innerWidth <= 480) {
        setMaxIndex(0);
      } else if (window.innerWidth <= 740){
        setMaxIndex(1);      
      }
      else{
        setMaxIndex(2);
      }
    };

    updateMaxIndex(); // Set the initial value
    window.addEventListener('resize', updateMaxIndex);

    return () => {
      window.removeEventListener('resize', updateMaxIndex);
    };
  }, [])

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute rounded-full -right-5 top-1/2 transform -translate-y-1/2 z-40 shadow-[0px_1px_3px_rgba(0,0,0,0.25)] bg-[#f5f5f5]"
            >
                <ScrollIcon />
            </div>
        );
    };

    const CustomPrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute rounded-full -left-7 top-1/2 transform -translate-y-1/2 z-40 shadow-[0px_1px_3px_rgba(0,0,0,0.25)] bg-[#f5f5f5]"
            >
                <ScrollIcon left={true} />
            </div>
        );
    };

    const settings = {
        ...slider_settings,
        infinite: false,
        slidesToShow: slider_settings?.slidesToShow ?? 6,
        slidesToScroll: slider_settings?.slidesToScroll ?? 2,
        swipeToSlide: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,       
    };

  

    return (
        <div className={cn('mb-[48px]', className)}>
            {!deals && <TitleSection sectionTitle={sectionTitle} />}
            {
                moreItems ?
                    <div className='justify-center items-center flex w-full'>
                        <div className={cn('flex md:flex-wrap max-md:overflow-x-scroll  items-center gap-y-[20px] ')}>
                            {datas?.map((data: any, index: any) => (
                                <Link href={`${data?.slug}`} key={index} className='w-1/6 max-xl:w-[20%] max-lg:w-[25%] px-[10px] min-h-[330px] max-md:w-[33%] max-[480px]:w-[50%]'>
                                    <ProductCard key={index} data={data} MoreItems={true} className='  ' />
                                </Link>

                            ))}
                        </div>
                    </div>
                    :
                    deals ?
                        <div className={cn('flex gap-[1%]   items-center justify-between overflow-x-hidden', )}>
                            {/* <div></div> */}
                            <DealCard className={cn('min-h-[400px] w-[24%] max-[740px]:w-[31%]   max-md:w-[30%]  max-[480px]:w-[48%] ')} />
                            {datas?.map((data: any, index: any) =>(
                              index <= maxIndex  &&  <Link className=' w-[24%]   max-[740px]:w-[31%]   max-md:w-[30%] max-[480px]:w-[48%] ' key={index} href={`${data?.slug}`}><ProductCard  data={data}  /></Link>
                                ))}
                           
                        </div>
                        :
                        <div className="relative">
                            <Slider {...settings} className=" flex justify-center  items-center gap-[20px]">

                                {datas && datas?.map((data: any, index: any) => (

                                    <Link aria-label={`${data?.name}`}  href={`${data?.slug}`}
                                     key={index} className='pr-[10px]  '>
                                        <ProductCard key={index} data={data} className='' />
                                    </Link>
                                ))}
                            </Slider>
                        </div>


            }
        </div>
    );
}

export default RectangleSection;
