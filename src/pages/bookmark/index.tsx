import Bookmark from "@/components/pages/Bookmark";
import axios from "axios";
import Head from "next/head";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const SERVER_URL = process.env.SERVER_URL;

export default function Page({ hakidames }: any) {
  const { data, isLoading } = useSWR(`${SERVER_URL}hakidame/bookmark`, fetcher);
  return (
    <>
      <Head>
        <title>Todo | はきだめ</title>
      </Head>
      <Bookmark hakidames={data} isLoading={isLoading} />
    </>
  );
}
