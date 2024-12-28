import * as _ from 'lodash';
import React from 'react';
import Item from './Item';

interface IProps {
  title: string;
  data: {
    value: string;
    label: string;
  }[];
}
function Group({ title = '', data = [] }: IProps) {
  return (
    <div>
      <h4 className='flex h-10 items-center gap-2 py-0 text-secondaryCustoms font-semibold text-[14px]'>
        {title}
      </h4>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4 overflow-y-auto'>
        {data.map((item) => (
          <Item item={item} key={_.uniqueId()} />
        ))}
      </div>
    </div>
  );
}

export default Group;
