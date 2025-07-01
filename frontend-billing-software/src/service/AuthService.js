import axios from "axios";

export const login = async (data) => {
  const response = await axios.post("http://localhost:8080/api/v1/login", data);
  return response;
};
