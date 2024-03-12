import FriendScreen from '../screens/FriendScreen';
import HomeScreen from '../screens/HomeScreen';
import MarketPlaceScreen from '../screens/MarketPlaceScreen';
import NotificationScrren from '../screens/NotificationScrren';
// import Profile from '../screens/Profile';
import WatchScreen from '../screens/WatchScreen';

export const TabData = [
  {
    id: 1,
    route: HomeScreen,
    name: 'Home',
    activeIconName: 'home',
    activeiconType: 'Entypo',
    inactiveIconName: 'home-outline',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 28,
  },
  {
    id: 2,
    route: FriendScreen,
    name: 'Friends',
    activeIconName: 'people-sharp',
    activeiconType: 'Ionicons',
    inactiveIconName: 'people-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },
  // {
  //   id: 3,
  //   route: WatchScreen,
  //   name: 'Watch',
  //   activeIconName: 'youtube-tv',
  //   activeiconType: 'MaterialCommunityIcons',
  //   inactiveIconName: 'television-play',
  //   inactiveIconType: 'MaterialCommunityIcons',
  //   size: 25,
  //   unFocusSize: 25,
  // },
  // {
  //   id: 4,
  //   route: MarketPlaceScreen,
  //   name: 'MarketPlace',
  //   activeIconName: 'shop',
  //   activeiconType: 'Entypo',
  //   inactiveIconName: 'storefront-outline',
  //   inactiveIconType: 'MaterialCommunityIcons',
  //   size: 25,
  //   unFocusSize: 25,
  // },
  {
    id: 3,
    route: NotificationScrren,
    name: 'Notification',
    activeIconName: 'notifications',
    activeiconType: 'Ionicons',
    inactiveIconName: 'notifications-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },
  // {
  //   id: 4,
  //   route: Profile,
  //   name: 'Profile',
  //   activeIconName: 'person',
  //   activeiconType: 'Ionicons',
  //   inactiveIconName: 'person-outline',
  //   inactiveIconType: 'Ionicons',
  //   size: 24,
  //   unFocusSize: 24,
  // },
];
