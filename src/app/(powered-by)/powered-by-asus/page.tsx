// components/Page.js
import Image from 'next/image';
import Link from 'next/link';
import Wrapper from '@/components/includes/Wrapper'


export default function Page() {
  return (
    <Wrapper className="">
     <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <picture>
          <source
            type="image/webp"
            srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/ssd/1200_612_1.webp"
          />
          <source
            type="image/jpg"
            srcSet="https://adarccomputer.com/media/wysiwyg/ssd/1200_612_1.jpg"
          />
          <img
            src="https://adarccomputer.com/media/wysiwyg/ssd/1200_612_1.jpg"
            alt="Powered by ASUS Banner"
            className="w-full h-auto"
          />
        </picture>
      </div>

      <section className="bg-black text-white py-8 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Powered by ASUS, Dominate with the best
          </h2>
          <p className="text-lg">
            Powered by ASUS is a global program across more than 40 countries and involves over 500 partners who provide the very best customized systems. These tailored rigs feature a best-selling ASUS motherboard and graphics card, with a wide array of industry-leading gaming monitors, routers, CPU coolers, power supplies, chassis, and peripherals available for a seamless fusion of synchronized features and tuned performance.
          </p>
        </div>
      </section>

      <section className="py-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="https://adarccomputer.com/gaming-products/gaming-desktops/powered-by-asus/powered-by-asus-gaming.html"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Powered by ASUS: Gaming
          </Link>
          <Link
            href="https://adarccomputer.com/gaming-products/gaming-desktops/powered-by-asus/powered-by-asus-content-creation.html"
            className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            Powered by ASUS: Content Creation
          </Link>
        </div>
      </section>
    </div>
    </Wrapper>
  );
}
