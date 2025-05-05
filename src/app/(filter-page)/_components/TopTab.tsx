import { getIcon } from '@/components/image/Icon';
import { useSearchParams, useRouter, usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import FilterDropdown from '@/components/input/FilterDropdown';

function TopTab({ filterList, setListData, priceData, setPriceData, setSortBy, sortBy }: any) {
    const searchParams = useSearchParams();
    const params = useParams()
    const router = useRouter();
    const pathname = usePathname();

    const formatSearchParams = (searchParams: any): { key: string; value: string }[] => {
        if (!searchParams) return [];
        return Object.entries(Object.fromEntries(new URLSearchParams(searchParams)))
            .map(([key, value]) => {
                if (key === 'q') return null; // Skip search query
                if (key === 'min_price' || key === 'max_price') return null; // Skip price filters as they're handled separately

                // Handle comma-separated values
                const values = value.split(',');
                return values.map(val => ({
                    key,
                    slug: val,
                    value: val
                        .replace(/[_-]/g, ' ')
                        .trim()
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                }));

            })
            .filter(Boolean)
            .flat() as { key: string; value: string }[];
    };

    const removeFilter = (key: string, slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentValues = params.get(key)?.split(',') || [];
        const newValues = currentValues.filter(v => v !== slug.toLowerCase());

        if (newValues.length > 0) {
            params?.set(key, newValues.join(','));
        } else {
            params.delete(key);
        }

        // Update URL using Next.js router
        const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
        router.push(newUrl);
    };

    const removePathFilter = (path: string) => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPathSegments = pathSegments.filter(segment =>
            segment.toLowerCase() !== path.toLowerCase()
        );

        // If there are no segments left, go to home page
        if (newPathSegments.length === 0) {
            router.push('/');
            return;
        }

        // Otherwise, join the remaining segments
        const newPath = `/${newPathSegments.join('/')}`;
        router.push(newPath);
    };

    const options: any[] = [
        { label: 'Alphabetical', slug: 'a-z' },
        { label: 'Reverse Alphabetical', slug: 'z-a' },
        { label: 'Newest First', slug: 'newest' },
        { label: 'Oldest First', slug: 'oldest' },
        { label: 'Price Low to High', slug: 'low' },
        { label: 'Price High to Low', slug: 'high' },
    ];

    const formattedParams = formatSearchParams(searchParams?.toString());
    const pathSegments = pathname
        .split('/')
        .filter(Boolean)
        .filter(segment =>
            segment.toLowerCase() !== 'search' &&
            segment.toLowerCase() !== params?.primarySlug?.toLowerCase()
        );
        
        const formatHeading = (slug: string) => {
            return slug
              .replace(/[-_]/g, ' ') // replace - or _ with space
              .split(' ') // split into words
              .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
              .join(' ');
          };
    
      const heading =
      params?.primarySlug && params?.primarySlug !== 'search'
          ? formatHeading(params?.primarySlug)
          : null;
    
    console.log(formattedParams, "formattedParamsformattedParams");

    return (<>

        <div>
            {
                heading && <h1>{heading}</h1>
            }
        </div>


        <div className="flex justify-between py-3">
            <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                    {/* Display path segments as separate filters */}
                    {!pathname.includes('/search') && pathSegments.map((segment, index) => (
                        <div
                            key={`path-${index}`}
                            className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                        >
                            <div>{segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                            <button onClick={() => removePathFilter(segment)}>
                                {getIcon({ icon: "close_icon", className: "w-[8px]" })}
                            </button>
                        </div>
                    ))}

                    {/* Display formatted URL parameters */}
                    {formattedParams?.map((param: any, index: number) => (
                        <div
                            key={`${param.key}-${param.value}-${index}`}
                            className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                        >
                            <div>{param.value}</div>
                            <button onClick={() => removeFilter(param.key, param?.slug)}>
                                {getIcon({ icon: "close_icon", className: "w-[8px]" })}
                            </button>
                        </div>
                    ))}

                    {/* Display price filters */}
                    {priceData?.min_price !== "0" && priceData?.min_price !== "" && (
                        <div className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1">
                            <div>Min Price: {priceData?.min_price} AED</div>
                            <button onClick={() => setPriceData({ ...priceData, min_price: "0" })}>
                                {getIcon({ icon: 'close_icon', className: 'w-[8px]' })}
                            </button>
                        </div>
                    )}

                    {priceData?.max_price !== "0" && priceData?.max_price !== "" && (
                        <div className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1">
                            <div>Max Price: {priceData?.max_price} AED</div>
                            <button onClick={() => setPriceData({ ...priceData, max_price: "0" })}>
                                {getIcon({ icon: 'close_icon', className: 'w-[8px]' })}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='w-[160px] max-[480px]:hidden'>
                <FilterDropdown
                    setOption={setSortBy}
                    options={options}
                    selectedOption={sortBy}
                    title="Sort by"
                />
            </div>
        </div>
    </>

    );
}

export default TopTab;
