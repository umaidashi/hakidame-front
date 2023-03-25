import Layout from "../layout/Layout";
import List from "../List";

export default function Bookmark({ hakidames }: any) {
  return (
    <Layout>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Bookmark
      </h2>
      <hr />
      <List hakidames={hakidames} />
    </Layout>
  );
}
