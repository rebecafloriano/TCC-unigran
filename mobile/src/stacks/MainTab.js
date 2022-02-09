import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default () => (
<<<<<<< HEAD
    <Tab.Navigator  screenOptions={{
        headerShown: false
    }} tabBar={props=><CustomTabBar {...props}></CustomTabBar>}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Appointments" component={Appointments} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Profile" component={Profile} />
=======
    <Tab.Navigator  tabBar={props=><CustomTabBar {...props} />}>
        <Tab.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Tab.Screen options={{ headerShown: false }} name="Search" component={Search} />
        <Tab.Screen options={{ headerShown: false }} name="Appointments" component={Appointments} />
        <Tab.Screen options={{ headerShown: false }} name="Favorites" component={Favorites} />
        <Tab.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
    </Tab.Navigator>
);
