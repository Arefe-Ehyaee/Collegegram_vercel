import Box from './BoxComponent';

export default function CheckYourEmail() {
  return (
        <div className='flex items-center justify-center min-h-screen backImg'>
          <Box height="w-full">
            <div className="rahnema-logo absolute top-10"></div>
            <div className='mt-14'>
              <div className="text-xl text-black-100 text-center mb-12 mt-16 w-80 break-words tracking-normal">لینک تغییر رمز عبور ارسال شد. برای تنظیم رمز جدید لطفاً ایمیل‌تون رو چک کنید</div>
            </div>
          </Box>
        </div>
  )
}
