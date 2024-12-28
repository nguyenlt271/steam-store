import SellOfList from '@/components/account/List/SellOfList';
import NotLoggedNotification from '@/components/auth/notification/NotLoggedNotification';
import CategoryFilter from '@/components/category/Filter';
import Header from '@/components/common/Header';
import Banner from '@/components/media/Banner';
import { CategoryProvider } from '@/lib/context/CategoryContext';

// FETCH DATA WITH AN API
async function getCategories() {
  const res = await fetch(`http://localhost:3000/api/category`, {
    cache: 'force-cache',
  });
  const resp = await res.json();
  return resp;
}

async function getParams() {
  const res = await fetch(`http://localhost:3000/api/category/params`, {
    cache: 'force-cache',
  });
  const resp = await res.json();
  return resp;
}

async function getGames() {
  const res = await fetch(`http://localhost:3000/api/games`, {
    cache: 'force-cache',
  });
  const resp = await res.json();
  return resp;
}

export const generateMetadata = async () => {
  return {
    title: 'Buy an account Stream',
    description: 'Descriptions',
  };
};

export default async function Home() {
  const respCategory = await getCategories();
  const respParams = await getParams();
  const respGames = await getGames();

  return (
    <CategoryProvider
      initCategories={respCategory?.categories}
      initParams={{ ...respParams }}
      initGames={respGames?.games}
    >
      <div className='fixed inset-0 w-screen min-h-screen text-[13px] bg-primaryCustoms text-primaryCustoms overflow-y-auto'>
        <Header />
        <div className='max-w-full lg:max-w-[1076px] mx-auto p-4'>
          <div className='my-2 flex flex-col lg:flex-row gap-2'>
            <div className='order-1 flex flex-col gap-7 overflow-hidden'>
              <div className='flex flex-col gap-2'>
                <NotLoggedNotification />
                <Banner />
              </div>
              <CategoryFilter />
              <SellOfList />
            </div>
          </div>
        </div>
      </div>
    </CategoryProvider>
  );
}
