import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckboxSection({
  filter,
  index
}: any) {
  const [showAll, setShowAll] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter()

  // Determine the checkboxes to display
  const visibleCheckboxes = showAll ? filter.filter_data : filter?.filter_data.slice(0, 2);


  const handleCheckboxChange = (slug: string) => {
  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
  const paramKey = filter.slug;

  // Get current selected values as array
  const existing = currentParams.get(paramKey)?.split(',').filter(Boolean) || [];

  let updated: string[];

  if (existing.includes(slug)) {
    // Remove if already selected
    updated = existing.filter(val => val !== slug);
  } else {
    // Add if not selected
    updated = [...existing, slug];
  }

  // Update or delete param
  if (updated.length > 0) {
    currentParams.set(paramKey, updated.join(','));
  } else {
    currentParams.delete(paramKey);
  }

  // Push the new URL
  router.push(`?${currentParams.toString()}`, { scroll: false });
};


  return (
    <div className="flex flex-col gap-4 mt-4 max-h-[300px] overflow-y-scroll" >
      {visibleCheckboxes?.map((item: any, index: any) => (
        <div
          className="flex justify-between rubik_regular  text-[14px] max-md:text-[12px] text-[#000000] text-sm"
          key={index}
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                searchParams
                  .get(filter.slug)
                  ?.split(',')
                  .includes(item.slug) || false
              }
              onChange={() => handleCheckboxChange(item.slug)}
              className="cursor-pointer max-md:w-[15px] max-md:h-[15px] h-[18px] w-[18px]"
            // style={{ height: 18, width: 18 }}
            />
            <h6>{item?.name}</h6>
          </div>
          <div className='text-[14px] max-md:text-[12px]'>{item?.count}</div>
        </div>
      ))}

      {filter?.filter_data?.length > 2 && !showAll && (
        <button
          className="text-[#040C13] rubik_regular text-sm underline cursor-pointer flex justify-start"
          onClick={() => setShowAll(true)}
        >
          View more
        </button>
      )}
    </div>
  );
}

export default CheckboxSection;
