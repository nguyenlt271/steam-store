'use client';

import React from 'react';
import Item from './Item';
import { useCategory } from '@/lib/context/CategoryContext';

function CategoryList() {
  const { categories } = useCategory();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-normal text-secondaryCustoms">
        Select a category first
      </h3>
      <div className="flex items-center lg:justify-normal gap-3 lg:gap-4 flex-wrap">
        {categories.map((category) => (
          <Item key={category?.category_id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
