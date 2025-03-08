import React from 'react'

function FooterBottom() {
    const firstRowData = [
        { label: 'About us', link: '/about-us/' },
        { label: 'Customer Service', link: '/customer-service' },
        { label: 'Privacy policy', link: '/privacy-policy' },
        { label: 'Site map', link: '/site-map' },
        { label: 'Advanced search', link: '/advanced-search' },
        { label: 'Contact us', link: '/contact-us' }
    ];



    return (
        <div className="text-white max-sm:text-[12px] max-lg:text-[14px] text-[15px] rubik_regular pt-5">
            <div className="flex justify-center gap-6 mb-4 max-md:gap-3 max-sm:flex-wrap">
                {firstRowData.map((item, index) => (
                    <a key={index} href={item.link} className="font-normal ">
                        {item.label}
                    </a>
                ))}
            </div>

            {/* <div className="flex justify-center gap-6 mb-4">
                {icons.map((iconData:any, index) => (
                    <div key={index}>
                        {getIcon(iconData)}
                    </div>
                ))}
            </div> */}

            <div className="flex justify-center items-center inter_regular">
                © Adarc Computer. All rights reserved.
            </div>
        </div>
    )
}

export default FooterBottom
