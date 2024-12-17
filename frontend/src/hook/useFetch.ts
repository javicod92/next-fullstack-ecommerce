import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";

type FetchProps = {
  endpoint: string;
  redirectRoute?: string;
  formData: any;
  options?: AxiosRequestConfig<any>;
};

export function useFetch() {
  const router = useRouter();

  async function dataResponse({
    endpoint,
    formData,
    redirectRoute,
    options,
  }: FetchProps) {
    try {
      await axios.post(`/api/${endpoint}`, formData, options);

      if (redirectRoute) router.push(redirectRoute);
    } catch (error: any) {
      console.log(error);
    }
  }

  return dataResponse;
}
