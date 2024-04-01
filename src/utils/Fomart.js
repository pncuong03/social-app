import moment from "moment";

export const formatNoti = (notify) => {
  switch (notify) {
    case "ACCEPT_FRIEND_REQUEST":
      return "accepted the friend request";
    case "COMMENT":
      return "commented on the post";
    case "LIKE":
      return "liked on the post";
    case "SHARE":
      return "shared on the post";
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
