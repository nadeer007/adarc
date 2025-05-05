"use client";
import React, { useRef, useEffect, useState } from "react";
import productData from "../../../../data.json";
import Image from "next/image";
import Arrow from "../../../../public/assets/icons/whitearrow.svg";
import Slider from "react-slick";
import ScrollIcon from "@/components/includes/ScrollIcon";
import { GrNext } from "react-icons/gr";
import { div } from "framer-motion/client";

export default function MainBanner() {
	const desktopRef = useRef<HTMLDivElement>(null);
	const mobileRef = useRef<HTMLDivElement>(null);
	const [direction, setDirection] = useState<"right" | "left">("right");
	const [isMobile, setIsMobile] = useState(false);

	// Detect screen size
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
		};

		handleResize(); // Initial check
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Auto-scroll logic
	const scrollBanner = () => {
		const container = isMobile ? mobileRef.current : desktopRef.current;
		if (container) {
			const containerWidth = container.offsetWidth;

			if (direction === "right") {
				container.scrollLeft += containerWidth;
				if (
					container.scrollLeft + containerWidth >=
					container.scrollWidth
				) {
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

	const handleClick = (sign: string) => {
		const container = isMobile ? mobileRef.current : desktopRef.current;
		if (container) {
			const containerWidth = container.offsetWidth;
			container.scrollLeft +=
				sign === "+" ? containerWidth : -containerWidth;
		}
	};

	useEffect(() => {
		const interval = setInterval(scrollBanner, 3000); // Adjust delay as needed
		return () => clearInterval(interval);
	}, [direction, isMobile]);

	const CustomNextArrow = (props: any) => {
		const { onClick } = props;
		return (
			<div
				onClick={onClick}
                className="h-[50px] cursor-pointer hidden w-[50px] min-h-[50px] min-w-[50px] md:flex items-center justify-center rounded-full absolute right-3 top-1/2 -translate-y-1/2 z-10 shadow-xl bg-[#f5f5f5]">
				<GrNext size='25' />
			</div>
		);
	};

	const CustomPrevArrow = (props: any) => {
		const { onClick } = props;
		return (
			<div
				onClick={onClick}
				className="h-[50px] hidden cursor-pointer rotate-180 w-[50px] min-h-[50px] min-w-[50px] md:flex items-center justify-center rounded-full absolute left-3 top-1/2 -translate-y-1/2 z-10 shadow-xl bg-[#f5f5f5]">
				<GrNext size='25' />
                </div>
		);
	};

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		// autoplay: true,
		autoplaySpeed: 2000,
		cssEase: "linear",
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
	};
	return (
		<div className="w-full   relative">
			

			{/* Desktop Banner */}
            <div className="w-full hidden sm:block ">
            {productData.mainBanner && <Slider {...settings} className="overflow-hidden ">
				{productData.mainBanner.map((item, index) => (
					<div key={index} className="w-full max-h-[302px] h-[302px] flex items-center justify-center">
						<Image
							src={item.image}
							alt="banner"
							width={730}
							height={302}
							className="object-cover w-full h-full"
						/>
					</div>
				))}
			</Slider>}
            </div>
			

			{/* <div
				ref={desktopRef}
				className="hidden sm:flex overflow-x-scroll no-scrollbar w-full min-h-[302px] h-full customer_slider_panel scroll-smooth">
				{productData.mainBanner.map((item, index) => (
					<div key={index} className="flex-shrink-0 w-full h-full">
						<Image
							src={item.image}
							alt="banner"
							width={730}
							height={302}
							className="object-cover w-full h-full"
						/>
					</div>
				))}
			</div> */}
			{/* Mobile Banner */}
			<div
				ref={mobileRef}
				className="flex sm:hidden overflow-x-scroll no-scrollbar w-full customer_slider_panel">
				{productData.mainBannerMobile.map((item, index) => (
                    <div key={index} className="scroll_image w-full h-[200px] min-h-[200px] flex-shrink-0 flex">
                        <Image
						
						src={item.image}
						alt="banner"
						width={335}
						height={160}
						className=" w-full h-[200px] min-h-[200px]  "
					/>
                    </div>
					
				))}
			</div>
		</div>
	);
}
