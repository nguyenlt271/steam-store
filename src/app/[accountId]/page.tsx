import AccountModule from "@/module/account";

// FETCH DATA WITH AN API
export const generateMetadata = async () => {
  return {
    title: 'Buy an account Stream',
    description: 'Descriptions',
  };
};

export const dynamic = 'force-dynamic';

async function getAccount(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${id}`,
    {
      cache: 'no-store',
    }
  );
  const resp = await res.json();
  return resp;
}


export default async function Page({
  params,
}: {
  params: Promise<{ accountId: string }>
}) {
  const accountId = (await params).accountId
  const respAccount = await getAccount(accountId)

  return <AccountModule />
}