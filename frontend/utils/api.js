import axios from "axios";
import Router from "next/router";

const authedFetch = axios.create({
  /** We're not using baseURL because we have already set the api path rewrites in next.config.js */
  // baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

authedFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("notes_acccess_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }

    Router.push("/login");
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  const { data } = await authedFetch.get(`/api/notes`, {
    params: {
      featured: featured || undefined,
      keyword: keyword || undefined,
    },
  });
  return data;
};

export const getNoteDetails = async (noteId) => {
  const { data } = await authedFetch.get(`/api/notes/${noteId}`);
  return data;
};

export const addNote = async (payload) => {
  const { data } = await authedFetch.post(`/api/notes`, payload);
  return data;
};

export const updateNote = async ({ noteId, payload }) => {
  const { data } = await authedFetch.patch(`/api/notes/${noteId}`, payload);
  return data;
};
