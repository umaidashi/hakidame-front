import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import List from "../List";
import ListLoading from "../ListLoading";

export default function HakidameList({
  hakidames,
  isLoading,
}: {
  hakidames: any[];
  isLoading: boolean;
}) {
  const router = useRouter();
  console.log(isLoading);

  console.log(hakidames)

  return (
    <Layout>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        List
      </h2>
      <hr />
      {isLoading ? <ListLoading /> : <List hakidames={hakidames} />}
    </Layout>
  );
}
