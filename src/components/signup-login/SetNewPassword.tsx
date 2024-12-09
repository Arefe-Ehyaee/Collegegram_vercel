import Box from './BoxComponent';
import InputField from '../TextInputComponent';
import keySvg from "../../assets/icons/key.svg"
import Label from '../Label';
import BoxTitle from './BoxTitle';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import CustomButton from '../CustomButton';


const SetNewPassSchema = z.object({
  password: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(3, { message: "رمز عبور باید حداقل 3 کاراکتر باشد" })
    .regex(/[A-Z]/, { message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" })
    .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
    confirmPassword: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(3, { message: "رمز عبور باید حداقل 3 کاراکتر باشد" }),
})
.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "پسورد‌ها باید یکسان باشند",
      path: ["confirmPassword"],
    });
  }
});
interface SetNewPassFormData {
  password: string;
  confirmPassword: string;
}

const SetNewPassword: React.FC = () => {
  const { search } = useLocation(); 
  const query = new URLSearchParams(search);
  const token = query.get('token'); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetNewPassFormData>({
    resolver: zodResolver(SetNewPassSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();


  const onSubmit = async (data: SetNewPassFormData) => {
    setLoading(true);
    setMessage(null); 

    if (!token) {
      setMessage('Token is missing. Please check the link you received.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password?token=${token}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      const result = await response.json();
      
      setMessage(result.message || 'Password reset successfully');
      toast.success('رمز عبور با موفقیت تغییر یافت!');
      navigate("/login");
      
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message || 'An error occurred');
        toast.error("لینک منقضی شده، لطفا دوباره تلاش کنید!")
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div>Token is missing. Please check the link you received.</div>;
  }


  return (
        <div className='flex items-center justify-center min-h-screen backImg'>
          <Box height="w-full">
            <div className="rahnema-logo absolute top-10"></div>
            <div className='mt-14'>
              <BoxTitle text={'تنظیم رمز عبور جدید'}></BoxTitle>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center"
              >
              <Label text={'لطفا رمز جدیدی برای حساب خود انتخاب کنید'}></Label>
              <InputField 
                type="password" 
                placeholder="رمز عبور" 
                name="password" 
                error={errors.password?.message}
                iconsrc={keySvg} 
                register={register}
              />

              <InputField 
                type="password" 
                placeholder="تکرار رمز عبور" 
                name="confirmPassword" 
                error={errors.confirmPassword?.message}
                iconsrc={keySvg} 
                register={register}
              />
              <CustomButton text={'ثبت رمز عبور جدید'} className='bg-red-200 text-sm'></CustomButton>
              </form>
            </div>
          </Box>
        </div>
  )
}

export default SetNewPassword;