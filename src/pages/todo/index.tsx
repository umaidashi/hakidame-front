import Todo from "@/components/pages/Todo";
import axios from "axios";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const SERVER_URL = process.env.SERVER_URL;

export default function Page() {
  const { data, isLoading } = useSWR(`${SERVER_URL}hakidame/todo`, fetcher);

  return <Todo hakidames={data} isLoading={isLoading} />;
}
