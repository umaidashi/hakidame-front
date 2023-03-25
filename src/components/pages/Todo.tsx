import Layout from "../layout/Layout";
import TodoList from "../TodoList";

export default function Todo({ hakidames }: any) {
  console.log(hakidames);
  return (
    <Layout>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Todo
      </h2>
      <hr />
      <TodoList hakidames={hakidames} />
    </Layout>
  );
}
