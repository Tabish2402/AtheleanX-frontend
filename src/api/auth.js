import api from "./axios";



export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const token = response.data.access_token;
  localStorage.setItem("token", token);

  return response.data;
};

export const signup = async (email, password) => {
  const response = await api.post("/auth/signup", {
    email,
    password,
  });

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
