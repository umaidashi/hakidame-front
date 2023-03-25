import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import List from "../List";

export default function HakidameList({ hakidames }: any) {
  const router = useRouter();

  const toHakidamePage = (id: number) => {
    router.push(`/hakidame/${id}`);
  };
  return (
    <Layout>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        List
      </h2>
      <hr />
      <List hakidames={hakidames} />
    </Layout>
  );
}
