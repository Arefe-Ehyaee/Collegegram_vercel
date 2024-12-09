import AvatarName from "../AvatarName";
import whitePen from "../../assets/icons/whitePen.svg";
import DesktopCaption from "./DesktopCaption";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FetchPost } from "./FetchPost";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PostInteractions from "./PostInteractions";
import openPostPage from "../../assets/icons/Group 21.svg";
import { useNavigate } from "react-router-dom";
import timeTranslate from "../../utilities/timeTranslationFunction";
import CustomButton from "../CustomButton";
import ModalTemplate from "../ModalTemplate";
import EditPostsModal from "../upload-edit-posts/EditPostModal";
import { PostInteractionsProps } from "../explore/PostCardInteractions";
import defaultAvatar from "../../assets/icons/defaultavatar.svg"

interface ShowPostModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  id: string;
}

const ShowPostModal = ({ onClose, id }: ShowPostModalProps) => {
  const userProfile = useRecoilValue(userProfileAtom);
  console.log("profileData", userProfile);

  const token: string = localStorage.getItem("token") ?? "";
  const [editPostModal, setEditPostModal] = useState(false);
  const navigate = useNavigate();

  const handleEditPostClick = () => {
    setEditPostModal(true);
  };

  const handleOnClick = () => {
    if (data && id) {
      navigate(`/posts/${id}`, { state: { post: data, postId: id } });
    }
  };

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => FetchPost(token, id),
    enabled: !!token,
  });

  const postInteractionProps: PostInteractionsProps = data?.data?.media
    ? {
        likes: data.data.likesCount ?? 0,
        comments: data.data.commentsCount ?? 0,
        bookmarks: data.data.bookmarksCount ?? 0,
        id: data.data.id ?? "",
        isLiked: data.data.isLiked ?? false,
        isBookmarked: data.data.isBookmarked ?? false,
      }
    : {
        likes: 0,
        comments: 0,
        bookmarks: 0,
        id: "",
        isLiked: false,
        isBookmarked: false,
      };

  return (
    <div className="max-w-[1200px] max-sm:pt-[120px] max-sm:h-[900px] max-sm:overflow-y-auto no-scrollbar" dir="rtl">
      <button onClick={handleOnClick}>
        <img src={openPostPage} alt="Open Post" />
      </button>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="h-auto md:min-w-96 w-full md:max-w-[520px]">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="md:w-full"
            modules={[Navigation]}
          >
            {data?.data?.media &&
              data.data.media.map((post: any) => (
                <SwiperSlide key={post.id}>
                  <img
                    src={`${post.url}`}
                    className="h-[400px] w-[520px] rounded-3xl object-cover max-sm:h-[375px] max-sm:w-[100%]"
                    alt="Post media"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="flex h-[500px] flex-col gap-3 overflow-auto">
          <div className="flex items-center justify-between gap-12">
            <AvatarName
              name={data?.data?.author?.username ?? ""}
              avatar={data?.data?.author?.avatar?.url || defaultAvatar}
            />

            {userProfile?.username === data?.data.author.username && (
              <>
                <div className="hidden md:block">
                  <CustomButton
                    text={"ویرایش پست"}
                    iconsrc={whitePen}
                    className="ml-1 bg-red-200"
                    handleOnClick={handleEditPostClick}
                  />
                </div>
              </>
            )}
          </div>
          {data && (
            <DesktopCaption
              date={timeTranslate(data.data.createdAt)}
              caption={data.data.caption}
              mentions={data.data.mentions}
            />
          )}
          <div className="flex justify-end">
            <PostInteractions {...postInteractionProps} />
          </div>
        </div>
      </div>
      {editPostModal && (
        <ModalTemplate
          showModal={editPostModal}
          onClose={() => setEditPostModal(false)}
        >
          <EditPostsModal
            onClose={() => setEditPostModal(false)}
            postData={data.data}
            postId={id}
          />
        </ModalTemplate>
      )}
    </div>
  );
};

export default ShowPostModal;
