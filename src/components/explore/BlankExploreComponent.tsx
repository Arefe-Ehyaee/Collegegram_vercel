import CustomButton from "../CustomButton";

const BlankExploreComponent = () => {
  return (
    <div
      dir="rtl"
      className="flex h-[85svh] w-full items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">سلام به کالج‌گرام خوش اومدی!</h1>
        <h2 className="pt-8 pb-12 text-xl font-bold">
          برای دیدن پست‌ها در این صفحه باید کالج‌گرامی‌ها رو <br />
          دنبال کنی. آماده‌ای؟
        </h2>
        <CustomButton size="large" text="جستجوی کالج‌گرامی‌ها" className="bg-red-200"></CustomButton>
        
      </div>
    </div>
  );
};

export default BlankExploreComponent;
