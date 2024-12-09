import PosterInfo from "../../explore/PosterInfo";

interface UnBlockingModalProps {
    name: string;
    avatar?: string;
    followersCount?: number;
}


const UnBlockingModal:React.FC<UnBlockingModalProps> = ({name, avatar, followersCount}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <PosterInfo name={name} followersCount={followersCount} avatar={avatar}></PosterInfo>
            <div className="font-bold pb-1">{`مطمئنی میخوای ${name} رو از بلاک ها حذف کنی؟`}</div>
        </div>
    );
};
  
export default UnBlockingModal;