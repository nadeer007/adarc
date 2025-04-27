import Link from 'next/link';
import React from 'react';

function FooterLeft() {
  const footerLinks = [
    {
      header: 'Help & Customer Care',
      links: [
        { label: 'Payment Terms', href: '/payment-terms' },
      ],
    },
    {
      header: 'Customer Service',
      links: [
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Warranty & Repairs Policy', href: '/warranty-&-repairs-policy' },
        { label: 'Shipping Policy', href: '/shipping-policy' },
        { label: 'Online Returns Policy', href: '/return-policy' },
        { label: 'Terms And Conditions', href: '/terms-and-conditions' },
      ],
    },
    {
      header: 'My Account',
      links: [
        { label: 'My Account', href: '/my-account' },
        { label: 'Checkout', href: '/checkout' },
        { label: 'Shopping Cart', href: '/shopping-cart' },
        { label: 'Wishlist', href: '/wishlist' },
      ],
    },
  ];

  return (
    <div className=" ">
      <table className="min-w-full">
        <thead>
          <tr>
            {footerLinks.map((section, index) => (
              <td key={index} className="py-3 px-4 text-left font-semibold  max-lg:px-2">
                {section.header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(
            { length: Math.max(...footerLinks.map(section => section.links.length)) },
            (_, rowIndex) => (
              <tr key={rowIndex}>
                {footerLinks.map((section, colIndex) => (
                  <td key={colIndex} className="py-3 px-4 text-left font-normal max-lg:py-2 max-lg:px-2 max-sm:py-1 max-md:px-2">
                    {section.links[rowIndex] && (
                      <Link
                        href={section.links[rowIndex].href}
                        className="text-[15px] rubik_regular max-sm:text-[12px] max-lg:text-[14px]"
                        aria-label={`Go to ${section.links[rowIndex].label}`}
                      >
                        {section.links[rowIndex].label}
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FooterLeft;
