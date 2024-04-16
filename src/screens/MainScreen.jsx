import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import TopTabbar from "../navigation/TopTabbar";
import { fetchEventNoti } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthContext";

const MainScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await fetchEventNoti(userInfo.accessToken);
        setEvent(res);
        data();
      } catch (error) {
        console.error(error);
        setTimeout(data, 5000);
      }
    };
    data();

    return () => {
      clearTimeout(data);
    };
  }, []);
  return (
    <>
      <Header data={event} />
      <TopTabbar data={event} />
    </>
  );
};

export default MainScreen;
