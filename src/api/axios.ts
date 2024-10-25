import axios, { AxiosRequestConfig } from "axios";

const baseURL = "";

if (!baseURL) {
  throw new Error(
    "A variável de ambiente VITE_PUBLIC_API_URL_TOS não está definida"
  );
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },
  post: async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },
  put: async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },
};

export { api, axiosInstance };
