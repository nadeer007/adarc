import { getIcon } from '@/components/image/Icon';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';  // Add this import
import React from 'react';
import FilterDropdown from '@/components/input/FilterDropdown';




function TopTab({ filterList, setListData, priceData, setPriceData, setSortBy, sortBy }: any) {
    // const capitalizeFirstLetter = (str: string) => {
    //     if (!str) return ''; // Handle undefined or null gracefully
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // };
    const searchParams = useSearchParams();  // Fixed typo
    const formatSearchParams = (searchParams: any) => {
        if (!searchParams) return '';
        return Object.entries(Object.fromEntries(new URLSearchParams(searchParams)))
            .map(([key]) =>
                key
                    .replace(/[_-]/g, ' ') // Replace underscores and dashes with spaces
                    .trim()
                    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
            )
            .join(', ');
    };
    const searchQuery = searchParams.get('q');
    const removeFilter = (filterId: string, itemName: string) => {
        setListData((prevList: any[]) =>
            prevList.map((filter) =>
                filter.id === filterId
                    ? {
                        ...filter,
                        filter_data: filter.filter_data.map((item: any) =>
                            item.name === itemName
                                ? { ...item, is_selected: false } // Only deselect the matched item
                                : item
                        ),
                    }
                    : filter
            )
        );
    };


    const options = [
        { label: 'Alphabetical', slug: 'alphabetical' },
        { label: 'Newest First', slug: 'newest' },
        { label: 'Oldest First', slug: 'oldest' },
        { label: 'Price Low to High', slug: 'price_low_high' },
        { label: 'Price High to Low', slug: 'price_high_low' },
    ];

    return (
        <div className="flex justify-between py-3">
            <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        {filterList
                            ?.filter(
                                (filter: any) =>
                                    Array.isArray(filter?.filter_data) &&
                                    filter.filter_data.some((item: any) => item.is_selected)
                            )
                            .map((filter: any) => (
                                filter.filter_data
                                    .filter((item: any) => item.is_selected)
                                    .map((selectedItem: any) => (
                                        <div
                                            key={`${filter.id}-${selectedItem.name}`}
                                            className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                                        >
                                            <div>{selectedItem.name}</div>
                                            <button onClick={() => removeFilter(filter.id, selectedItem.name)}>
                                                {getIcon({ icon: "close_icon", className: "w-[8px]" })}
                                            </button>
                                        </div>
                                    ))
                            ))}
                    </div>

                </div>
                {searchParams && searchParams.toString() && !searchQuery &&
                    <div
                        key="searchParam"  // Changed to avoid reusing `filter.id`
                        className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                    >
                        <div>{formatSearchParams(searchParams.toString())}</div>
                        <Link href="/adrcfr">
                            {getIcon({ icon: 'close_icon', className: 'w-[8px]' })}
                        </Link>
                    </div>}
                {
                    priceData?.min_price !== "0" && priceData?.min_price !== "" &&
                    <div
                        key="searchParam" // Changed to avoid reusing `filter.id`
                        className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                    >
                        <div>Min Price:{priceData?.min_price} AED</div>
                        <button onClick={() => setPriceData({ ...priceData, min_price: "0" })}>
                            {getIcon({ icon: 'close_icon', className: 'w-[8px]' })}
                        </button>
                    </div>
                }

                {
                    priceData.max_price !== "0" && priceData.max_price !== "" &&
                    <div
                        key="maxSearchParam" // Changed to avoid reusing `filter.id`
                        className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                    >
                        <div>Max Price:{priceData?.max_price} AED</div>
                        <button onClick={() => setPriceData({ ...priceData, max_price: "0" })}>
                            {getIcon({ icon: 'close_icon', className: 'w-[8px]' })}
                        </button>
                    </div>
                }


            </div>
            <div className='w-[160px] max-[480px]:hidden'>
                <FilterDropdown
                    setOption={setSortBy}
                    options={options}
                    selectedOption={sortBy}
                    title="Sort by"
                /></div>

        </div>
    );
}

export default TopTab;
