export type ActionType =
  | "follow"
  | "requestFollow"
  | "acceptFollow"
  | "comment"
  | "likePost"
  | "mention";

  export interface ShowNotification {
    id: string;
    actionType: ActionType;
    media: {url:string} | null;
    actionDate: string;
    actor: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      followingStatus: TFollowStatus
      followedStatus: TFollowStatus
    };
    isSeen: boolean;
    content?: {
      [key in ActionType]?: unknown;
    };
  }

  export type TFollowStatus = "Pending" | "Blocked" | "Following" | "NotFollowing";

export interface FollowNotification {
    following: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      followingStatus: TFollowStatus
      followedStatus: TFollowStatus
    };
  }

  export interface CommentNotification {
    id: string;
    description: string;
  }

  
export interface MentionNotification {
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
    };
  }