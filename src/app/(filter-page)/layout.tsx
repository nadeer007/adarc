"use client"
import Wrapper from "@/components/includes/Wrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LeftFilterSection from "./_components/LeftFilterSection";
import { useEffect, useRef, useState } from "react";
import BottomMobileFilter from "./_components/BottomMobileFilter";
import SortbyMobileFilter from "./_components/SortbyMobileFilter";
import fetchApiData from "@/config/fetch-api-data";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [filterList, setListData] = useState<any[] | null>([]);
    const [sortOption, setSortOption] = useState<string | null>(null);

    const [priceData, setPriceData] = useState({
        min_price: "0",
        max_price: "0"
    })
    console.log(filterList, "filterListfilterList");
    const searchParams = useSearchParams();
    const router = useRouter(); // initialize router
    const pathname = usePathname();
    const priceFilterRef = useRef<{ applyFilter: () => void } | null>(null);
    const [tempfilterList, setTempListData] = useState<any[] | null>(filterList);
    const [activeFilter, setActiveFilter] = useState(false)

    const [activeType, setActiveType] = useState<'sort-by' | 'filter'>('filter');
    const getListData = async () => {
        const response = await fetchApiData<any>(`products/list-filters`);
        let listData = response?.data || [];

        const params = new URLSearchParams(searchParams.toString());

        listData = listData.map((filter: any) => {
            if (filter.slug !== 'price') {
                const selectedSlugs = params.get(filter.slug)?.split(',') || [];

                const updatedFilterData = filter.filter_data.map((item: any) => ({
                    ...item,
                    is_selected: selectedSlugs.includes(item.slug),
                }));

                return { ...filter, filter_data: updatedFilterData };
            }
            return filter;
        });

        setListData(listData);

        // 👇 Handle price separately
        const minPriceFromUrl = params.get('min_price') || "0";
        const maxPriceFromUrl = params.get('max_price') || "0";

        setPriceData({
            min_price: minPriceFromUrl,
            max_price: maxPriceFromUrl
        });
    };
    const params = new URLSearchParams(searchParams.toString());

    const handleSortClick = (option: { slug: string }) => {
        setSortOption(option.slug);
        setActiveFilter(false);

        // Update URL with sortby parameter
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('sortby', option.slug);  // Set the sortby slug in the URL
        router.push(`${pathname}?${queryParams.toString()}`);
    };
    const handleApply = () => {
        console.log('Apply button clicked!');
        setListData(tempfilterList)
        setActiveFilter(false);
        if (priceFilterRef.current) {
            priceFilterRef.current.applyFilter();
        }
    };
    useEffect(() => {
        setTempListData(filterList)

    }, [filterList]);

    useEffect(() => {
        getListData();
    }, []);
    useEffect(() => {
    
        const sortby = params.get('sortby');

        if (sortby) {
            setSortOption(sortby);
        }
    }, [searchParams]);

    // NEW useEffect to update the URL when filterList changes
    useEffect(() => {
        if (!filterList) return;

        const queryParams: string[] = [];

        filterList.forEach((filter) => {
            if (filter.slug !== 'price') {
                const selectedSlugs = filter.filter_data
                    .filter((item: any) => item.is_selected)
                    .map((item: any) => item.slug)
                    .join(',');

                if (selectedSlugs) {
                    queryParams.push(`${filter.slug}=${selectedSlugs}`);
                }
            }
        });

        // You can also add price filter if needed
        if (priceData.min_price !== "0" || priceData.max_price !== "0") {
            queryParams.push(`min_price=${priceData.min_price}`);
            queryParams.push(`max_price=${priceData.max_price}`);
        }
        if (sortOption) {
            queryParams.push(`sort=${sortOption}`);
        }
        const q = params.get('q');
        if (q !== null) {
            queryParams.push(`q=${q}`);
        }
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        
        router.push(`${pathname}${queryString}`);
    }, [filterList, priceData, sortOption, pathname, router]);

    return (
        <div className='min-h-[80vh]'>
            <Wrapper className='max-[480px]:px-0 max-sm:pt-[115px]' >
                <div className='w-full flex mt-[12px] max-[480px]:relative'>
                    <LeftFilterSection
                        filterList={filterList}
                        setListData={setListData}
                        priceData={priceData}
                        setPriceData={setPriceData}
                    />
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
                <div className="w-full hidden max-[480px]:block max-[480px]:sticky bottom-0">
                    {activeFilter && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setActiveFilter(false)}></div>
                    )}

                    <div
                        className={`relative z-30 transition-all duration-300 ease-in-out rounded-t-[6%] overflow-hidden bg-[#fff] ${activeFilter ? 'max-h-[70vh]' : 'max-h-0'}`}
                    >
                        <div className='text-center py-3'>{activeType.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</div>

                        {activeType === 'sort-by' ? (
                            <SortbyMobileFilter
                                selectedOption={sortOption}
                                setSelectedOption={setSortOption}
                                handleClick={handleSortClick}
                            />
                        ) : (
                            <BottomMobileFilter
                                filterList={tempfilterList}
                                setListData={setTempListData}
                                priceData={priceData}
                                setPriceData={setPriceData}
                                priceFilterRef={priceFilterRef}
                            />
                        )}
                    </div>

                    <div className="w-full flex h-[40px] bg-[#F2F6F8] z-30">
                        {!activeFilter ? (
                            <>
                                <button
                                    className="w-[50%] text-center flex items-center justify-center"
                                    onClick={() => {
                                        setActiveFilter(!activeFilter);
                                        setActiveType('sort-by');
                                    }}
                                >
                                    SORT
                                </button>

                                <button
                                    className="w-[50%] text-center flex items-center justify-center"
                                    onClick={() => {
                                        setActiveFilter(!activeFilter);
                                        setActiveType('filter');
                                    }}
                                >
                                    FILTER
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="w-[50%] bg-[#F2F6F8] z-30 text-center flex items-center justify-center"
                                    onClick={() => {
                                        setActiveFilter(false);
                                        setActiveType('sort-by');
                                    }}
                                >
                                    CLOSE
                                </button>
                                <button
                                    className="w-[50%] bg-[#F2F6F8] z-30 text-center flex items-center justify-center"
                                    onClick={handleApply}
                                >
                                    APPLY
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
