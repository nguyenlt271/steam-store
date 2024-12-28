import React from 'react';

interface IProps {
  item: {
    value: string;
    label: string;
  };
}

function Item({ item }: IProps) {
  return (
    <div>
      <p className='text-lg text-secondaryCustoms'>{item?.value}</p>
      <p>{item?.label}</p>
    </div>
  );
}

export default Item;
