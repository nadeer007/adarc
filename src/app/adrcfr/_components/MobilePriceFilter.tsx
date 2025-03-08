import CustomButton from '@/components/buttons/CustomButton';
import React, { useState,forwardRef, useImperativeHandle } from 'react';

function MobilePriceFilter({ priceData, setPriceData,priceFilterRef }: any) {
  const { min_price = '', max_price = '' } = priceData;

  const [newMinPrice, setNewMinPrice] = useState(min_price);
  const [newMaxPrice, setNewMaxPrice] = useState(max_price);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (parseFloat(value) < 0) {
      value = ''; 
    }
    setNewMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (parseFloat(value) < 0) {
      value = ''; // Reset if negative
    }
    setNewMaxPrice(value);
  };

  const handleClick = () => {
    const min = parseFloat(newMinPrice);
    const max = parseFloat(newMaxPrice);

    // Validation: max should be greater than min
    if (!isNaN(min) && !isNaN(max) && max <= min) {
      alert('Max price should be greater than Min price.');
      return;
    }

    setPriceData({
      ...priceData,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    });
  };

  useImperativeHandle(priceFilterRef, () => ({
    applyFilter: handleClick,
  }));

  return (
    <div className="mt-4">
      <div className="flex gap-4 justify-between">
        <div className="mb-4">
          <input
            type="number"
            id="min_price"
            value={newMinPrice}
            onChange={handleMinChange}
            placeholder="Min"
            className="w-full p-1 border border-[#D0D5DD] border-solid rounded focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-[#4B4B4B] placeholder:font-[500] placeholder:text-[14px] font-rubik"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="max_price"
            value={newMaxPrice}
            onChange={handleMaxChange}
            placeholder="Max"
            className="w-full p-1 border border-[#D0D5DD] border-solid rounded focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-[#4B4B4B] placeholder:font-[500] placeholder:text-[14px] font-rubik"
          />
        </div>
      </div>
      <button className='hidden'  onClick={handleClick}>click</button>
   
    </div>
  );
}

export default MobilePriceFilter;
