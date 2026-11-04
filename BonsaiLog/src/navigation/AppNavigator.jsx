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
    <Stack.Navigator initialRouteName="Directory">
      <Stack.Screen name="Directory" component={DirectoryScreen} options={{ title: 'Bonsai Species' }} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ title: 'Tree Details' }} />
      <Stack.Screen name="Collection" component={CollectionScreen} options={{ title: 'My Collection' }} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Care Schedule' }} />
      <Stack.Screen name="StylingGuide" component={StylingGuideScreen} options={{ title: 'Styling Guide' }} />
    </Stack.Navigator>
  );
}