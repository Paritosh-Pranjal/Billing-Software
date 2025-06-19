import axios from "axios";

export const addCategory = async (category) => {
  return await axios.post("http://localhost:8080/api/v1/categories", category);
};

export const deleteCategory = async (categoryid) => {
  return await axios.delete(
    `http://localhost:8080/api/v1/categories/${categoryid}`
  );
};

export const fetchAllCategories = async () => {
  return await axios.get("http://localhost:8080/api/v1/categories");
};
