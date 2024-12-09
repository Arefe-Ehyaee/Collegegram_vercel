import { useEffect, useState } from "react";
import ShowPostsComponent from "../Posts/ShowPostsComponent";
import EditProfileModal from "./EditProfileModal";
import ModalTemplate from "../ModalTemplate";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import FollowerFollowing  from "../FollowerFollowing";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FetchFollowers } from "./FetchFollowers";
import { FetchFollowings } from "./FetchFollowings";
import CustomButton from "../CustomButton";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import defaultAvatar from "../../assets/icons/defaultavatar.svg"


export interface Follower {
  id: string;
  avatar: {url:string};
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  followersCount: number;
  isCloseFriend:boolean
}

export interface Following {
  id: string;
  avatar: {url:string};
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  followersCount: number;
  isCloseFriend:boolean
}

export default function ProfilePageComponent() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const token: string = localStorage.getItem("token") ?? "";
  const [FollowerListModal, setFollowerListModal] = useState(false);
  const [FollowingListModal, setFollowingListModal] = useState(false);
  const { ref: followerRef, inView: followerInView } = useInView();
  const { ref: followingRef, inView: followingInView } = useInView();

  // useEffect(() => {
  //   if (FollowerListModal) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [FollowerListModal]);

  const queryClient = useQueryClient();

  const {
    data: followersData,
    fetchNextPage: fetchNextPageFollowers,
    hasNextPage: hasNextPageFollowers,
    isFetching: isFetchingFollowers,
    isError: isErrorFollowers,
    error: followersError,
    refetch: refetchFollowers,
  } = useInfiniteQuery({
    queryKey: ["followers", userProfile.id],
    queryFn: async ({ pageParam = 1 }) =>
      FetchFollowers({ pageParam }, userProfile.id , token ),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!FollowerListModal && !!token,
  });

  useEffect(() => {
    if (followerInView && hasNextPageFollowers) {
      refetchFollowers();
    }
  }, [followerInView, hasNextPageFollowers, fetchNextPageFollowers]);

  const {
    data: followingsData,
    fetchNextPage: fetchNextPageFollowing,
    hasNextPage: hasNextPageFollowing,
    isFetching: isFetchingFollowing,
    isError: isErrorFollowing,
    error: followingsError,
    refetch: refetchFollowing,
  } = useInfiniteQuery({
    queryKey: ["followings", userProfile.id],
    queryFn: async ({ pageParam = 1 }) =>
      FetchFollowings({ pageParam }, userProfile.id , token),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!FollowingListModal && !!token,
  });

  useEffect(() => {
    if (followingInView && hasNextPageFollowing) {
      refetchFollowing();
    }
  }, [followingInView, hasNextPageFollowers, fetchNextPageFollowing]);

  // console.log("followingsData", followingsData);

  const handleShowFollowers = () => {
    setFollowerListModal((prevState) => !prevState);
    if (!FollowerListModal) {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      refetchFollowers();
    }
    console.log("followersData", followersData?.pages[0]);
    // console.log("followersData", followersData?.pages[0]);
  };

  // if (isFetchingFollowers) {
  //   return <span>Loading...</span>;
  // }

  if (followersError) {
    return <span>Error: {followersError.message}</span>;
  }

  const handleShowFollowings = () => {
    setFollowingListModal((prevState) => !prevState);
    if (!FollowingListModal) {
      queryClient.invalidateQueries({ queryKey: ["followings"] });
      refetchFollowing();
    }
  };

  // if (isFetchingFollowing) {
  //   return <span>Loading...</span>;
  // }

  if (followingsError) {
    return <span>Error: {followingsError.message}</span>;
  }

  return (
    <div dir="rtl" className="px-16 max-sm:h-[750px] overflow-y-scroll">
      <div className="border-b border-grey-400 py-9">
        <h2 className="mb-9 block font-isf text-xl font-bold max-sm:hidden">
          صفحه من
        </h2>
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
          <div className="flex items-center gap-8">
            <img
              src={userProfile.avatar || defaultAvatar}
              alt="avatar"
              className="aspect-square h-[136px] w-[136px] rounded-full border-2 border-grey-400 object-cover max-sm:h-[56px] max-sm:w-[56px] max-sm:self-baseline"
            />
            <div className="ml-4">
              <p className="text-right text-sm text-golden" dir="ltr">
                {`@${userProfile.username}`}
              </p>
              <h3 className="mt-4 text-xl font-bold text-green-100">
                {`${userProfile.firstName} ${userProfile.lastName}`}
              </h3>
              <div className="mt-4 flex gap-x-3 text-sm font-normal text-green-200">
                <button className="border-l pl-3" onClick={handleShowFollowers}>
                  {userProfile.followersCount} دنبال کننده
                </button>
                <button
                  className="border-l pl-3"
                  onClick={handleShowFollowings}
                >
                  {userProfile.followingsCount} دنبال شونده
                </button>
                <span className="pl-3">{userProfile.postsCount} پست</span>
              </div>
              <p className="mt-4 text-sm text-grey-400 max-sm:justify-self-center">
                {userProfile.bio}
              </p>
            </div>
          </div>

          <CustomButton
            size="large"
            text="ویرایش پروفایل"
            className="bg-red-200"
            handleOnClick={() => setShowEditModal(true)}
          />
        </div>
      </div>
      <ShowPostsComponent username={userProfile.username} />
      {showEditModal && (
        <ModalTemplate
          onClose={() => setShowEditModal(false)}
          mainComponent={
            <EditProfileModal
              onClose={() => setShowEditModal(false)}
              profileImage={userProfile.avatar || defaultAvatar}
            />
          }
          showModal={showEditModal}
        />
      )}
      {FollowerListModal && (
        <ModalTemplate
          onClose={() => setFollowerListModal(false)}
          showModal={FollowerListModal}
        >
          <div className="pb-8 text-xl font-bold">دنبال کننده ها</div>
          <div className="max-h-[450px] min-h-[300px] overflow-y-scroll">
            {followersData &&
              !isFetchingFollowers &&
              followersData.pages.map((page) =>
                page.map((follower: Follower) => (
                  <FollowerFollowing
                    id={follower.id}
                    key={follower.id}
                    name={follower.username}
                    followersNumber={follower.followersCount}
                     avatar={ follower?.avatar?.url || defaultAvatar}
                     isCloseFriend={follower.isCloseFriend}
                     FollowerFollowingList = {"FollowerList"}
                  />
                )),
              )}
          </div>
          <div className="flex justify-center" ref={followerRef}>
            {isFetchingFollowers && (<BeatLoader/>)}
          </div>
          <CustomButton
            text={"بستن"}
            className="mt-[34px] bg-red-200"
            handleOnClick={() => setFollowerListModal(false)}
          ></CustomButton>
        </ModalTemplate>
      )}

      {FollowingListModal && (
        <ModalTemplate
          onClose={() => setFollowingListModal(false)}
          showModal={FollowingListModal}
        >
          <div className="pb-8 text-xl font-bold">دنبال شونده ها</div>
          {/* {isFetchingFollowing && <BeatLoader />} */}
          <div className="max-h-[450px] min-h-[300px] overflow-y-scroll">
          {followingsData &&
              !isFetchingFollowing &&
              followingsData?.pages.map((page) =>
                page?.map((following: Following) => (
                  <FollowerFollowing
                    id={following.id}
                    key={following.id}
                    name={following.username}
                    followersNumber={following.followersCount}
                    avatar={following?.avatar?.url || defaultAvatar}
                    isCloseFriend={following.isCloseFriend}
                    FollowerFollowingList = {"FollowingList"}
                  />
                )),
              )}
          </div>
          <div className="flex justify-center" ref={followingRef}>
            {isFetchingFollowing && (<BeatLoader/>)}
          </div>
          <CustomButton
            text={"بستن"}
            className="mt-[34px] bg-red-200"
            handleOnClick={() => setFollowingListModal(false)}
          ></CustomButton>
        </ModalTemplate>
      )}
    </div>
  );
}
