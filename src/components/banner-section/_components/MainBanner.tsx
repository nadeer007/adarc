'use client'
import React, { useRef, useEffect, useState } from 'react';
import productData from '../../../../data.json';
import Image from 'next/image';
import Arrow from '../../../../public/assets/icons/whitearrow.svg';

export default function MainBanner() {
    const imageref = useRef<HTMLDivElement>(null); 
    const [direction, setDirection] = useState<"right" | "left">("right"); 

    const scrollBanner = () => {
        if (imageref.current) {
            const container = imageref.current;
            const containerWidth = container.offsetWidth;

            if (direction === "right") {
                container.scrollLeft += containerWidth;
                if (container.scrollLeft + containerWidth >= container.scrollWidth) {
                    setDirection("left");
                }
            } else {
                container.scrollLeft -= containerWidth;
                if (container.scrollLeft <= 0) {
                    setDirection("right");
                }
            }
        }
    };

    const onClick = (sign:string) => {
        if (imageref.current) {
            const containerWidth = imageref.current.offsetWidth;

            if (sign === '+') {
                imageref.current.scrollLeft += containerWidth;
            }
            else {
                imageref.current.scrollLeft -= containerWidth;
            }
            
        }
    }

    useEffect(() => {
        const interval = setInterval(scrollBanner, 2000); 
        return () => clearInterval(interval); 
    }, [direction]);

    return (
        <div className="w-[100%] max-sm:px-[15px] relative">
            {/* Right Button */}
            <button 
                onClick={() => onClick("+")}  
                className="max-sm:hidden absolute z-10 transform -translate-y-1/2 top-1/2 right-2 w-[32px] h-[32px] rounded-full border border-solid border-white flex items-center justify-center"
            >
                <div className="w-[8px] h-[13px] flex items-center justify-center">
                    <Image src={Arrow} alt={'arrowicon'} width={100} height={100} />
                </div>
            </button>

            {/* Left Button */}
            <button 
                onClick={() => onClick("-")}  
                className="max-sm:hidden absolute z-10 left-2 transform -translate-y-1/2 rotate-180 top-1/2 w-[32px] h-[32px] rounded-full border border-solid border-white flex items-center justify-center"
            >
                <div className="w-[8px] h-[13px] flex items-center justify-center">
                    <Image src={Arrow} alt={'arrowicon'} width={100} height={100} />
                </div>
            </button>

            {/* Scrollable Banner */}
            <div ref={imageref} className="hidden  h-[58%] customer_slider_panel w-[100%] sm:flex overflow-hidden no-scrollbar overflow-x-scroll">
                {productData.mainBanner.map((item) => (
                    <Image key={item.id} src={item?.image} alt="banner" height={280} width={1000} className="scroll_image w-full h-full" />
                ))}
            </div>
            <div ref={imageref} className="flex h-[200px] customer_slider_panel w-[100%] sm:hidden overflow-hidden no-scrollbar overflow-x-scroll">
                {productData.mainBannerMobile.map((item) => (
                    <Image key={item.id} src={item?.image} alt="banner" height={160} width={335} className="scroll_image w-full h-full" />
                ))}
            </div>
        </div>
    );
}
