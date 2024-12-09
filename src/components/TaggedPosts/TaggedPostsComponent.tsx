import { useInfiniteQuery } from '@tanstack/react-query';
import  { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import ModalTemplatePost from '../Posts/ModalTemplatePost';
import ShowPostModal from '../Posts/ShowPostModal';
import { fetchTaggedPosts } from './fetchTaggedPosts';

interface Posts {
    authorId: string;
    caption: string;
    createdAt: string;
    id: string;
    media: Media[];
  }
  
  interface Media {
    id: string;
    mime: string;
    name: string;
    url: string;
    size: number;
  }

const TaggedPostsComponent = () => {
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
    queryKey: ['TaggedPosts', token],
    queryFn: async ({ pageParam = 1 }) => fetchTaggedPosts({ pageParam }, token),
    getNextPageParam: (lastPage) => {
        return lastPage?.data?.nextPage ?? undefined; 
    },
    initialPageParam: 1,
    enabled: !!token,
  });

  useEffect (() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  } , [inView, hasNextPage, fetchNextPage])

  if (isError) {
    toast.error(error.message);
  }
  return (
    <div dir='rtl'className='mt-12 mx-16'>
      <h1 className='text-2xl font-bold font-isf'>تگ‌‌شده‌ها</h1>
    <div className=" grid my-8 rounded-3xl ">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-4">
        {data && 
          data?.pages.flatMap((page) => 
          page.data?.posts.map((post: Posts) => (
            <img
              key={post.id}
              className="aspect-square object-cover max-h-[304px] w-full cursor-pointer rounded-3xl"
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
    </div>
  );
}

export default TaggedPostsComponent