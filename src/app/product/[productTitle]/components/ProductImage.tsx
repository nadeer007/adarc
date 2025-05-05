"use client";
import { cn } from "@/utils/utils";
import Image from "next/image";
import React, { useState } from "react";
import ShareMenu from "./ShareMenu";
import { FaRegShareSquare } from "react-icons/fa";
import FullScreenImage from "./FullScreenImage";

export default function ProductImage({ data }: any) {
	const [active, setActive] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (index: number) => {
		// setActive(index);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const [openShare, setOpenShare] = useState(false);

	return (
		<div className="w-[100%] px-[16px] py-[24px] items-center relative ">
			{openShare && (
				<ShareMenu
					openShare={openShare}
					setOpenShare={setOpenShare}
					isDesktop={true}
				/>
			)}

			<button
				onClick={() => openModal(active)}
				className=" flex w-[100%]  h-[500px] max-h-[500px]  justify-center items-center mb-[12px] rounded-[4px] overflow-hidden ">
				{data?.attachments && (
					<Image
						className="flex w-full h-full object-contain "
						width={400}
						height={400}
						src={data?.attachments?.[active]?.attachment}
						alt="productImage"
						// objectFit="cover"
						objectPosition="center"
					/>
				)}
			</button>
			<div className="flex flex-row overflow-x-scroll no-scrollbar w-[100%] gap-[16px] bg">
				{data?.attachments?.map((item: any, index: any) => (
					<button
						key={index}
						onClick={() => {
							setActive(index);
						}}
						onMouseEnter={() => setActive(index)}
						className={cn(
							"flex justify-center items-center w-[64px] h-[64px] min-w-[64px] overflow-hidden  rounded-[4px] border-solid border-BLACK",
							active == index
								? "border-BLACK border-2"
								: "border-select_border_grey border"
						)}>
						{item?.attachment && (
							<Image
								className=" w-[90%] h-[90%] object-contain"
								src={item?.attachment}
								alt="productImages"
								width={400}
								height={400}
							/>
						)}
					</button>
				))}

				<button
					className="absolute top-0 right-0 w-[24px] h-[24px] flex items-center justify-center "
					onClick={() => setOpenShare(!openShare)}>
					<FaRegShareSquare size="25" />
				</button>
			</div>
		{isModalOpen && <FullScreenImage data={data} openModal={openModal} isActive={active} closeModal={closeModal} />}

		</div>
	);
}
