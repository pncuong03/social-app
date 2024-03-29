import FriendScreen from '../screens/FriendScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScrren from '../screens/NotificationScrren';
import MenuScreen from '../screens/MenuSreen';


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
  {
    id: 4,
    route: MenuScreen,
    name: 'Menu',
    activeIconName: 'menu-sharp',
    activeiconType: 'Ionicons',
    inactiveIconName: 'menu-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },

];
