import axios from "axios";

export const loginUser = async (payload) => {
  const { data } = await axios.post(`/api/auth/login`, payload);
  localStorage.setItem("notes_acccess_token", data.token);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await axios.post(`/api/auth/register`, payload);
  localStorage.setItem("notes_acccess_token", data.token);
  return data;
};

export const getNotes = async ({ queryKey } = {}) => {
  const [, featured, keyword] = queryKey || [];
  const { data } = await axios.get(`http://localhost:8080/api/v1/notes`, {
    params: {
      featured: featured || undefined,
      keyword: keyword || undefined,
    },
  });
  return data;
};

export const getNoteDetails = async (noteId) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1/notes/${noteId}`
  );
  return data;
};

export const addNote = async (payload) => {
  const { data } = await axios.post(`/api/notes`, payload);
  return data;
};

export const updateNote = async ({ noteId, payload }) => {
  const { data } = await axios.patch(`/api/notes/${noteId}`, payload);
  return data;
};
