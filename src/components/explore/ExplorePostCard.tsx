import PosterInfo, { PosterInfoProps } from "./PosterInfo";
import PostCardInteractions, {
  PostInteractionsProps,
} from "./PostCardInteractions";

interface ExplorePostCardProps {
  posterInfoProps: PosterInfoProps;
  postCardInteractionProps: PostInteractionsProps;
  postImageSrc: string;
  onClick?: () => void
}

const ExplorePostCard = (props: ExplorePostCardProps) => {
  const { posterInfoProps, postCardInteractionProps, postImageSrc, onClick } = props;
  const closeFriendsOnly = postCardInteractionProps.closeFriendsOnly
  const borderColor = closeFriendsOnly ? "border-2 border-green-500" : "border border-grey-400"
  return (
    <div dir="rtl" className={`flex flex-col rounded-3xl max-w-full max-h-[27.5rem]  ${borderColor} `}>
      <img src={postImageSrc} alt="PostCard Main Image" className="max-w-full max-h-[19rem] aspect-square cursor-pointer object-cover rounded-t-3xl" onClick={onClick}/>
      <PostCardInteractions {...postCardInteractionProps} />
      <PosterInfo {...posterInfoProps} />
    </div>
  );
};

export default ExplorePostCard;
