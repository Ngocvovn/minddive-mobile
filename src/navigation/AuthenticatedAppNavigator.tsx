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

import * as firebase from 'firebase'

import { AddReflectionScreen } from '../screens/AddReflectionScreen'
import { DiaryScreen } from '../screens/DiaryScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { SessionInformationScreen } from '../screens/SessionInformationScreen'
import { ExerciseScreen } from '../screens/ExerciseScreen'
import { ReflectionScreen } from '../screens/ReflectionScreen'
import { withAuthenticatedUser } from '../services/AuthService'

import variables from '../styles/variables'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

/*
class HomeScreen extends React.Component<HomeScreenProps> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Home',
  }

  public render(): React.ReactNode {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }
        />
        <Button
          title="Log out"
          onPress={() => {
            firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}
        />
      </View>
    )
  }
} */

class DetailsScreen extends React.Component<{
  navigation: NavigationScreenProp<
    {},
    {
      itemId: number
      otherParam: string
    }
  >
  user: firebase.User
}> {
  public static navigationOptions: NavigationScreenConfig<
    NavigationStackScreenOptions
  > = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    }
  }

  public render(): React.ReactNode {
    const { navigation, user } = this.props
    user.getIdToken().then(console.info)
    console.info(JSON.stringify(user))
    const itemId = navigation.getParam('itemId', 0)
    const otherParam = navigation.getParam('otherParam', 'some default value')

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>User email: {user.email} </Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: 'Titlte Updated!' })
          }
        />
      </View>
    )
  }
}

export const AuthenticatedAppNavigator: NavigationContainer = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddUser: {
      screen: AddUserInfoScreen,
    },
    Details: {
      screen: withAuthenticatedUser(DetailsScreen),
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
