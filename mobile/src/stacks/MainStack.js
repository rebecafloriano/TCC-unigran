import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from '../stacks/MainTab';
import Doctor from '../screens/Doctor';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >

        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
<<<<<<< HEAD
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Doctor" component={Doctor} />

=======
        <Stack.Screen  name="MainTab" component={MainTab} />
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
    </Stack.Navigator>
)
