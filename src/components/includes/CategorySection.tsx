import React from 'react';
import RoundSection from './RoundSection';
import fetchApiData from '@/config/fetch-api-data';

const getData = async () => {
  const response = await fetchApiData<any>('products/list-categories/');
  console.log(response,"reponse");
  return response;
}

const CategorySection = async function () {
const apiData = await getData();
let categories = null;
if (apiData?.status_code === 6000) {
  categories = apiData?.data;
} else {
  categories = null; 
};
  return (
    <div>
      <RoundSection
        sectionTitle="Shop by Category"
        category={true}
        data={categories}
      />
    </div>
  );
}

export default CategorySection;
