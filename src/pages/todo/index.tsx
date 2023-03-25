import Todo from "@/components/pages/Todo";
import { getAllHakidamesTodoData } from "@/lib/fetch";

export default function Page({ hakidames }: any) {
  return <Todo hakidames={hakidames} />;
}

export async function getStaticProps() {
  const res = await getAllHakidamesTodoData();
  const hakidames = res.data;
  return {
    props: { hakidames },
    revalidate: 3,
  };
}
