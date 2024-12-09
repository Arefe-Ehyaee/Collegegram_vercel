import { BeatLoader } from "react-spinners";
import ModalTemplatePost from "../Posts/ModalTemplatePost";
import ShowPostModal from "../Posts/ShowPostModal";
import ExplorePostCard from "./ExplorePostCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchExplore } from "./fetchExplore";
import { useInView } from "react-intersection-observer";
import BlankExploreComponent from "./BlankExploreComponent";
import defaultAvatar from "../../assets/icons/defaultavatar.svg"

interface Avatar {
  url: string;
}
interface Author {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  followersCount: number;
  avatar: Avatar | null;
  isCloseFriend:boolean
}
interface Posts {
  author: Author;
  id: string;
  media: string;
  likesCount :number;
  bookmarksCount: number;
  commentsCount: number;
  isBookmarked: boolean;
  isLiked: boolean;
  closeFriendsOnly: boolean;
}

const ExploreComponent = () => {
  const [showPostModal, setPostShowModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");

  const { ref, inView } = useInView();

  const token: string = localStorage.getItem("token") ?? ""


  const handleOnClick = (id: string) => {
    setSelectedPhotoId(id);
    setPostShowModal(true);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["explore", token],
    queryFn: async ({ pageParam = 1 }) =>
      fetchExplore({ pageParam }, token || ""),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!token,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // console.log(data.data.posts);

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }



  return data ? (
    <div className="my-8 mx-8 grid rounded-3xl ">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-4">
        {data.pages.flatMap((page) =>
          page.data?.posts.map((post: Posts) => {
            const posterInfoProps = {
              name: post.author.username,
              followersCount: post.author.followersCount,
              avatar: post.author.avatar?.url || defaultAvatar,
              isCloseFriend: post.author.isCloseFriend
            };
  
            const postCardInteractionProps = {
              likes: post.likesCount,
              comments: post.commentsCount,
              bookmarks: post.bookmarksCount,
              id: post.id,
              isLiked: post.isLiked,
              isBookmarked: post.isBookmarked,
              closeFriendsOnly: post.closeFriendsOnly,
            };
  
            const postImageSrc = post.media[0] || "";
            return (
              <ExplorePostCard
                key={post.id}
                posterInfoProps={posterInfoProps}
                postCardInteractionProps={postCardInteractionProps}
                postImageSrc={postImageSrc}
                onClick={() => handleOnClick(post.id)}
              />
            );
          })
        )}
      </div>
  
      {showPostModal && (
        <ModalTemplatePost
          onClose={() => setPostShowModal(false)}
          showModal={showPostModal}
        >
          <ShowPostModal
            onClose={() => setPostShowModal(false)}
            id={selectedPhotoId}
          />
        </ModalTemplatePost>
      )}
  
      <div className="flex justify-center" ref={ref}>
        {isFetching && <BeatLoader />}
      </div>
    </div>
  ) : (
    <BlankExploreComponent />
  );
  
};

export default ExploreComponent;
