import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TopTabbar from "../navigation/TopTabbar";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from "../../UserContext";

const MainScreen = () => {

  return (
    <>
      <Header />
      <TopTabbar />
    </>


  );
};

export default MainScreen;