import moment from "moment";

export const formatNoti = (notify) => {
  switch (notify) {
    case "ACCEPT_FRIEND_REQUEST":
      return "accepted the friend request";
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
