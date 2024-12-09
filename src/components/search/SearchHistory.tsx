import search from "../../assets/icons/Frame.svg";

interface SearchHistoryProps {
    text: string;
    className?: string;
}

const SearchHistory = ({ text, className} : SearchHistoryProps) => {
    return (
        <div className={`flex gap-4 items-center max-md:pr-8 py-1 ${className}`} dir="rtl">
            <img src={search} alt="search" className="h-4 w-4"/>
            <div>{text}</div>
        </div>
    );
}

export default SearchHistory;