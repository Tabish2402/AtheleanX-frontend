import api from "./axios";

export const getCoachHistory = async () => {
  const res = await api.get("/coach/history");
  return res.data;
};

export const coachChat = async (message) => {
  const res = await api.post("/coach/chat", { message });
  return res.data;
};
