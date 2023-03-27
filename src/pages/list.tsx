import HakidameList from "@/components/pages/HakidameList";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";
const SERVER_URL = process.env.SERVER_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { data, isLoading } = useSWR(`${SERVER_URL}hakidame/`, fetcher);
  return (
    <>
      <Head>
        <title>List | はきだめ</title>
      </Head>
      <HakidameList hakidames={data} isLoading={isLoading} />
    </>
  );
}
