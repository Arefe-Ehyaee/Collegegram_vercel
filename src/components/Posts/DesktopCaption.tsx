import Mention from "./MentionComponent";

interface CaptionProps {
    date: string;
    caption: string;
    mentions?: string[]
}

const Caption: React.FC<CaptionProps> = ({ date, caption, mentions }) => {
    return (
        <div className="mt-5" dir="rtl">
            <div className="font-isf font-normal text-[11px] max-md:px-6" dir="rtl">
                {date}
            </div>
            <div className="font-isf text-sm font-normal text-wrap mt-4 max-md:px-6" dir="rtl">
                {caption}
            </div>
            <div className="mt-4 max-md:px-6">
                {mentions?.map((mention:string) => (
                    <Mention text={mention}></Mention>
                ))}
            </div>
            
        </div>
    );
}

export default Caption;