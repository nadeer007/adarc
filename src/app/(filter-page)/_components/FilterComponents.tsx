import React, { useEffect, useRef, useState } from 'react'
import LeftFilterSection from './LeftFilterSection'
import RightcardSection from './RightcardSection'
import fetchApiData from '@/config/fetch-api-data';
import { useSearchParams } from 'next/navigation';
import BottomMobileFilter from './BottomMobileFilter';
import SortbyMobileFilter from './SortbyMobileFilter';


function FilterComponents({ params }: { params?: Promise<{ primarySlug?: string; secondarySlug?: string; tertiarySlug?: string }> }) {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<any>({});
  const [activeFilter, setActiveFilter] = useState(false)
  const [activeType, setActiveType] = useState<'sort-by' | 'filter'>('filter');
  const [priceData, setPriceData] = useState({
    min_price: "0",
    max_price: "0"
  })

  const [filteredData, setData] = useState<any>(null);
  const [filterList, setListData] = useState<any[] | null>([]);
  const [tempfilterList, setTempListData] = useState<any[] | null>(filterList);
  const [resolvedParams, setResolvedParams] = useState<{ primarySlug?: string; secondarySlug?: string; tertiarySlug?: string }>({});

  const priceFilterRef = useRef<{ applyFilter: () => void } | null>(null);

  useEffect(() => {
    if (params) {
      params.then(resolved => {
        setResolvedParams(resolved);
      });
    }
  }, [params]);

  const generateQueryParams = () => {
    if (!filterList) return '';
    const queryParams: string[] = [];
    // Check if min_price and max_price are not "0" or ""

    if (priceData.min_price !== "0" && priceData.min_price !== "") {
      queryParams.push(`min_price=${priceData.min_price}`);
    }
    if (priceData.max_price !== "0" && priceData.max_price !== "") {
      queryParams.push(`max_price=${priceData.max_price}`);
    }

    // Add primary, secondary, and tertiary slug parameters if they exist
    if (resolvedParams?.primarySlug) {
      queryParams.push(`${resolvedParams.primarySlug}=true`);
    }
    if (resolvedParams?.secondarySlug) {
      queryParams.push(`${resolvedParams.secondarySlug}=true`);
    }
    if (resolvedParams?.tertiarySlug) {
      queryParams.push(`${resolvedParams.tertiarySlug}=true`);
    }

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

    return queryParams.join('&');
  };

  const queryParams = generateQueryParams();

  console.log(queryParams,"queryParams");

  const getListData = async () => {
    const response = await fetchApiData<any>(`products/list-filters`);
    setListData(response?.data);
    // setTempListData(response?.data)

  };

  const getData = async () => {
    const queryString = searchParams ? `${searchParams}&${queryParams}` : `${queryParams}`;
    const response = await fetchApiData<any>(`products/list-products?${queryString}`);
    console.log(response, "response");

    if (response.status_code === 6000) {
      setData(response?.data);
    } else if (response.status_code === 6001) {
      setData(null);
    }
  };



  const handleApply = () => {
    console.log('Apply button clicked!');
    setListData(tempfilterList)
    setActiveFilter(false);
    if (priceFilterRef.current) {
      priceFilterRef.current.applyFilter();
    }
    // Add any logic here to apply the filter/sort
  };


  useEffect(() => {
    getListData();
  }, []);

  useEffect(() => {
    getData();

  }, [queryParams, searchParams, priceData]);

  useEffect(() => {
    setTempListData(filterList)

  }, [filterList]);

  return (<>

    <div className='w-full flex mt-[12px] max-[480px]:relative'>
      <LeftFilterSection
        filterList={filterList}
        setListData={setListData}
        priceData={priceData}
        setPriceData={setPriceData}
      />

      <RightcardSection
        filteredData={filteredData}
        filterList={filterList}
        setListData={setListData}
        priceData={priceData}
        setPriceData={setPriceData}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />


    </div>
    <div className="w-full hidden max-[480px]:block max-[480px]:sticky bottom-0">
      {activeFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20  " onClick={() => setActiveFilter(false)}></div>
      )}

      <div
        className={`relative z-30 transition-all duration-300 ease-in-out rounded-t-[6%] overflow-hidden bg-[#fff] ${activeFilter ? 'max-h-[70vh]' : 'max-h-0'
          }`}
      >
       <div className='text-center py-3'>{activeType.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</div>

        {activeType === 'sort-by' ? (
          <SortbyMobileFilter />
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
        {!activeFilter ?
          <>
            <button
              className="w-[50%] text-center flex items-center  justify-center"
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
              }
              }
            >
              FILTER
            </button>
          </>
          :
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
              className="w-[50%] bg-[#F2F6F8]  z-30 text-center flex items-center justify-center"
              onClick={() => {
                handleApply();
              }}
            >
              APPLY
            </button>
          </>
        }
      </div>
    </div>
  </>
  )
}

export default FilterComponents
