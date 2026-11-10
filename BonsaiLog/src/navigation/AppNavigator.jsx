import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DirectoryScreen from '../screens/DirectoryScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import StylingGuideScreen from '../screens/StylingGuideScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Directory"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E8EDE6',
        },
        headerTintColor: '#2C5E43',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 17,
        },
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: '#F7F4EF',
        },
      }}
    >
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ title: 'Bonsai Species Directory' }}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ title: 'Tree Profile Detail' }}
      />
      <Stack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{ title: 'My Bonsai Collection' }}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: 'Pruning & Repotting Schedule' }}
      />
      <Stack.Screen
        name="StylingGuide"
        component={StylingGuideScreen}
        options={{ title: 'Styling Techniques Guide' }}
      />
    </Stack.Navigator>
  );
}