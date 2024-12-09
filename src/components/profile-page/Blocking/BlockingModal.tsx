import PosterInfo from "../../explore/PosterInfo";

interface BlockingModalProps {
    name: string ;
    avatar?: string;
    followersCount?: number;
}


const BlockingModal:React.FC<BlockingModalProps> = ({name, avatar, followersCount}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <PosterInfo name={name} followersCount={followersCount} avatar={avatar}></PosterInfo>
            <div className="font-bold pb-1">{`مطمئنی میخوای ${name} رو بلاک کنی؟`}</div>
            <div className="text-sm leading-7">
            اگر بلاکش کنی دیگه نمی‌تونه بهت پیام بده و پست‌هات رو ببینه. قابلیت لایک کردن و کامنت گذاشتن زیر پست‌های تو هم براش مسدود میشه.
            </div>
        </div>
    );
};
  
export default BlockingModal;