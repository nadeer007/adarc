import React, { useEffect, useRef, useState } from 'react';
import DropDownButton from '../buttons/DropDownButton';

type Option = {
  label: string;
  slug: string;
};

type FilterDropdownProps = {
  options: Option[];
  setOption: (option: Option) => void;
  selectedOption:object;
  title:string
  handleClick?:any
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, setOption, selectedOption , title ,handleClick }) => {
  const [isModal, setModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModal(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Handle option click and close modal
  const handleOptionClick = (option: Option) => {
    setOption(option);
    setModal(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className='border border-solid border-primary_border bg-[#fff] rounded-[6px] px-2'>
        <DropDownButton
          titleClass="text-[14px] rubik_normal leading-[20px] text-[#1D252C]"
          containerClass=""
          title={selectedOption?.label ?? title }
          onclick={() => setModal(!isModal)}
          isActive={isModal}
          rotate_angle={'-rotate-180'}
        
        />
      </div>

      {isModal && (
        <div className='absolute  border border-solid border-primary_border bg-[#fff] flex flex-col w-full rounded-[6px] mt-2 z-10'>
          {options.map((option, index) => (
            <button
              key={index}
              className="px-2  text-left text-[14px] rubik_normal text-[#1D252C] hover:bg-gray-100 "
              onClick={() => (handleClick ? handleClick(option) : handleOptionClick(option))}

            >
              {option?.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
