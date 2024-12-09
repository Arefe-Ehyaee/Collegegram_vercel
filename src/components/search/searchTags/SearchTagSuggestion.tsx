
interface SearchTagSuggestionProps {
    name: string;
    className?: string;
    avatar?: string;
}

const SearchTagSuggestion = ({ name, className, avatar } : SearchTagSuggestionProps) => {
    return (
        <div className={`flex gap-4 items-center max-md:pr-6 ${className}`} dir="rtl">
            <div>{name}</div>
        </div>
    );
}

export default SearchTagSuggestion;