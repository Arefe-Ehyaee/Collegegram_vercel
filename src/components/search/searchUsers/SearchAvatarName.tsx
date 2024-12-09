
interface SearchAvatarNameProps {
    name: string;
    className?: string;
    avatar?: string;
}

const SearchAvatarName = ({ name, className, avatar } : SearchAvatarNameProps) => {
    return (
        <div className={`flex gap-4 items-center max-md:pr-6 ${className}`} dir="rtl">
            <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full border border-grey-400"/>
            <div>{name}</div>
        </div>
    );
}

export default SearchAvatarName;