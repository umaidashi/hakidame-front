import { postHakidameData } from "@/lib/fetch";
import { useState } from "react";

export default function CreateModal(props: any) {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [todo, setTodo] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };
  const handleChangeDetail = (value: string) => {
    setDetail(value);
  };
  const handleChangeTodo = () => {
    setTodo(!todo);
  };

  const handleSubmit = () => {
    postHakidameData({
      title,
      detail,
      todo,
      done,
    });
    props.toggleCreateMode;
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-60 z-10">
      <div
        className="fixed top-0 h-1/5 w-screen z-10"
        onClick={() => props.toggleCreatedMode()}
      ></div>
      <div className="fixed bottom-0 h-4/5 w-screen bg-white p-6 pt-10 rounded-t-3xl z-30">
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          New Hakidame
          <span className="ml-2 text-gray-400 text-sm">
            #{todo ? "todo" : "hakidame"}
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center my-6">
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              checked={todo}
              onChange={() => handleChangeTodo()}
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              is this todo?
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              type="text"
              value={title}
              onChange={(e) => handleChangeTitle(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={detail}
              onChange={(e) => handleChangeDetail(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Detail
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
function toggleCreateMode() {
  throw new Error("Function not implemented.");
}
