import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api/v1"
      : "https://mero-geet.onrender.com/api/v1",
  withCredentials: true,
});
