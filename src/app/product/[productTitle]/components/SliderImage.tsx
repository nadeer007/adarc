"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function SliderImage({ Product }: any) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Calculate which image is currently in view
	const handleScroll = () => {
		if (!containerRef.current) return;

		const scrollLeft = containerRef.current.scrollLeft;
		const containerWidth = containerRef.current.offsetWidth;

		const index = Math.round(scrollLeft / containerWidth);
		setCurrentIndex(index);
	};

	// Optional: snap scroll with smooth behavior when clicking dots (if implemented later)
	const scrollToIndex = (index: number) => {
		if (!containerRef.current) return;

		containerRef.current.scrollTo({
			left: containerRef.current.offsetWidth * index,
			behavior: "smooth",
		});
	};

	// Attach scroll event
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener("scroll", handleScroll, { passive: true });
		return () => container.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div>
			<div
				ref={containerRef}
				className="no-scrollbar flex items-center min-w-full w-full overflow-x-scroll scroll-snap-x mandatory h-[400px] snap-x snap-mandatory"
			>
				{Product?.attachments.map((image: any, index: number) => (
					<div
						key={index}
						className="w-full min-w-full h-[400px] flex items-center justify-center snap-center"
					>
						
						<Image
							className="w-full min-w-full h-full object-contain"
							src={image?.attachment}
							alt={index ? `productImage-${index}`: "products"}
							width={100}
							height={100}
						/>
					</div>
				))}
			</div>
			<div className="flex items-center justify-center w-full gap-[8px] mt-4">
				{Product?.attachments.map((_: any, index: number) => (
					<div
						key={index}
						className={`rounded-full h-[8px] w-[8px] transition-all duration-300 ${
							currentIndex === index ? " bg-[#6D7277] scale-125" : "border border-solid border-[#C5CBD5]"
						}`}
					></div>
				))}
			</div>
		</div>
	);
}
