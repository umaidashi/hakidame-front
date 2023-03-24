import { useState } from "react";
import Layout from "../layout/Layout";

export default function HakidameList({ hakidame }: any) {
  return (
    <Layout>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {hakidame.title}
      </h2>
      <hr />
      <p className="text-xs py-3 text-gray-500">更新日：{hakidame.pub_date}</p>
      <p className="text-sm py-3">{hakidame.detail}</p>
      <div className="block">
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={hakidame.todo}
              className="w-6 h-6 rounded"
              // onChange={console.log("hoge")}
            />
            <span className="ml-2">Rounded checkbox</span>
          </label>
        </div>
      </div>
    </Layout>
  );
}
