import ProductCard from '@/components/includes/ProductCard'
import React, { Suspense } from 'react'
import TopTab from './TopTab';
import { useSearchParams } from 'next/navigation';
import EmptySection from '@/components/emptyContainer/EmptySection';

function RightcardSection({
    filteredData,
    filterList,
    setSortBy,
    setListData,
    priceData,
    setPriceData,
    sortBy
}: {
    filteredData: any,
    filterList: any,
    setListData: any,
    priceData: any,
    setPriceData: any,
    setSortBy: any
    sortBy: any

}) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q');
    return (

        <div className='w-full block max-[480px]:px-[15px]'>
            <TopTab
                filterList={filterList}
                setListData={setListData}
                priceData={priceData}
                setPriceData={setPriceData}
                setSortBy={setSortBy}
                sortBy={sortBy}
            />
            <div className='block'>
                <h2 className='rubik_medium text-xl mb-3'>
                    {searchQuery ? `Search results for: "${searchQuery}"` : ""}
                </h2>

                {
                    filteredData?.length > 0 ? <div className='flex flex-wrap gap-[1%]'>
                        {filteredData?.map((data: any, index: any) => (
                            <ProductCard key={index} data={data} className=' w-[24%] max-lg:w-[32%] mb-2 max-sm:w-[49%]' />
                        ))}

                    </div> :
                        <EmptySection title={'No Data Found!'} button={false} />
                }


            </div>
        </div>

    )
}

export default RightcardSection
