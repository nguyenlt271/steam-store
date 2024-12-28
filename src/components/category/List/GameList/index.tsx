import { useCategory } from '@/lib/context/CategoryContext';
import Item from './Item';

function GameList() {
  const { games } = useCategory();

  return (
    <div className='flex items-center gap-2 overflow-x-auto max-w-[calc(1076px - 240px)]'>
      {games.map((game) => (
        <Item key={game?.app_id} game={game} />
      ))}
    </div>
  );
}

export default GameList;
