import HomeModule from '@/module/home';
import { isEmpty } from 'lodash';
export const dynamic = 'force-dynamic';

async function getParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category/params`,
    {
      cache: 'no-store',
    }
  );
  const resp = await res.json();
  return resp;
}

async function getGames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
    cache: 'no-store',
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
  if (!process.env.NEXT_PUBLIC_API_URL) return;

  const respGames = await getGames();
  const respParams = await getParams();

  if (
    isEmpty(respGames) ||
    isEmpty(respParams) ||
    respGames.length === 0 ||
    respParams.length === 0
  )
    return;

  return <HomeModule games={respGames?.games} params={respParams} />;
}
