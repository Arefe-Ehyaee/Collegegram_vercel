export interface Posts {
  authorId: string;
  caption: string;
  createdAt: string;
  id: string;
  media: Media[];
}

export interface Media {
  id: string;
  url: string;
}

export type FollowStatus =
  | "Following"
  | "NotFollowing"
  | "Pending"
  | "isBlocked"
  | "Blocked";

export interface User {
  id: string;
  avatar: { url: string };
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  followersCount: number;
  followingStatus: FollowStatus;
  followedStatus: FollowStatus;
  isCloseFriend: boolean;
}
