import { useEffect, useState } from "react";
import ShowPostModal from "./ShowPostModal";
import ModalTemplatePost from "./ModalTemplatePost";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FetchPosts } from "./FetchPosts";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

interface ShowPostsProps {
  username: string;
}

interface Posts {
  authorId: string;
  caption: string;
  createdAt: string;
  id: string;
  media: Media[];
  closeFriendsOnly: boolean;
}

interface Media {
  id: string;
  url: string;
}

export default function ShowPostsComponent({ username }: ShowPostsProps) {
  const [showPostModal, setPostShowModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");
  const token: string = localStorage.getItem("token") ?? "";
  const { ref, inView } = useInView();

  useEffect(() => {
    if (showPostModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showPostModal]);

  const handleOnClick = (id: string) => {
    setSelectedPhotoId(id);
    setPostShowModal(true);
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['posts', token, username],
    queryFn: async ({ pageParam = 1 }) => FetchPosts({ pageParam }, token , username),
    getNextPageParam: (lastPage) => {
        return lastPage?.data?.nextPage ?? undefined; 
    },
    initialPageParam: 1,
    enabled: !!token && !!username,
  });

  useEffect (() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  } , [inView, hasNextPage, fetchNextPage])

  // console.log(data.data.posts);

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  if (isError) {
    toast.error(error.message);
  }


  return (
    <div className="my-8 grid rounded-3xl ">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-4">
        {data && 
          data?.pages.flatMap((page) => 
          page.data?.posts.map((post: Posts) => (
            <img
              key={post.id}
              className={`aspect-square object-cover max-h-[304px] w-full cursor-pointer rounded-3xl ${post.closeFriendsOnly ? "border-2 border-green-500" : "border border-grey-400"}`}
              src={`${post.media[0].url}`}
              onClick={() => handleOnClick(post.id)}
            />
          )))}
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
        {isFetching && (<BeatLoader/>)}
      </div>
    </div>
  );
}
