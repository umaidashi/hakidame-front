import Layout from "../layout/Layout";
import List from "../List";

export default function Todo({
  hakidames,
  isLoading,
}: {
  hakidames: any[];
  isLoading: boolean;
}) {
  return (
    <Layout>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Todo
      </h2>
      <hr />
      {isLoading ? (
        <div>loading</div>
      ) : (
        <List hakidames={hakidames} isTodo={true} />
      )}
    </Layout>
  );
}
