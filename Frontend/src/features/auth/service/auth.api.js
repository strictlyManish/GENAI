import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ username, password, email }) {
  try {
    const res = await api.post("/api/auth/register", {
      username,
      password,
      email,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login({ password, email }) {
  try {
    const res = await api.post("/api/auth/login", {
      password,
      email,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const res = await api.post("api/auth/logout");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  try {
    const res = await api.post("/api/auth/get-me");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
