import api from "./axios";

export const generateWorkout = async (payload) => {
  const response = await api.post("/generate/workout", payload);
  return response.data;
};
export const getLatestWorkout = async () => {
  const response = await api.get("/generate/workout/latest");
  return response.data;
};