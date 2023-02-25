import Link from "next/link";
import React, { useCallback, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "react-query";
import { AiOutlineStar } from "react-icons/ai";
import classNames from "classnames";
import debounce from "lodash.debounce";
import { getNotes } from "../utils/api";
import PageLoadAnimation from "../components/PageLoadAnimation";

const Index = () => {
  const [showFeatured, setShowFeatured] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedOnChange = useCallback(
    debounce(async (event) => {
      setQuery(event.target.value);
    }, 500),
    [query]
  );

  const { data: notes } = useQuery(["notes", showFeatured, query], getNotes);

  if (!notes) {
    return <PageLoadAnimation />;
  }

  return (
    <div className="w-full flex justify-center py-10 px-[5%] pt-40">
      <div className="max-w-4xl w-full">
        <h1 className="text-center text-7xl mb-8 font-extrabold">Notes</h1>

        <div className="flex justify-center space-x-6">
          <input
            onChange={debouncedOnChange}
            className="w-full text-xl placeholder:text-gray-300 mb-8 text-center outline-none border-b-2 border-gray-100 border-solid"
            type="text"
            name="search"
            required
            id="search"
            placeholder="Search for a note"
          />

          <button
            onClick={() => setShowFeatured(!showFeatured)}
            className={classNames(
              "w-32 border flex justify-center items-center rounded-sm shadow-sm text-md font-bold text-gray-600 h-8",
              {
                "border-gray-200": !showFeatured,
                "bg-yellow-400": showFeatured,
              }
            )}
          >
            <AiOutlineStar className="text-sm cursor-pointer text-gray-600" />
            &nbsp; Featured
          </button>
        </div>

        <div className="w-full">
          <div className="grid autoGrid gap-5">
            <Link
              href="/notes/new"
              className="border-2 space-y-2 shadow-md rounded-md px-6 py-4 flex cursor-pointer items-center justify-center"
            >
              <IoMdAdd className="text-6xl font-light text-gray-400" />
            </Link>
            {notes.map(({ _id, title, content }) => (
              <Link
                key={_id}
                href={`/notes/${_id}`}
                className="border-2 cursor-pointer space-y-2 shadow-md rounded-md px-6 py-4"
              >
                <h4 className="text-xl font-bold">{title}</h4>
                <p className="text-gray-500 ellipsify">{content}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps() {
//   try {
//     const data = await getNotes();
//     return { props: { notes: data } };
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export default Index;
