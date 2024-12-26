import SellOfList from "@/components/account/List/SellOfList";
import NotLoggedNotification from "@/components/auth/notification/NotLoggedNotification";
import CategoryFilter from "@/components/category/Filter";
import CategoryList from "@/components/category/List/CategoryList";
import Header from "@/components/common/Header";
import { GeneralInformationBar } from "@/components/information/Bar";
import Banner from "@/components/media/Banner";
import TopSellerList from "@/components/seller/List/TopSellerList";
import Breadcrumbs from "@/components/share/Breadcrumbs";
import { CategoryProvider } from "@/lib/context/CategoryContext";

// FETCH DATA WITH AN API
async function getCategories() {
  const res = await fetch(`http://localhost:3000/api/category`, {
    cache: "force-cache",
  });
  const resp = await res.json();
  return resp;
}

async function getParams() {
  const res = await fetch(`http://localhost:3000/api/category/params`, {
    cache: "force-cache",
  });
  const resp = await res.json();
  return resp;
}

async function getGames() {
  const res = await fetch(`http://localhost:3000/api/games`, {
    cache: "force-cache",
  });
  const resp = await res.json();
  return resp;
}


export const generateMetadata = async () => {
  return {
    title: "Buy an account Stream",
    description: "Descriptions",
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
      <div className="fixed inset-0 w-screen min-h-screen text-[13px] bg-primaryCustoms text-primaryCustoms overflow-y-auto">
        <Header />
        <div className="max-w-full lg:max-w-[1076px] mx-auto p-4">
          <Breadcrumbs
            breadcrumbs={[{ title: "Home", href: "/" }, { title: "Page" }]}
          />
          <div className="my-2 flex flex-col lg:flex-row gap-4">
            <div className="order-2 lg:order-1 shrink-0 w-full lg:w-[240px]">
              <GeneralInformationBar />
            </div>
            <div className="order-1 flex flex-col gap-7 overflow-hidden">
              <div className="flex flex-col gap-3">
                <NotLoggedNotification />
                <Banner />
              </div>
              <CategoryList />
              <TopSellerList />
              <CategoryFilter />
              <SellOfList />
            </div>
          </div>
        </div>
      </div>
    </CategoryProvider>
  );
}
