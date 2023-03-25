import HakidameList from "@/components/pages/HakidameList";
import Head from "next/head";
import { getAllHakidamesData } from "@/lib/fetch";
import { useRouter } from "next/router";

export default function Home({ hakidames }: any) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>はきだめ | umaidashi</title>
      </Head>
      <HakidameList hakidames={hakidames} />
    </>
  );
}

export async function getStaticProps() {
  const res = await getAllHakidamesData();
  const hakidames = res.data;
  return {
    props: { hakidames },
    revalidate: 1,
  };
}
