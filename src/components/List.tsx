import { useRouter } from "next/router";

export default function List({
  hakidames,
  isTodo,
  isBookmark,
}: {
  hakidames: any[];
  isTodo?: boolean;
  isBookmark?: boolean;
}) {
  const router = useRouter();

  const toHakidamePage = (id: number) => {
    router.push(`/hakidame/${id}`);
  };

  return (
    <>
      {hakidames.length > 0 ? (
      <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {hakidames.map((h: any) => (
          <li
            key={h.id}
            className="w-full border-b-2 border-neutral-100 border-opacity-100 py-3 pl-2 dark:border-opacity-5 list-none flex items-center"
          >
            <div>
              <div className="flex items-center">
                {h.todo && (
                  <label className="relative inline-flex items-center cursor-pointer h-6 mr-2 ">
                    <input
                      type="checkbox"
                      id="react-option"
                      className="sr-only peer"
                      checked={h.done}
                      // onChange={() => handleChangeDone()}
                    />
                    <label
                      htmlFor="react-option"
                      className="inline-flex items-center justify-center w-[10px] h-[10px] p-1.5 text-gray-500 bg-white border-2 border-gray-200 rounded-md cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-white peer-checked:bg-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <svg
                          className="w-4 h-4 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 pt-1"
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
                <p>{h.title}</p>
                {h.bookmark && !isBookmark && (
                  <svg
                    className="w-4 h-4 ml-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                    fill="blue"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z"
                    ></path>
                  </svg>
                )}
              </div>
              {!isTodo && (
                <span className="text-xs mr-2">
                  #{h.todo ? "todo" : "hakidame"}
                </span>
              )}
              <span className="text-xs">{h.pub_date}</span>
            </div>
            <button
              data-tooltip-target="tooltip-home"
              type="button"
              className="py-2 px-3 rounded-full  ml-auto"
              onClick={() => toHakidamePage(h.id)}
            >
              <svg
                className="w-4 h-4 mb-1 text-gray-500 dark:text-gray-400 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                ></path>
              </svg>
              <span className="sr-only">List</span>
            </button>
          </li>
        ))}
      </ul>
      ) : (<div className="text-md py-3 text-gray-700">No hakidames...</div>
      )}
    </>
  );
}
