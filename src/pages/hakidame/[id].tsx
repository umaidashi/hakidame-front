import HakidamePage from "@/components/pages/HakidamePage";
import Head from "next/head";
import { getAllHakidamesData, getHakidameData } from "@/lib/fetch";

export default function Page({ hakidame }: any) {
  return (
    <>
      <Head>
        <title>{hakidame.title} | はきだめ</title>
      </Head>
      <HakidamePage hakidame={hakidame} />
    </>
  );
}

export async function getStaticPaths() {
  const hakidames = await getAllHakidamesData();
  const paths = hakidames.data.map((hakidame: { id: number }) => ({
    params: { id: String(hakidame.id) },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const id = params.id;
  const res = await getHakidameData(id);
  const hakidame = res.data;
  return {
    props: { hakidame },
    revalidate: 1,
  };
}
