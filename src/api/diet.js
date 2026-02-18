import api from "./axios";

export const generateDiet = async (payload) => {
  const response = await api.post("/generate/diet", payload);
  return response.data;
};

export const getLatestDiet = async () => {
  const response = await api.get("/generate/diet/latest");
  return response.data;
};
