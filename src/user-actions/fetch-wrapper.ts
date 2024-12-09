import { useRecoilState } from "recoil";
import { authAtom } from "./atoms";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    patch: request("PATCH"),
    delete: request("DELETE"),
  };

  function request(method: string) {
    return async (url: string, body?: any, config?: AxiosRequestConfig) => {
      const requestOptions: AxiosRequestConfig = {
        method,
        url,
        headers: authHeader(),
        data: body,
        ...config,
      };

      try {
        const response = await axios(requestOptions);
        return response.data;
      } catch (error: any) {
        return handleError(error);
      }
    };
  }

  function authHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    if (isLoggedIn) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleError(error: AxiosError): Promise<never> {
    if (error.response && [401, 403].includes(error.response.status)) {
      setAuth(null);
    }

    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "An unknown error occurred";
    return Promise.reject(errorMessage);
  }
}
