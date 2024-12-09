import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FetchPosts } from "./Posts/FetchPosts";
import ModalTemplatePost from "./Posts/ModalTemplatePost";
import ShowPostModal from "./Posts/ShowPostModal";

interface ShowPostsProps {
    searchedTag: string;
}

interface Posts {
  authorId: string;
  caption: string;
  createdAt: string;
  id: string;
  media: Media[];
}

interface Media {
  id: string;
  url: string;
}

const  TagSearchResult =({ searchedTag }: ShowPostsProps) => {

  const [showPostModal, setPostShowModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");
  const { ref, inView } = useInView();

  useEffect(() => {
    if (showPostModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showPostModal]);

  const token: string = localStorage.getItem("token") ?? "";

  const handleOnClick = (id: string) => {
    setSelectedPhotoId(id);
    setPostShowModal(true);
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isError, error } = useInfiniteQuery({
    queryKey: ["tagSearchResult", token, searchedTag],
    queryFn: async ({ pageParam = 1 }) => FetchPosts({ pageParam }, token, searchedTag),
    getNextPageParam: (lastPage) => lastPage?.data?.nextPage ?? undefined,
    initialPageParam: 1,
    enabled: !!token && !!searchedTag,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    toast.error(error.message);
  }

  const getColumnSpan = (index: number) => {
    if (index < 3) {
      return "col-span-4"; 
    } else if (index >= 3 && index < 7) {
      return "col-span-3"; 
    } else {
      return "col-span-2"; 
    }
  };

  const allPosts = data?.pages.flatMap((page) => page.data.posts) || [];

  return (
    <div className="my-8 grid rounded-3xl">
      <div className="grid grid-cols-12 gap-6">
        {allPosts.map((post: Posts, globalIndex: number) => (
          <img
            key={post.id}
            className={`aspect-square object-cover max-h-[304px] w-full cursor-pointer rounded-3xl ${
              globalIndex >= 7 ? "col-span-2" : getColumnSpan(globalIndex)
            }`}
            src={`${post.media[0].url}`}
            onClick={() => handleOnClick(post.id)}
          />
        ))}
      </div>

      {showPostModal && (
        <ModalTemplatePost
          onClose={() => setPostShowModal(false)}
          showModal={showPostModal}
        >
          <ShowPostModal onClose={() => setPostShowModal(false)} id={selectedPhotoId} />
        </ModalTemplatePost>
      )}
      <div className="flex justify-center" ref={ref}>
        {isFetching && <BeatLoader />}
      </div>
    </div>
  );
}

export default TagSearchResult