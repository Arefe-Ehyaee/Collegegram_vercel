
interface AvatarNameProps {
    name: string;
    className?: string;
    avatar?: string;
}

const AvatarName: React.FC<AvatarNameProps> = ({ name, className, avatar }) => {
    return (
        <div className={`flex gap-4 items-center max-md:pr-6 ${className}`} dir="rtl">
            <img src={avatar} alt="avatar" className="h-[48px] w-[48px]  rounded-full border border-grey-400"/>
            <div>{name}</div>
        </div>
    );
}

export default AvatarName;