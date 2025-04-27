import React, { useState } from 'react';

type Option = {
  label: string;
  slug: string;
};

type SortbyMobileFilterProps = {
  handleClick?: (option: Option) => void;
};

const SortbyMobileFilter: React.FC<SortbyMobileFilterProps> = ({ handleClick }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const options: Option[] = [
    { label: 'Alphabetical', slug: 'alphabetical' },
    { label: 'Newest First', slug: 'newest' },
    { label: 'Oldest First', slug: 'oldest' },
    { label: 'Price Low to High', slug: 'price_low_high' },
    { label: 'Price High to Low', slug: 'price_high_low' },
  ];

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    if (handleClick) {
      handleClick(option);
    }
  };

  return (
    <div className="w-full p-3">
      {options.map((option, index) => (
        <button
          key={index}
          className={`px-2 text-left w-full p-1 text-[14px] flex justify-between rubik_normal text-[#1D252C] hover:bg-gray-100 ${
            selectedOption?.slug === option.slug ? 'bg-gray-200' : 'bg-transparent'
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option.label}
          <input
            type="radio"
            name="sortFilter"
            value={option.slug}
            checked={selectedOption?.slug === option.slug}
            onChange={() => handleOptionClick(option)}
            className="form-radio w-4 h-4 text-blue-500"
          />
        </button>
      ))}
    </div>
  );
};

export default SortbyMobileFilter;
