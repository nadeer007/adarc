import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import DropDownButton from '../buttons/DropDownButton';
import TitleComponent from '@/app/[productTitle]/components/TitleComponent';
import strings from '@/utils/string';
import Image from 'next/image';
import Icon from '../includes/Icon';
import Menu from '../../../public/assets/icons/menu.svg';
import MenuDropDown from '../../../public/assets/icons/dropMenu.svg';
import { cn } from '@/utils/utils';
// import useStore from '@/store/useStore';
import { useRouter } from 'next/navigation';
import HamburgerMenu from '../hamburger/HamburgerMenu';
import useZustandStore from '@/store/useStore';

function BottomSection() {
  const menuRef = useRef(null);
  const { accessToken, clearAccessToken } = useZustandStore();
  const isLoggedIn = Boolean(accessToken);
  const [isClient, setIsClient] = useState(false);
  const [navMenuActive, setNavMenuActive] = useState(false);

  const router = useRouter();
  const onClose = () => {
    setNavMenuActive(false);
  };
  // Ensure the component renders only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const logout = () => {
    clearAccessToken();
    router.push('/');
  };

  useEffect(() => {
    const html = document.documentElement;
    if (navMenuActive) {
      html.classList.add("modal-enabled");
    } else {
      html.classList.remove("modal-enabled");
    }

    return () => {
      html.classList.remove("modal-enabled");
    };
  }, [navMenuActive]);

  const links = [
    { label: 'Best Deals', href: '/adrcfr?best-deals=true' },
    { label: 'Trending', href: '/adrcfr?trending=true' },
    { label: 'New Releases', href: '/adrcfr?new_arrivals=true' },
    { label: 'Shop by Brands', href: '/adrcfr?brands=true' },
    { label: 'Powered by', href: '/adrcfr?best-deals=true' },
  ];



  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose(); // Call the onClose function when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose])

  return (
    <>
      {navMenuActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
          onClick={() => setNavMenuActive(false)}
        />
      )}

      <div
        ref={menuRef}
        className={cn(
          'fixed top-0 h-full w-[330px] bg-white m shadow-md z-50 overflow-hidden transition-all duration-500 ease-in-out',
          navMenuActive ? 'left-0' : '-left-[500px]'
        )}
      >
        <HamburgerMenu />
      </div>

      <div className="bg-white border-b border-[#C5CBD5] border-solid font-normal text-[16px] rubik_regular max-sm:hidden">
        <div className="navbarWrapper flex px-[48px] items-center">
          {/* Menu button */}
          <div>
            <button
              onClick={() => setNavMenuActive(!navMenuActive)}
              className="hover:opacity-[.7] flex flex-row items-center gap-1"
            >
              <div>
                <Icon src={Menu} alt="menuIcon" width={'24px'} height={'24px'} />
              </div>
              <TitleComponent
                title={strings.button.menu}
                titleClass="text-[16px] leading-[20px] max-[980px]:text-[13px]"
              />
              <div
                className={cn(
                  'transition-transform duration-300',
                  navMenuActive ? '-rotate-180' : 'rotate-0'
                )}
              >
                <Icon
                  src={MenuDropDown}
                  alt="menuIcon"
                  width={'24px'}
                  height={'24px'}
                />
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-4">
            <TitleComponent title="|" titleClass="rubik_semibold text-xl " />
          </div>

          {/* Links */}
          <div className="h-[44px] w-full flex justify-between items-center gap-5">
            <div className="flex gap-6">
              {links.map((link, index) => (
                <Link
                  className="hover:opacity-[.7] text-base leading-5 rubik_regular max-[980px]:text-[13px]"
                  key={index}
                  href={link?.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Conditionally render logout button only after client-side rendering */}
          {isClient && isLoggedIn && (
            <button onClick={logout} className="hover:opacity-[.7] text-red-500 max-[980px]:text-[13px]">
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default BottomSection;
