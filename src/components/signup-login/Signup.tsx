import Box from "./BoxComponent";
import EnterSignup from "./EnterSignup";
import InputField from "../TextInputComponent";
import UserSvg from "../../assets/icons/user.svg";
import GmailSvg from "../../assets/icons/gmail.svg";
import keySvg from "../../assets/icons/key.svg";
import Label from "../Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import { toast } from "react-toastify";

const signupSchema = z
  .object({
    username: z
      .string({ required_error: "نام کاربری برای ثبت نام لازمه!" })
      .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" })
      .max(30,{ message: "نام کاربری باید حداکثر 30 کاراکتر باشد" } )
      .regex(/^[a-zA-Z0-9]+$/, { message: "نام کاربری فقط باید شامل حروف بزرگ و کوچک و اعداد باشد" })
      .refine(s => !s.includes(' '), { message: "نام کاربری نباید شامل فاصله باشد" }),
    email: z
      .string({ required_error: "ایمیل برای ثبت نام لازمه!" })
      .max(255,{ message: "ایمیل نباید بیشتر از 255 کاراکتر باشد" } )
      .email({ message: "ایمیل نامعتبر است" }),
    password: z
      .string({ required_error: "رمز عبور برای ثبت نام لازمه!" })
      .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" })
      .max(50,{ message: "نام کاربری باید حداکثر 50 کاراکتر باشد" } )
      .regex(/[A-Z]/, { message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" })
      .regex(/[a-z]/, { message: "رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
      .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
    repeatpassword: z
      .string({ required_error: "تکرار رمز عبور مورد نیاز است" })
  })
  .superRefine(({ repeatpassword, password }, ctx) => {
    if (repeatpassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "پسورد‌ها باید یکسان باشند",
        path: ["repeatpassword"],
      });
    }
  });

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormData) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try {
      axios
        .post(`${API_BASE_URL}/auth/sign-up`, {
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.repeatpassword,
        })
        .then(() => {
          navigate("/login");
          toast.success("با موفقیت ثبت نام شدید!");
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  return (
    <div className="backImg flex min-h-screen items-center justify-center">
      <Box height="w-full">
        <div className="rahnema-logo absolute top-10"></div>
        <EnterSignup />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-14 flex flex-col items-center"
        >
          <Label
            text={
              "برای ثبت نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید"
            }
          ></Label>
          <InputField
            type="text"
            placeholder="نام کاربری"
            name="username"
            iconsrc={UserSvg}
            error={errors.username?.message}
            register={register}
          />
          <InputField
            type="text"
            placeholder="ایمیل"
            name="email"
            iconsrc={GmailSvg}
            error={errors.email?.message}
            register={register}
          />
          <InputField
            type="password"
            placeholder="رمز عبور"
            name="password"
            iconsrc={keySvg}
            error={errors.password?.message}
            register={register}
          />
          <InputField
            type="password"
            placeholder="تکرار رمز عبور"
            name="repeatpassword"
            iconsrc={keySvg}
            error={errors.repeatpassword?.message}
            register={register}
          />
          <CustomButton
            text={"ثبت نام"}
            className="mt-12 bg-red-200 text-sm"
          ></CustomButton>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
