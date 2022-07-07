/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/ProfileScreen';
import PinScreen from '../screens/PinScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CreatePinScreen from '../screens/CreatePinScreen';
import AuthStackNavigator from './AuthStackNavigator';
import { useAuthenticationStatus } from '@nhost/react';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  const {isLoading, isAuthenticated} = useAuthenticationStatus()

  if(isLoading) {
    return<ActivityIndicator />
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
      ) : (
        <>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Pin" component={PinScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      </>
      )}
        
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="CreatePin"
        component={CreatePinScreen}
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => <Feather name="plus-circle" size={35} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={30} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
