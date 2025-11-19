import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_BACKEND_BASE_URL
      : "",
  withCredentials: true,
});
