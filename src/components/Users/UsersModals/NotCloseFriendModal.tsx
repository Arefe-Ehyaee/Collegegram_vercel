
interface NotCloseFriendModalProps {
    name: string;
}


const NotCloseFriendModal:React.FC<NotCloseFriendModalProps> = ({name}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <div className="font-bold pb-1">{`مطمئنی میخوای ${name} رو از دوستای نزدیکت حذف کنی؟`}</div>
            <div className="text-sm leading-7">
            اگر از دوستان نزدینکت حذفش کنی؛ دیگه نمی‌تونه پیام‌های مخصوص دوستان نزدیک رو ببینه اما هنوز دوست تو باقی می‌مونه.
            </div>
        </div>
    );
};
  
export default NotCloseFriendModal;