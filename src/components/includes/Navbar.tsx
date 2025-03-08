import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import TopSection from "../navbar/TopSection";
import MiddleSection from "../navbar/MiddleSection";
import BottomSection from "../navbar/BottomSection";
import Breadcrumbs from "../navbar/Breadcrumbs";

function Navbar() {
  const pathname = usePathname();
  const [isNavbarTopVisible, setIsNavbarTopVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 44) {
          setIsNavbarTopVisible(false); 
      } else {
          setIsNavbarTopVisible(true); 
      }

      setLastScrollY(currentScrollY);
  };

  useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
          window.removeEventListener("scroll", handleScroll);
      };
  }, [lastScrollY]);


  return (
    <div className={ `z-50 w-full fixed   navbar ${
      isNavbarTopVisible ? "top-0" : " -top-[44px]"
  }`}>
      <TopSection />
      <MiddleSection />
      {
        pathname?.includes("/login")  || pathname?.includes("/signup") ? '' : <BottomSection />
      }


      {/* {pathname !== "/" && pathname !== "/wishlist" && pathname !== "/cartPage" && <Breadcrumbs />} */}


    </div>
  );
}

export default Navbar;
