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
      <table className="min-w-full max-sm:hidden">
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
      <div className="sm:hidden flex flex-wrap justify-between gap-4 mt-6">
        {[footerLinks[2], footerLinks[1], footerLinks[0]].map((section, index) => (
          <div key={index} className="w-[48%]">
            <h3 className="text-base font-semibold mb-2">{section.header}</h3>
            <ul className="flex flex-col gap-1">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[14px] rubik_regular"
                    aria-label={`Go to ${link.label}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FooterLeft;
