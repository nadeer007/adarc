import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/images/logo.svg";
import FooterLeft from "./FooterLeft";
import FooterBottom from "./FooterBottom";
import DownloadApp from "./DownloadApp";
import Wrapper from "../includes/Wrapper";
import { div } from "framer-motion/client";

function Footer() {
	return (
		<div className="bg-PRIMARY_BG">
			<Wrapper className="  w-full text-[#E3E8EF] !py-[24px] ">
				<div className="w-full flex justify-between max-[850px]:flex-col  ">
					<div className="w-[250px] flex p-1 items-baseline mr-[20px] max-sm:hidden max-[850px]:ml-[12px] max-[850px]:mb-[12px]">
						<Image
							src={logo}
							alt="logo"
							height={100}
							width={100}
							className="w-[250px] max-xl:w-[200px]"
							loading="lazy"
						/>
					</div>
					<div className="flex gap-[80px]  max-lg:flex-col  max-xl:gap-[50px] max-lg:gap-[30px] ">
						<FooterLeft />
						{/* <DownloadApp /> */}
					</div>
				</div>
				<FooterBottom />
			</Wrapper>
		</div>
	);
}

export default Footer;
