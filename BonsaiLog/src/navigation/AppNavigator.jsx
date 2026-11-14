import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DirectoryScreen from '../screens/DirectoryScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import StylingGuideScreen from '../screens/StylingGuideScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerTheme = {
  headerStyle: { backgroundColor: '#E8EDE6' },
  headerTintColor: '#2C5E43',
  headerTitleStyle: { fontWeight: 'bold', fontSize: 17 },
  headerTitleAlign: 'center',
  cardStyle: { backgroundColor: '#F7F4EF' },
};

function DirectoryStack() {
  return (
    <Stack.Navigator screenOptions={headerTheme}>
      <Stack.Screen
        name="DirectoryHome"
        component={DirectoryScreen}
        options={{ title: 'Bonsai Species Directory' }}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ title: 'Tree Profile Detail' }}
      />
    </Stack.Navigator>
  );
}

function TabIcon({ label, focused }) {
  const icons = {
    Directory: '📁',
    Collection: '🌿',
    Schedule: '📅',
    Guide: '📖',
  };
  return (
    <Text style={{ fontSize: focused ? 20 : 18, opacity: focused ? 1 : 0.7 }}>
      {icons[label] || '•'}
    </Text>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Directory"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.65)',
        tabBarStyle: {
          backgroundColor: '#3B5E4B',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Directory"
        component={DirectoryStack}
        options={{
          tabBarLabel: 'DIRECTORY',
          tabBarIcon: ({ focused }) => <TabIcon label="Directory" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          headerShown: true,
          ...headerTheme,
          headerTitle: 'My Bonsai Collection',
          tabBarLabel: 'COLLECTION',
          tabBarIcon: ({ focused }) => <TabIcon label="Collection" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          headerShown: true,
          ...headerTheme,
          headerTitle: 'Care Schedule',
          tabBarLabel: 'SCHEDULE',
          tabBarIcon: ({ focused }) => <TabIcon label="Schedule" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Guide"
        component={StylingGuideScreen}
        options={{
          headerShown: true,
          ...headerTheme,
          headerTitle: 'Styling Techniques Guide',
          tabBarLabel: 'GUIDE',
          tabBarIcon: ({ focused }) => <TabIcon label="Guide" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}