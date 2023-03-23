import { postHakidameData } from "@/lib/fetch";
import { useState } from "react";
import Layout from "../layout/Layout";

export default function HakidameList({ hakidames }: any) {
  return (
    <Layout>
      <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {hakidames.map((h: any) => (
          <a href={`/${h.id}`} key={h.id}>
            <li>
              {h.title}
              {/* <p>{h.detail}</p> */}
              {/* <p>{h.todo}</p> */}
            </li>
          </a>
        ))}
      </ul>
    </Layout>
  );
}
