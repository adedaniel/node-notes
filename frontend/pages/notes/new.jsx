import Router from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { addNote } from "../../utils/api";

export default function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isLoading, mutate } = useMutation(addNote, {
    retry: 3,
    onSuccess: () => {
      Router.push("/");
    },
    onError: (error) => {
      alert("Unable to access server. Try again later");
    },
  });

  const handleSubmitNote = (event) => {
    event.preventDefault();
    mutate({ title, content });
  };

  return (
    <div className="w-full flex justify-center py-10 px-[5%] pt-20">
      <form onSubmit={handleSubmitNote} className="max-w-2xl w-full">
        <h1 className="text-4xl mb-12 font-extrabold">Add Note</h1>

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full text-3xl placeholder:text-gray-300 mb-4 font-bold outline-none border-b-2 border-gray-300 border-solid"
          type="text"
          name="title"
          required
          id="title"
          placeholder="Title of note"
        />

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-full p-4 mb-6 outline-none border-2 rounded-md"
          name="content"
          required
          id="content"
          rows={10}
          placeholder="Write your note here"
        ></textarea>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-teal-600 rounded-md shadow-sm text-lg font-bold text-white h-12"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
