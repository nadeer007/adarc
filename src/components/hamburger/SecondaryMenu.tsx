import React from "react";
import TitleComponent from "@/app/product/[productTitle]/components/TitleComponent";
import Link from "next/link";
import Image from "next/image";
import LeftArrow from '../../../public/assets/icons/left-arrow.svg'

export default function SecondaryMenu({ data, setActiveMegaMenu, setActiveIndex }: any) {
    console.log(data,"datadatadatadata");
    
    return (
        <>
            <div
                // onMouseLeave={() => {
                //     setActiveMegaMenu(false);
                //     setActiveIndex(null)
                // }}
                className=" w-full rounded-tl-[6px] rounded-bl-[6px]   h-full   flex flex-col overflow-y-scroll no-scrollbar">
                <div className="flex flex-col  gap-[12px] items-start  ">

                    <button className=' text-[#222222] px-[7%]  flex items-center gap-4 pb-4 text-[16px] rubik_medium border-[#E2E4E5] border-solid border-b w-full' onClick={() => {
                        setActiveMegaMenu(false);
                        setActiveIndex(null);
                    }}>
                       <Image src={LeftArrow} alt="LeftArrow" width={100} height={100} className="w-[16px] h-[16px]"/>
                        <div className="text-[#222222] text-[16px] rubik_medium ">
                             Main Menu
                        </div>

                    </button>

                    {data?.map((item: any, index: any) => (
                        <div
                            key={index}
                            className=" border-[#E2E4E5] border-solid border-b w-[83%] m-auto  "
                            style={{ height: 'auto' }}
                        >
                            <TitleComponent
                                title={item.slug}
                                titleClass="text-[16px] rubik_semibold leading-[24px] mt-1"
                                containerClass=""
                            />
                            <div className="w-full mt-[12px] flex flex-col">
                                {item?.categories?.map((list: any, listIndex: number) => (
                                    <Link
                                        key={listIndex}
                                        href={`/${list?.slug}/`}
                                        className="hover:underline block text-[16px] rubik_regular leading-[24px] mb-[12px]"
                                    >
                                        {list?.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
