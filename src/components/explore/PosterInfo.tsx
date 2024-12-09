import defaultAvatar from "../../assets/icons/defaultavatar.svg"
import verified from "../../assets/icons/_Verified.svg";


export interface PosterInfoProps {
    name: string;
    className?: string;
    avatar?: string;
    followersCount?: number;
    isCloseFriend?:boolean
}



const PosterInfo = (props:PosterInfoProps) => {
    const { name, className, avatar, followersCount, isCloseFriend } = props
    return (
        <div className={`flex gap-4 items-center p-4 ${className}`} dir="rtl">
          <div className="relative aspect-square h-14 rounded-full object-cover">
          <img
            src={avatar ? avatar : defaultAvatar}
            alt="avatar"
            className="aspect-square h-14 w-14 rounded-full object-cover"
          />
          {isCloseFriend && (
            <img
              src={verified}
              alt="verified"
              className="absolute bottom-0 left-0 h-[20px] w-[20px]"
            />
          )}
        </div>            <div>
                <div className="text-xs leading-5 font-bold">{name}</div>
                <div className="text-[0.5rem] leading-4 font-normal" dir='rtl'>{` ${followersCount} دنبال کننده`}</div>
            </div>
        </div>
    );
}

export default PosterInfo;