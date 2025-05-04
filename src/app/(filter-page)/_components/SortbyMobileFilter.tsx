import React, { useState } from 'react';

type Option = {
  label: string;
  slug: string;
};


const SortbyMobileFilter: React.FC<any> = ({ handleClick, setSelectedOption, selectedOption  }:any) => {

  const options: Option[] = [
    { label: 'Alphabetical', slug: 'a-z' },
    { label: 'Reverse Alphabetical', slug: 'z-a' },
    { label: 'Newest First', slug: 'newest' },
    { label: 'Oldest First', slug: 'oldest' },
    { label: 'Price Low to High', slug: 'low' },
    { label: 'Price High to Low', slug: 'high' },
  ];


  return (
    <div className="w-full p-3">
      {options.map((option, index) => (
        <button
          key={index}
          className={`px-2 text-left w-full p-1 text-[14px] flex justify-between rubik_normal text-[#1D252C] hover:bg-gray-100 ${
            selectedOption?.slug === option.slug ? 'bg-gray-200' : 'bg-transparent'
          }`}
          onClick={() => handleClick(option)}
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
