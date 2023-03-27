import HakidamePage from "@/components/pages/HakidamePage";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
const SERVER_URL = process.env.SERVER_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page() {
  const router = useRouter();
  const { data, isLoading } = useSWR(
    `${SERVER_URL}hakidame/${router.query.id}`,
    fetcher
  );
  return (
    <>
      <Head>
        <title>{!isLoading && data && data.title} | はきだめ</title>
      </Head>
      {!isLoading && data && (
        <HakidamePage hakidame={data} isLoading={isLoading} />
      )}
    </>
  );
}
