import axios from "axios";
import { API_KEY } from "./config";

const client = axios.create({
  baseURL: `https://api.outsidein.dev/${API_KEY}`,
});

const api = {
  async loadRestaurants() {
    const response = await client.get("/restaurants");
    return response.data;
  },
};

export default api;
