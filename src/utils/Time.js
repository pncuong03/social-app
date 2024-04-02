import React, { useState, useEffect } from "react";
import moment from "moment";
import { Text } from "react-native";

const TimeComparison = ({ time }) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeDifferenceText = () => {
    const diff = moment().diff(moment(time));

    if (diff < 60000) {
      return "Just now";
    } else if (diff < 3600000) {
      return moment().diff(moment(time), "minutes") + " minutes ago";
    } else if (diff < 86400000) {
      return moment().diff(moment(time), "hours") + " hours ago";
    } else if (diff < 30 * 24 * 3600000) {
      return moment().diff(moment(time), "days") + " days ago";
    } else {
      return moment(time).format("YYYY-MM-DD");
    }
  };
  return <Text>{getTimeDifferenceText()}</Text>;
};

export default TimeComparison;
