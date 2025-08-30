import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";
import type { Dispatch } from "react";

export const apiHandler = async (
  config: AxiosRequestConfig,
  options: Record<
    string,
    Dispatch<React.SetStateAction<boolean>> | unknown
  > = {}
) => {
  try {
    const response = await axiosInstance.request(config);
    if (typeof options.onSuccess == "function")
      options.onSuccess(response.data);
    return { success: true, response };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error?.message ||
        error.message ||
        error.response?.statusText ||
        "Something went wrong.";
      return { success: false, message, status: error.status };
    }
  } finally {
    if (typeof options.setLoading == "function") options.setLoading(false);
  }
};

export default apiHandler;
