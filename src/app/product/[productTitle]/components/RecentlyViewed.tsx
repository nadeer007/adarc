"use client";
import ProductCard from "@/components/includes/ProductCard";
import RectangleSection from "@/components/includes/RectangleSection";
import fetchApiData from "@/config/fetch-api-data";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function RecentlyViewed({ className }: any) {
	const getrecentData = async () => {
		const response = await fetchApiData<any>("products/list-products/");
		setRecentView(response?.data);
	};

	const [recentView, setRecentView] = useState([]);

	useEffect(() => {
		getrecentData();
	}, []);

	const slider_settings = {
		slidesToShow: 6,
		slidesToScroll: 2,
		responsive: [
			{
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

	return (
		<>
			<div className={`${className} hidden md:block  `}>
				<RectangleSection
					className=""
					datas={recentView}
					// moreItems={false}
					sectionTitle={"Recently Viewed"}
					slider_settings={slider_settings}
				/>
			</div>
      <div className="md:hidden "> 
      <h2 >Similiar Products</h2>
      <div className="mt-2 flex  overflow-x-scroll px-[10px] py-[5px] gap-[4px]  ">
				{recentView?.map((data: any, index: any) => (
					<Link
						key={index}
						href={`/product/${data?.slug}`}
						className="min-w-[47.5%]">
						<ProductCard data={data} />
					</Link>
				))}
			</div>
      </div>

			
		</>
	);
}

export default RecentlyViewed;
