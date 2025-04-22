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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateMaxIndex = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 480);

            if (width <= 480) setMaxIndex(0);
            else if (width <= 740) setMaxIndex(1);
            else setMaxIndex(2);
        };

        updateMaxIndex();
        window.addEventListener('resize', updateMaxIndex);

        return () => window.removeEventListener('resize', updateMaxIndex);
    }, []);

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="hidden md:block absolute rounded-full -right-3 lg:-right-5 top-1/2 transform -translate-y-1/2 z-40 shadow-[0px_1px_3px_rgba(0,0,0,0.25)] bg-[#f5f5f5]"
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
                className="hidden md:block absolute rounded-full -left-6 lg:-left-7 top-1/2 transform -translate-y-1/2 z-40 shadow-[0px_1px_3px_rgba(0,0,0,0.25)] bg-[#f5f5f5]"
            >
                <ScrollIcon left={true} />
            </div>
        );
    };

    // const settings = {
    //     ...slider_settings,
    //     infinite: false,
    //     slidesToShow: slider_settings?.slidesToShow ?? 6,
    //     slidesToScroll: slider_settings?.slidesToScroll ?? 2,
    //     swipeToSlide: true,
    //     nextArrow: <CustomNextArrow />,
    //     prevArrow: <CustomPrevArrow />,
    // };
    const settings = {
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
            slidesToShow: 4,
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



    return (
        <div className={cn('mb-[48px]', className)}>
            {!deals && <TitleSection sectionTitle={sectionTitle} className="" />}
            {
                moreItems ?
                    <div className='justify-center items-center flex w-full'>
                        <div className={cn('flex md:flex-wrap max-md:overflow-x-scroll  items-center gap-y-[20px] ')}>
                            {datas?.map((data: any, index: any) => (
                                <Link href={`/${data?.slug}`} key={index} className='w-1/6 max-xl:w-[20%] max-lg:w-[25%] px-[10px] min-h-[330px] max-md:w-[33%] max-[480px]:w-[50%]'>
                                    <ProductCard key={index} data={data} MoreItems={true} className='  ' />
                                </Link>

                            ))}
                        </div>
                    </div>
                    :
                    deals ?
                        <div className={cn('flex gap-[1%]   items-center justify-between overflow-x-hidden',)}>
                            {/* <div></div> */}
                            <DealCard className={cn('min-h-[400px] w-[24%] max-[740px]:w-[31%]   max-md:w-[30%]  max-[480px]:w-[48%] max-[390px]:w-[95%]')} />
                            {datas?.map((data: any, index: any) => (
                                index <= maxIndex && <Link className=' w-[24%]   max-[740px]:w-[31%]   max-md:w-[30%] max-[480px]:w-[48%]  ' key={index} href={`${data?.slug}`}><ProductCard data={data} /></Link>
                            ))}

                        </div>
                        :
                        <div className="relative">
                            {isMobile ? (
                                <div className="flex overflow-x-scroll px-[10px] gap-4 pb-2 no-scrollbar">
                                    {datas?.map((data: any, index: any) => (
                                        <Link key={index} href={`/${data?.slug}`} className="min-w-[150px]">
                                            <ProductCard data={data} />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Slider {...settings} className="flex justify-center items-center gap-[20px]">
                                    {datas?.map((data: any, index: any) => (
                                        <Link key={index} href={`/${data?.slug}`} className="pr-[10px]">
                                            <ProductCard data={data} />
                                        </Link>
                                    ))}
                                </Slider>
                            )}
                        </div>


            }
        </div>
    );
}

export default RectangleSection;
