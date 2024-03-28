import axios from "./axios";

export const getAllProductAPI = async (params) => {
  try {
    const response = await axios.get("/products", { params: params });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductAPI = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchProductAPI = async (params) => {
  try {
    const response = await axios.get("/products/search", { params: params });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
