import debounce from "lodash.debounce";
import Link from "next/link";
import React, { useCallback } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { getNoteDetails, updateNote } from "../../utils/api";
import Loader from "../../components/Loader";
import Nav from "../../components/Nav";

const EachNote = () => {
  const queryClient = useQueryClient();
  const { query, push } = useRouter();

  const { data: note } = useQuery(
    ["note", query?.id],
    () => getNoteDetails(query?.id),
    {
      enabled: !!query?.id,
      onError: ({ response }) => {
        if (response?.status === 404) {
          push("/404");
          return;
        }
        alert(response?.data?.message);
      },
      retry: (_, { response }) => response?.status !== 404,
    }
  );

  const { mutate, mutateAsync } = useMutation(updateNote, {
    onError: ({ response }) => {
      alert(response?.data?.message);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["note", { id: variables.noteId }], data);
    },
  });

  const debouncedOnChange = useCallback(
    debounce(async (key, event) => {
      mutate({ noteId: query?.id, payload: { [key]: event.target.value } });
    }, 500),
    []
  );

  const toggleFeatured = async () => {
    try {
      await mutateAsync({
        noteId: query?.id,
        payload: { featured: !note.featured },
      });

      queryClient.invalidateQueries("note");
    } catch (error) {
      console.error(error);
    }
  };

  if (!note) {
    return <Loader fullPage />;
  }

  return (
    <div className="w-full flex justify-center py-10 px-[5%] pt-20">
      <Nav />

      <div className="max-w-2xl w-full">
        <Link
          href="/"
          type="button"
          className="text-md flex items-center text-gray-500 space-x-3 mb-7"
        >
          <MdOutlineKeyboardBackspace /> &nbsp; Go back
        </Link>

        <div className="flex justify-center mb-4 space-x-6">
          <input
            onChange={(event) => {
              debouncedOnChange("title", event);
            }}
            defaultValue={note.title}
            className="w-full text-2xl md:text-4xl placeholder:text-gray-300 font-extrabold outline-none border-b-2 border-gray-100 border-solid"
            type="text"
            name="title"
            required
            id="title"
            placeholder="Title of note"
          />

          {note.featured ? (
            <AiFillStar
              onClick={toggleFeatured}
              className="text-4xl cursor-pointer text-yellow-400"
            />
          ) : (
            <AiOutlineStar
              onClick={toggleFeatured}
              className="text-4xl cursor-pointer text-gray-600"
            />
          )}
        </div>
        <textarea
          onChange={(event) => {
            debouncedOnChange("content", event);
          }}
          defaultValue={note.content}
          className="w-full p-4 mb-6 outline-none border-2 border-gray-50 focus:border-gray-200 rounded-md"
          name="content"
          required
          id="content"
          rows={10}
          placeholder="Write your note here"
        ></textarea>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   try {
//     const data = await getNoteDetails(context.query?.id);
//     return { props: { note: data } };
//   } catch (error) {
//     return { notFound: true };
//   }
// }

export default EachNote;
