import PosterInfo from "../../explore/PosterInfo";


interface UnFollowModalProps {
    name: string ;
    avatar?: string;
    followersCount?: number;
}


const UnFollowModal:React.FC<UnFollowModalProps> = ({name, avatar, followersCount}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <PosterInfo name={name} followersCount={followersCount} avatar={avatar}></PosterInfo>
            <div className="font-bold pb-1">{`مطمئنی دیگه نمیخوای ${name} رو دنبال کنی؟`}</div>

        </div>
    );
};
  
export default UnFollowModal;