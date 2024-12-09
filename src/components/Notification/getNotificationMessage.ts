export const getNotificationMessage = (
  notifType:
    | "mention"
    | "comment"
    | "likePost"
    | "acceptFollow"
    | "reject"
    | "requestFollow"
    | "followedYou"
    | "followedOthers",
  actor: string | undefined,
  reciever: string | undefined,
) => {
  switch (notifType) {
    case "mention":
      return `${actor} توی اون یکی عکس تگت کرده!`;
    case "comment":
      return ` ${actor} برای  اون یکی عکس کامنت داده  !`;
    case "likePost":
      return `${actor} این عکس رو لایک کرده!`;
    case "acceptFollow":
      return `${actor} درخواست دوستی ات رو قبول کرده!`;
    case "reject":
      return `${actor} درخواستت رو رد کرده!`;
      case "requestFollow":
        return `${actor} درخواست دوستی داده!`;
    case "followedOthers":
      return `${actor}، ${reciever} رو دنبال کرده!`;
    case "followedYou":
      return `${actor} دنبالت کرده!`;
  }
};

