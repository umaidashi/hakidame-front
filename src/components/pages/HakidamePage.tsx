import { deleteHakidameData, updateHakidameData } from "@/lib/fetch";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../layout/Layout";

export default function HakidameList({ hakidame }: any) {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState(hakidame.title);
  const [newDetail, setNewDetail] = useState(hakidame.detail);
  const [newTodo, setNewTodo] = useState(hakidame.todo);
  const [newDone, setNewDone] = useState(hakidame.done);
  const [newBookmark, setNewBookmark] = useState(hakidame.bookmark);

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleChangeTitle = (value: string) => {
    setNewTitle(value);
  };
  const handleChangeDetail = (value: string) => {
    setNewDetail(value);
  };
  const handleChangeTodo = () => {
    setNewTodo(!newTodo);
  };
  const handleChangeDone = () => {
    setNewDone(!newDone);
  };
  const handleBookmark = () => {
    setNewBookmark(!newBookmark);
    updateHakidameData({
      id: hakidame.id,
      title: hakidame.title,
      detail: hakidame.detail,
      todo: hakidame.todo,
      done: hakidame.done,
      bookmark: !newBookmark,
    });
  };

  const toggleMenuVisible = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleReset = () => {
    setNewTitle(hakidame.title);
    setNewDetail(hakidame.detail);
    setNewTodo(hakidame.todo);
    setNewDone(hakidame.done);
    setNewBookmark(hakidame.bookmark);
  };

  const handleSave = () => {
    updateHakidameData({
      id: hakidame.id,
      title: newTitle,
      detail: newDetail,
      todo: newTodo,
      done: newDone,
      bookmark: newBookmark,
    });
    router.back();
  };
  const handleDelete = () => {
    deleteHakidameData({ id: hakidame.id });
    router.back();
  };

  const isEdited =
    hakidame.title !== newTitle ||
    hakidame.detail !== newDetail ||
    hakidame.todo !== newTodo ||
    hakidame.done !== newDone;

  return (
    <Layout>
      <div className="flex items-center ">
        <p className="text-xs py-3 text-gray-500">
          更新日：{hakidame.pub_date}
        </p>
        {isEdited ? (
          <div className="flex gap-xs ml-auto">
            <div
              className="text-white bg-white border-gray-300 border-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-1.5 py-1 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-auto"
              onClick={handleReset}
            >
              <svg
                className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 pt-1"
                fill="gray"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                />
              </svg>
            </div>
            <div
              className="text-white bg-blue-700 border-2 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-1.5 py-1 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-auto"
              onClick={handleSave}
            >
              <svg
                className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 pt-1"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div
            className="text-white bg-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-1.5 py-1 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-auto"
            onClick={toggleMenuVisible}
          >
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 pt-1"
              fill="gray"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            {isMenuVisible && (
              <div>
                <div
                  className="fixed top-0 left-0 w-screen h-screen bg-gray-400 bg-opacity-10 z-40 "
                  onClick={toggleMenuVisible}
                ></div>
                <div className="fixed text-black bg-white w-30 h-auto right-10 z-50 shadow-lg rounded-md p-2">
                  <p
                    onClick={handleBookmark}
                    className="text-md text-gray-400 p-2"
                  >
                    Bookmark
                  </p>
                  <p
                    onClick={handleDelete}
                    className="text-md text-red-400 p-2"
                  >
                    Delete
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-6">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={newTodo}
            onChange={() => handleChangeTodo()}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Todo
          </span>
        </label>
      </div>
      <div className="flex items-center mt-4">
        {newTodo && (
          <label className="relative inline-flex items-center cursor-pointer h-6 mr-2 mt-1">
            <input
              type="checkbox"
              id="react-option"
              className="sr-only peer"
              checked={newDone}
              onChange={() => handleChangeDone()}
            />
            <label
              htmlFor="react-option"
              className="inline-flex items-center justify-center w-[16px] h-[16px] p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-md cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-white peer-checked:bg-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <svg
                  className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 pt-1"
                  fill="white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  />
                </svg>
              </div>
            </label>
          </label>
        )}
        <h2 className="h-6 text-lg font-semibold text-gray-900 dark:text-white">
          <input
            className="block px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:text-blue-400"
            placeholder=" "
            required
            type="text"
            value={newTitle}
            onChange={(e) => handleChangeTitle(e.target.value)}
          />
        </h2>
      </div>
      {/* <hr /> */}

      <p className="text-sm py-3">
        <textarea
          className="block px-0 w-full text-sm text-gray-900 bg-transparent border-0  dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:text-blue-400"
          placeholder=" "
          required
          rows={1}
          value={newDetail}
          onChange={(e) => handleChangeDetail(e.target.value)}
        />
      </p>
    </Layout>
  );
}
