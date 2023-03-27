import { createTag, getTags, postHakidameData } from "@/lib/fetch";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const SERVER_URL = process.env.SERVER_URL;

const fetcher = async (url: string) =>
  await axios.get(url).then((res) => res.data);

export default function CreateModal(props: any) {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [todo, setTodo] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagSearchForm, setTagSearchForm] = useState<string>("");
  const [tagRecommend, setTagRecommend] = useState<string[]>([]);

  const {
    data: existTags,
    isLoading,
    mutate,
  } = useSWR(`${SERVER_URL}hakidame/tags`, fetcher);

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };
  const handleChangeDetail = (value: string) => {
    setDetail(value);
  };
  const handleChangeTodo = () => {
    setTodo(!todo);
  };
  const handleChangeBookmark = () => {
    setBookmark(!bookmark);
  };
  const handleChangeTagSearchForm = (value: string) => {
    setTagSearchForm(value);
  };
  useEffect(() => {
    if (!existTags && isLoading) return;
    setTagRecommend(
      existTags.filter((t: any) => {
        if (t.name.includes(tagSearchForm)) {
          return t;
        } else {
          return;
        }
      })
    );
  }, [tagSearchForm]);

  console.log(existTags);

  const handleAddTag = (tag: any) => {
    setTags([...tags, tag]);
  };
  const handleDeleteTag = (tag: any) => {
    setTags(tags.filter((t: any) => t.id !== tag.id));
  };
  const handleCreateTag = () => {
    createTag({ name: tagSearchForm });
    mutate({ ...existTags, name: tagSearchForm });
  };

  const handleSubmit = () => {
    postHakidameData({
      title,
      detail,
      todo,
      done,
      bookmark,
    });
    props.toggleCreateMode;
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-60 z-10 backdrop-blur-sm">
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
          <div className="flex items-center">
            <div className="mt-6 mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={todo}
                  onChange={() => handleChangeTodo()}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Todo
                </span>
              </label>
            </div>
            <div className="mt-6 mb-4 ml-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={bookmark}
                  onChange={() => handleChangeBookmark()}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Bookmark
                </span>
              </label>
            </div>
          </div>
          <div className="mb-4 overflow-x-scroll">
            {tags &&
              tags.map((tag: any) => (
                <span
                  key={tag.name}
                  onClick={() => handleDeleteTag(tag)}
                  className="bg-blue-100 p-1 rounded mr-1 cursor-pointer text-sm"
                >
                  #{tag.name}
                </span>
              ))}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              type="text"
              value={tagSearchForm}
              onChange={(e) => handleChangeTagSearchForm(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tags
            </label>
            {tagSearchForm &&
              existTags.length > 0 &&
              !existTags.some((t: any) => t.name === tagSearchForm) && (
                <button
                  onClick={handleCreateTag}
                  type="button"
                  className="absolute right-0 top-0 px-2.5 py-2 bg-blue-700 rounded-lg text-white text-sm"
                >
                  Add
                </button>
              )}
            <label className="mt-1">
              {tagRecommend.length > 0 && tagSearchForm && (
                <div className="block my-2 overflow-x-scroll">
                  {tagRecommend.map((tag: any) => (
                    <span key={tag.name}>
                      {!tags.includes(tag) && (
                        <span
                          onClick={() => handleAddTag(tag)}
                          className="text-sm mr-1 cursor-pointer bg-gray-100 p-1 rounded"
                        >
                          #{tag.name}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}
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
              rows={1}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
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
