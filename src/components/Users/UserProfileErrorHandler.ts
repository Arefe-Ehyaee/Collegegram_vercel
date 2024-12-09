import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const HandleError = (error: any) => {

    const navigate = useNavigate();

    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        navigate("/login");
        toast.error("نیاز به ورود مجدد دارید!");
      } else if (statusCode === 400) {
        toast.error("خطایی رخ داد!");
        navigate("/error");
      } else if (statusCode === 500) {
        toast.error("خطایی رخ داد!");
        navigate("/error");
      } else if (error.response.data.message) {
        navigate("/error");
      } else if (statusCode === 404) {
        toast.error("نام کاربری مورد نظر پیدا نشد");
        navigate("/error");
      } else if (error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.response.statusText) {
        toast.error(`Error: ${error.response.statusText}`);
      } else {
        toast.error("Unexpected server error");
      }
    } else if (error.request) {
      toast.error("Network error");
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };