import deleteRed from "../../assets/icons/deleteRed.svg"

interface SearchTermDisplayProps {
    text: string;
    onClick: () => void;
}

const SearchTermDisplay = ({ text, onClick } : SearchTermDisplayProps) => {
    return (
        <div className={"inline-flex gap-4 items-center justify-between text-xl truncate h-9 border border-red-300 rounded-full px-4 my-2 w-fit"} dir="rtl">
            <img src={deleteRed} onClick={onClick} alt="delete" className="h-4 w-4"/>
            <div className="text-red-300">{text}</div>
        </div>
    );
}

export default SearchTermDisplay;