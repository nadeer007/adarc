import PaginationComponent from '@/app/(filter-page)/_components/PaginationComponent';
import EmptySection from '@/components/emptyContainer/EmptySection';
import ProductCard from '@/components/includes/ProductCard';
import { cn } from '@/utils/utils';
import React from 'react';

function ProductSection({ data, paginationData, cardStyle }: {
  data: any,
  paginationData: any, cardStyle?: any
}) {
  return (
    <div className='w-full block max-[480px]:px-[15px]'>
      <div className='block'></div>
      {data?.length > 0 ? (
        <div className='flex flex-wrap gap-[1%]'>
          {data.map((item: any, index: number) => (
            <ProductCard
              key={index}
              data={item}
              className={cn('w-[24%] max-lg:w-[32%] mb-2 max-sm:w-[49%]', cardStyle)}
            />
          ))}
        </div>
      ) : (
        <EmptySection title='No Data Found!' button={false} />
      )}

      {/* Pagination should be inside the main wrapper */}
      <div className='w-full flex justify-center items-center py-4'>
        <PaginationComponent paginationData={paginationData} />
      </div>
    </div>
  );
}

export default ProductSection;
