import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const useMutateApi = <
  TData = AxiosResponse["data"],
  TError = Error,
  TVariables = AxiosRequestConfig,
  TContext = unknown
>(
  key: string[] = [],
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const mutation = useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (config: TVariables) =>
      (await axiosInstance.request(config as AxiosRequestConfig)).data,
    mutationKey: key,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error?.message ||
          error.message ||
          error.response?.statusText ||
          "Something went wrong.";
        toast.error(message);
      }
    },
    ...options,
  });
  return mutation;
};

export { useMutateApi };
