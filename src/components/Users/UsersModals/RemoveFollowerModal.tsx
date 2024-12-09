import PosterInfo from "../../explore/PosterInfo";


interface RemoveFollowerModalProps {
    name: string ;
    avatar?: string;
    followersCount?: number;
}


const RemoveFollowerModal:React.FC<RemoveFollowerModalProps> = ({name, avatar, followersCount}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <PosterInfo name={name} followersCount={followersCount} avatar={avatar}></PosterInfo>
            <div className="font-bold pb-1">{`مطمئنی میخوای ${name} رو از دنبال کننده هات حذف کنی؟`}</div>

        </div>
    );
};
  
export default RemoveFollowerModal;