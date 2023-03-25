import { useRouter } from "next/router";

export default function TodoList({ hakidames }: any) {
  const router = useRouter();

  const toHakidamePage = (id: number) => {
    router.push(`/hakidame/${id}`);
  };
  return (
    <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
      {hakidames.map((h: any) => (
        <li
          key={h.id}
          className="w-full border-b-2 border-neutral-100 border-opacity-100 py-3 pl-2 dark:border-opacity-5 list-none"
          onClick={() => toHakidamePage(h.id)}
        >
          <div className="flex items-center">
            <input type="checkbox" className="mr-2 rounded-full" />
            <p>{h.title}</p>
          </div>
          <span className="text-xs">#{h.todo ? "todo" : "hakidame"}</span>
          <span className="text-xs ml-2">{h.pub_date}</span>
        </li>
      ))}
    </ul>
  );
}
