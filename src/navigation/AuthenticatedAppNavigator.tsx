/* tslint:disable:max-classes-per-file */
import { Facebook } from 'expo'
import * as React from 'react'
import { Alert, Button, Text, View } from 'react-native'
import {
  createStackNavigator,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import { AddUserInfoScreen } from '../screens/AddUserInfoScreen'
import { SessionScreen } from '../screens/SessionScreen'

import * as firebase from 'firebase'

import { AddReflectionScreen } from '../screens/AddReflectionScreen'
import { DiaryScreen } from '../screens/DiaryScreen'
import { ExerciseScreen } from '../screens/ExerciseScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { ReflectionScreen } from '../screens/ReflectionScreen'
import { SessionInformationScreen } from '../screens/SessionInformationScreen'
import { withAuthenticatedUser } from '../services/AuthService'

import variables from '../styles/variables'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export const AuthenticatedAppNavigator: NavigationContainer = createStackNavigator(
  {
    Home: {
      screen: AddReflectionScreen,
    },
    AddUser: {
      screen: AddUserInfoScreen,
    },
    AddReflection: {
      screen: AddReflectionScreen,
    },
    Diary: {
      screen: DiaryScreen,
    },
    Information: {
      screen: SessionInformationScreen,
    },
    Exercise: {
      screen: ExerciseScreen,
    },
    Reflection: {
      screen: ReflectionScreen,
    },
  },
  {
    initialRouteName: 'AddUser',
    navigationOptions: {
      headerStyle: {
        backgroundColor: variables.purpleGrey,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
)
