import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import List from "../List";

export default function HakidameList({
  hakidames,
  isLoading,
}: {
  hakidames: any[];
  isLoading: boolean;
}) {
  const router = useRouter();

  return (
    <Layout>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        List
      </h2>
      <hr />
      {isLoading ? <div>loading</div> : <List hakidames={hakidames} />}
    </Layout>
  );
}
