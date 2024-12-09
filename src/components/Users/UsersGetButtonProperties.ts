export type FollowStatus =
| "Following"
| "NotFollowing"
| "Pending"
| "isBlocked"
| "Blocked";

export const getButtonProperties = (followingStatus: FollowStatus, followedStatus: FollowStatus) => {
    if (followedStatus === "Blocked" || followingStatus === "Blocked") {
      return {
        text: "+ دنبال کردن",
        className: "bg-grey-700",
      };
    }

    if (followingStatus === "Following") {
      return {
        text: "دنبال نکردن",
        className: "bg-grey-100 ml-1 border border-red-200 !text-red-200",
      };
    } else if (followingStatus === "Pending") {
      return {
        text: "لغو درخواست",
        className: "bg-grey-100 ml-1 border border-red-200 !text-red-200",
      };
    } else {
      return {
        text: "دنبال کردن",
        className: "bg-red-200 ml-1 text-white",
      };
    }
  };