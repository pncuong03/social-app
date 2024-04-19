import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import TopTabbar from "../navigation/TopTabbar";
import { fetchEvent } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthContext";

const MainScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await fetchEvent(userInfo.accessToken);
        setEvent(res);
        data();
      } catch (error) {
        console.error(error);
      }
    };
    data();
  }, []);

  return (
    <>
      <Header data={event} />
      <TopTabbar data={event} />
    </>
  );
};

export default MainScreen;
