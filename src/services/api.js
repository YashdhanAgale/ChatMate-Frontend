import axios from "axios";

const API = axios.create({
  baseURL: "https://chatmate-backend-lvdl.onrender.com/api",
});

export const getConversations = () => API.get("/conversations");
export const getMessagesById = (wa_id) =>
  API.get(`/conversations/${wa_id}/messages`);
export const sendMessage = (wa_id, text) =>
  API.post(`/conversations/${wa_id}/messages`, { text });

export default API;
