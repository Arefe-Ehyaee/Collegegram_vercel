import send from "../../../assets/icons/send.svg";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PostAComment } from "./PostAComments";

export interface CommentingComponentProps {
  avatar: string;
  styling?: string;
  id: string;
  commnetUsername?: string | null;
  parentId?: string | null;
  // onCommentSent?: () => void;
}
const CommentingComponent = (props: CommentingComponentProps) => {
  const { avatar, id, styling, commnetUsername, parentId } = props;

  const comment = useRef<HTMLInputElement | null>(null);
  const token: string = localStorage.getItem("token") ?? "";
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);

  const handleSendClick = async () => {
    if (isSending) return;
    setIsSending(true);

    const commentValue = comment.current?.value ?? "";
    if (token && comment.current) {
      try {
        await PostAComment(token, id, commentValue, parentId ?? null);
        comment.current.value = "";
        queryClient.invalidateQueries({ queryKey: ["comments", token] });
        queryClient.invalidateQueries({ queryKey: ["post", id] });
        queryClient.refetchQueries({ queryKey: ["post", id] });
      } catch (error) {
        console.error("Error sending comment:", error);
      } finally {
        setIsSending(false);
      }
    } else {
      setIsSending(false);
    }
  };

  const placeholderText = commnetUsername
    ? `در پاسخ به ${commnetUsername} نظر خود را بنویسید...`
    : "نظر خود را بنویسید...";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendClick();
  };

  return (
    <div
      className="flex w-[100%] items-center gap-2 px-4 pb-2 pt-8 max-md:gap-1"
      dir="rtl"
    >
      <img
        src={avatar}
        alt="avatar"
        className="h-[40px] w-[40px] rounded-full border border-grey-400"
      />
      <form onSubmit={handleFormSubmit} className="h-[100%] w-[100%]">
        <input
          ref={comment}
          type="text"
          id="comment"
          name="comment"
          className={`flex h-[100%] w-[100%] flex-col items-center rounded-3xl border border-grey-400 py-2 pr-2 font-isf text-xs font-normal placeholder-grey-400 ${styling}`}
          dir="rtl"
          placeholder={placeholderText}
          onKeyDown={handleKeyDown}
        />
      </form>
      <button onClick={handleSendClick}>
        <img
          src={send}
          alt="send"
          className="max-md:h-[40px] max-md:w-[40px]"
        />
      </button>
    </div>
  );
};

export default CommentingComponent;
