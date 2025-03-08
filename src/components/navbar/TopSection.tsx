import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getIcon } from '../image/Icon';
import strings from '@/utils/string';
import Cookies from 'js-cookie';
import DropDownButton from '../buttons/DropDownButton';
import useZustandStore from '@/store/useStore';

declare global {
  interface Window {
    loadGoogleTranslate: () => void;
    google: any;
  }
}

function TopSection() {
  

  const language = Cookies.get('googtrans');
  const [isDropActive, setDropActivate] = useState(false)
  const [selectedEmirate, setSelectedEmirate] = useState('Abu dhabi')
  const { deliveryLocation,setDeliveryLocation} = useZustandStore()

  const links = [
    { href: "/", label: strings.navtopsection.order_tracking },
    { href: "/", label: strings.navtopsection.about_us },
    { href: "/", label: strings.navtopsection.faq },
    { href: "/", label: strings.navtopsection.contact_us },
  ];
  useEffect(() => {
    // Load Google Translate script dynamically
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate";
    script.async = true;
    document.body.appendChild(script);

    // Attach Google Translate initialization function to the window object
    window.loadGoogleTranslate = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar,ru"
          // Restrict to English, Arabic, and Russian
        },
        "google_element"
      );
      //     const observer = setInterval(() => {
      //   const lang = window.google.translate.TranslateElement.prototype.getLanguage();
      //   console.log("Current language: ", lang);
      //   // You can use `setState` here to update the UI with the current language
      // }, 1000);

      // // Cleanup the observer when component unmounts
      // return () => clearInterval(observer);
    };

    return () => {
      document.body.removeChild(script); // Cleanup script when the component unmounts
    };
  }, []);


  return (
    <div className={` bg-[#1F1F1F] h-[44px] text-[#fafafa] text-[12px] flex justify-between `}>
      <div className='navbarWrapper h-[44px] flex justify-between items-center px-[48px]'>
        <div className='flex gap-6 '>

          <div
            id="google_element"
            style={{
              height: "25px",
              overflow: "hidden",
              fontSize: "larger",
              
            }}
          ></div>
          <div className='flex items-center gap-[2px]'>
            <h6 className='open_sansregular'>Ship to</h6>
            <div>{getIcon({ icon: 'flag', className: 'w-[32px]' })}</div>
            <div>
              <DropDownButton
              elbrateMenu ={true}
              setActive={setDropActivate}
              SetselectedItem={setDeliveryLocation}
              selectedItem={deliveryLocation}
              rotate_angle={'-rotate-180'}
                onclick={() => setDropActivate(!isDropActive)}
                isActive={isDropActive}
                dropWhite={true}
                titleClass='text-white rubik_medium leading-[18px] text-[12px]' title={deliveryLocation} />
            </div>
          </div>
        </div>
        <div className='flex gap-6 max-md:hidden'>
          {links.map((link, index) => (
            <Link aria-label={`go to ${link.label}`} key={index} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

export default TopSection;
