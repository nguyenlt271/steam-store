import React from 'react';
import Item from './Item';

function GameRelevantList() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2 py-0 text-secondaryCustoms font-semibold text-[14px]'>
        <h4>Relevant games</h4>
      </div>
      <div className='grid gap-4 grid-cols-2 lg:grid-cols-4 h-[55vh] overflow-y-auto'>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}

export default GameRelevantList;
