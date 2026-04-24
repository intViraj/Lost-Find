// src/utils/api.js
import axios from "axios";
import { getCurrentUser } from "./auth";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API,
});

// Add auth token to headers automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ll_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Posts ---
export async function getAllPosts() {
  try {
    const res = await apiClient.get("/post");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPostById(id) {
  try {
    const res = await apiClient.get(`/post/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserPosts(userId) {
  try {
    const res = await apiClient.get(`/post/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}


export async function createPost(formData) {
  try {
    const res = await apiClient.post("/post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating post:", err);
    throw err;
  }
}

export async function updatePost(postId, data) {
  try {
    const res = await apiClient.put(`/post/${postId}`, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deletePost(postId) {
  try {
    const res = await apiClient.delete(`/post/${postId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function loginUser(studentname, password) {
  try {
    const res = await apiClient.post("/auth/login", { studentname, password });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserById(userId) {
  try {
    const token = localStorage.getItem("ll_token"); // ✅ match interceptor

    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const res = await apiClient.get(`users/${userId}`, { headers });
    return res.data;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

export async function getUserStats() {
  try {
    const token = localStorage.getItem("ll_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await apiClient.get(`/user/stats`, { headers });
    return res.data;
  } catch (err) {
    console.error("Error fetching user stats:", err);
    return null;
  }
}



export const updateUser = async (userId, formData) => {
  const token = getCurrentUser()?.token;

  const res = await apiClient.put(`/user/edit/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
