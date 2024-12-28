import HomeModule from '@/module/home';

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
  const respGames = await getGames();
  const respParams = await getParams();

  return <HomeModule games={respGames?.games} params={respParams} />;
}
