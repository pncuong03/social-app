import moment from "moment";

export const formatNoti = (notify) => {
  switch (notify) {
    case "ACCEPT_FRIEND_REQUEST":
      return "accepted the friend request";
    case "FRIEND_REQUEST":
      return "has sent a friend request";
    case "COMMENT":
      return "commented on your post";
    case "LIKE":
      return "liked on your post";
    case "SHARE":
      return "shared on your post";
    default:
      return notify.interactType;
  }
};

export const formatTime = (dateTime) => {
  return moment(dateTime).format("MMMM Do YYYY, h:mm:ss a");
};
export const formatTimes = (dateTime) => {
  return moment(dateTime).format("MMMM Do YYYY, h:mm:ss a");
};
