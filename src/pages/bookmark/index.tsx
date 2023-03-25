import Bookmark from "@/components/pages/Bookmark";
import { getAllHakidamesBookmarkData } from "@/lib/fetch";


export default function Page({ hakidames }: any) {
  return <Bookmark hakidames={hakidames} />;
}


export async function getStaticProps() {
  const res = await getAllHakidamesBookmarkData();
  const hakidames = res.data;
  return {
    props: { hakidames },
    revalidate: 1,
  };
}
