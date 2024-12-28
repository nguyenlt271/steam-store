import Item from './Item';

function HistoryList() {
  return (
    <div className='flex flex-col gap-4 p-2 py-4 rounded-md bg-secondaryCustoms'>
      <div className='flex items-center gap-2 p-2 py-0 text-secondaryCustoms font-semibold text-[14px]'>
        <h4>Steam account sale history</h4>
        <div className='w-1 h-1 rounded-full bg-primary' />1
      </div>
      <div className='flex flex-col gap-2'>
        <Item />
      </div>
    </div>
  );
}

export default HistoryList;
