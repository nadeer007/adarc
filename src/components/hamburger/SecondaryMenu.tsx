import React from "react";
import TitleComponent from "@/app/product/[productTitle]/components/TitleComponent";
import Link from "next/link";
import Image from "next/image";

export default function SecondaryMenu({ data, setActiveMegaMenu, setActiveIndex }: any) {
    console.log(data,"datadatadatadata");
    
    return (
        <>
            <div
                // onMouseLeave={() => {
                //     setActiveMegaMenu(false);
                //     setActiveIndex(null)
                // }}
                className=" w-full rounded-tl-[6px] rounded-bl-[6px]   h-full relative   flex flex-col  ">
                <div className="flex flex-col  gap-[12px] items-start  ">

                   
                    <div className="overflow-y-scroll">

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
            </div>
        </>
    );
}
