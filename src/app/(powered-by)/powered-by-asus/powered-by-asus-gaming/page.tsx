"use client"
import Wrapper from '@/components/includes/Wrapper';
import fetchApiData from '@/config/fetch-api-data';
import React, { useEffect, useState } from 'react';
import ProductSection from '../../_components/ProductSection';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const [paginationData, setPagination] = useState({})
  const [data, setData] = useState<any>(null);
  const page = searchParams.get('page') || 1;
  const getData = async () => {

    const response = await fetchApiData<any>(`products/list-products?page=${page}`);
    console.log(response, "response");

    if (response.status_code === 6000) {
      setData(response?.data);
      setPagination(response?.pagination_data)
    } else if (response.status_code === 6001) {
      setData(null);
      setPagination({})
    }
  };

  useEffect(() => {
      getData();
  
    }, [searchParams]);

  return (
    <Wrapper className='max-xl:pt-[120px] max-mc:px-4 max-sm:px-2 max-sl:px-1 max-sk:px-[2px]'>
      <h1 className='max-[480px]:px-[15px] w-full text-[35px] font-semibold mb-4 '>Powered by ASUS: Gaming</h1>
      <div className="max-[480px]:px-[15px] w-full">
        <div className="">
          <div className="">
            <picture>
              <source
                type="image/webp"
                srcSet="https://adarccomputer.com/media/webp_image/catalog/category/gaming.webp"
              />
              <source
                type="image/png"
                srcSet="https://adarccomputer.com/media/catalog/category/gaming.png"
              />
              <img
                src="https://adarccomputer.com/media/catalog/category/gaming.png"
                alt="Powered by ASUS: Gaming"
                title="Powered by ASUS: Gaming"
                className="image"
              />
            </picture>
          </div>
        </div>

        <div className="">
          <div className="">
            <section className=" text-center py-5">
              <div className="row justify-center">
                <div className="md:w-4/5 mx-auto">
                  <div className=' w-full flex items-center justify-center'>
                    <div className='w-[350px] '>
                      <picture className=''>
                        <source
                          type="image/webp"
                          srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/image_2024_07_08T08_24_15_128Z-1.webp"
                        />
                        <source
                          type="image/png"
                          srcSet="https://adarccomputer.com/media/wysiwyg/image_2024_07_08T08_24_15_128Z-1.png"
                        />
                        <img
                          src="https://adarccomputer.com/media/wysiwyg/image_2024_07_08T08_24_15_128Z-1.png"
                          alt="Powered by ASUS"
                          className="img-fluid mb-4"
                        />
                      </picture>

                    </div>


                  </div>

                  <h2 className="text-red-600 mb-4 text-2xl font-semibold">
                    Custom PCs with World-class Hardware
                  </h2>
                  <p className="text-gray-600 text-[16px]" >
                    Powered by ASUS is a global program across more than 40 countries providing the very best customized systems.
                    These tailored rigs feature a best-selling ASUS motherboard and graphics card, with a wide array of industry-leading gaming monitors, routers, CPU coolers, power supplies, chassis, and peripherals available for a seamless fusion of synchronized features and tuned performance.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>


      <ProductSection data={data} paginationData={paginationData}/>
    </Wrapper>
  );
}

export default Page;
