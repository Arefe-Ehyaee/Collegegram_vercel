import { NavLink } from "react-router-dom";
import {  useEffect } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import NotificationComponent, {
  NotificationComponentprops,
} from "./NotificationComponent";
import NotifBadge from "./NotifBadge";
import { fetchMyFriendsNotifications } from "./fetch-requests/fetchMyFriendsNotifications";
import { ApiNotification } from "./MyNotificationPageComponent";
import defaultAvatar from "../../assets/icons/defaultavatar.svg";
import { fetchFriendsNotificationCount } from "./fetch-requests/fetchFriendsNotificationsCount";
import { fetchPersonalNotificationCount } from "./fetch-requests/fetchPersonalNotificationsCount";
import { markNotificationsAsSeen } from "./fetch-requests/patchNotifications";
import { CommentNotification, FollowNotification } from "./backendInterface";

export interface Notif {
  notifCounts: number;
}

export default function MyFriendssNotificationPageComponent() {
  const token: string = localStorage.getItem("token") ?? "";
  const { ref, inView } = useInView();

  const { data: personalNotifData } = useQuery({
    queryKey: ["personal notification count"],
    queryFn: fetchPersonalNotificationCount,
    refetchOnWindowFocus: true,
  });
  const { data: friendsNotifData } = useQuery({
    queryKey: ["friends notification count"],
    queryFn: fetchFriendsNotificationCount,
    refetchOnWindowFocus: true,
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["friendsNotifications", token],
    queryFn: async ({ pageParam = 1 }) =>
      fetchMyFriendsNotifications({ pageParam }, token),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!token,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (notificationIds: string[]) =>
      markNotificationsAsSeen(notificationIds, token),
    onSuccess: () => {
      console.log("Notifications marked as seen successfully");
    },
    onError: (error) => {
      console.error("Failed to mark notifications as seen", error);
    },
  });

  useEffect(() => {
    const unseenNotificationIds: string[] | undefined = data?.pages
      .flatMap((page) => page.data?.notifications)
      .filter((notification: ApiNotification) => !notification.isSeen)
      .map((notification: ApiNotification) => notification.id);

    if (unseenNotificationIds && unseenNotificationIds.length > 0) {
      mutation.mutate(unseenNotificationIds);
      queryClient.invalidateQueries({
        queryKey:['navbar notification count'],
      });
      queryClient.invalidateQueries({
        queryKey: ["friends notification count"]
      })
      queryClient.invalidateQueries({
        queryKey: ["personal notification count"]
      })
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div dir="rtl" className="px-[72px] max-sm:pr-2">
      <div className="mt-10 flex justify-start max-sm:justify-center">
        <NavLink to="/myNotifications">
          <div className="flex">
            <h2 className="block px-5 font-isf text-xl text-grey-400 max-sm:px-2 max-sm:text-sm">
              اعلانات من
            </h2>
            {personalNotifData &&
              personalNotifData.data.countUnseenNotifications > 0 && (
                <NotifBadge
                  notifCounts={personalNotifData.data.countUnseenNotifications}
                ></NotifBadge>
              )}
          </div>
        </NavLink>

        <span className="px-4">|</span>

        <NavLink to="/myFriendsNotifications">
          <div className="flex">
            <h2 className="block px-5 font-isf text-xl max-sm:px-2 max-sm:text-sm">
              اعلانات دوستان من
            </h2>
            {friendsNotifData &&
              friendsNotifData.data.countUnseenNotifications > 0 && (
                <NotifBadge
                  notifCounts={friendsNotifData.data.countUnseenNotifications}
                ></NotifBadge>
              )}
          </div>
        </NavLink>
      </div>
      <div className="overflow-y-auto pt-16">
      {data?.pages.flatMap((page) =>
        page.data?.notifications.map((notification: ApiNotification) => {
          const {
            actionType,
            actionDate,
            actor,
            isSeen,
            media,
            content
          } = notification;

          let commentDescription = '';
          if (actionType === 'comment' && content?.comment) {
            commentDescription = (content.comment as CommentNotification).description;
          }
          let followedStatus = actor.followedStatus;
          let followingStatus = actor.followingStatus;
          let userId = actor.id;
          let receiver = '';

          if (actionType === 'follow' && content?.follow) {
            followedStatus = (content.follow as FollowNotification).following.followedStatus;
            followingStatus = (content.follow as FollowNotification).following.followingStatus;
            userId = (content.follow as FollowNotification).following.id;
            receiver = content.follow.following.firstName || content.follow.following.lastName ? `${content.follow.following.firstName} ${content.follow.following.lastName}`.trim() : content.follow.following.username;
          }
        

          const notificationProps: NotificationComponentprops = {
            followedStatus: followedStatus,
            followingStatus: followingStatus,
            notifType:
              actionType === "follow"
                ? "followedOthers"
                : (actionType as NotificationComponentprops["notifType"]),
            actor: actor
              ? actor.firstName || actor.lastName
                ? `${actor.firstName ?? ""} ${actor.lastName ?? ""}`.trim()
                : actor.username
              : undefined,
            seen: isSeen,
            receiver: receiver,
            comment: commentDescription,
            avatar: media?.url ? media.url : defaultAvatar,
            userId: userId,
            actionDate: actionDate
          };

          return (
            <NotificationComponent
              key={notification.id}
              {...notificationProps}
            />
          );
        }),
      )}
        <div className="flex justify-center" ref={ref}>
          {isFetching && <BeatLoader />}
        </div>
      </div>
    </div>
  );
}
