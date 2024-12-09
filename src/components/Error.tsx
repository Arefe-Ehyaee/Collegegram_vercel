
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

interface ErrorLayoutProps {
    children?: React.ReactNode;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen w-screen errorBackColor items-center justify-center">
      <header className="bg-cover bg-center h-32">
        <div className="flex items-center justify-center h-full errorHeaderImg">
        </div>
      </header>
      
      <main className="flex-grow items-center mt-48 justify-center">
        <div className={"box-style w-[485px] h-[450px] bg-grey-100 rounded-3xl border border-grey-400 py-16 px-0 items-center justify-center"}>
            <div className="items-center justify-center">
                <div className={"text-[40px] text-darkBlue text-center font-bold w-80 mx-auto"}>
                وای اینجا چه خبره؟
                </div>
                <div className={"text-xl text-darkBlue text-center font-bold w-80 mt-14 mx-auto"}>
                ظاهرا یک مشکلی وجود داره
                </div>
                <div className={"text-base text-darkBlue text-center font-normal w-80 mt-8 tracking-wider mx-auto"}>
                ما داریم تلاش می کنیم که برطرفش کنیم. لطفا چند دقیقه دیگه دوباره تلاش کن
                </div>
                <CustomButton text={"بازگشت به صفحه پروفایل"} handleOnClick={()=> navigate("/userprofile")} className='bg-red-200 mx-auto mt-8'></CustomButton>
            </div>
            
        </div>
      </main>


      <footer>
        <div className="absolute top-[800px] left-[144px]">
          <div className="errorLeftImg">
          </div>
        </div>

        <div className="absolute top-[821px] left-[812px]">
          <div className="errorRightImg">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ErrorLayout;