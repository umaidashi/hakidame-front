import Bookmark from "@/components/pages/Bookmark";
import { getAllHakidamesBookmarkData } from "@/lib/fetch";
import axios from "axios";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const SERVER_URL = process.env.SERVER_URL;

export default function Page({ hakidames }: any) {
  const { data, isLoading } = useSWR(`${SERVER_URL}hakidame/bookmark`, fetcher);

  return <Bookmark hakidames={data} isLoading={isLoading} />;
}
