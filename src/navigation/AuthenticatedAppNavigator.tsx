/* tslint:disable:max-classes-per-file */
import * as React from 'react'
import {
  createStackNavigator,
  NavigationContainer,
  NavigationScreenProp,
} from 'react-navigation'
import { AddUserInfoScreen } from '../screens/AddUserInfoScreen'
import { SessionScreen } from '../screens/SessionScreen'
import { DiaryScreen } from '../screens/DiaryScreen'
import { ExerciseScreen } from '../screens/ExerciseScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { ReflectionScreen } from '../screens/ReflectionScreen'
import { SessionInformationScreen } from '../screens/SessionInformationScreen'
import { SessionDetailScreen } from '../screens/SessionDetailScreen'

import variables from '../styles/variables'
import UserStore from '../stores/UserStore'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export const AuthenticatedAppNavigator: NavigationContainer = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddUser: {
      screen: AddUserInfoScreen,
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
    Session: {
      screen: SessionScreen,
    },
    SessionDetail: {
      screen: SessionDetailScreen,
    },
  },
  {
    initialRouteName: UserStore.userInfo.dueDate ? 'AddUser' : 'Session',
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
