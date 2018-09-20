import { Facebook } from 'expo'
import * as firebase from 'firebase'
import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import { SignUpScreen } from './SignUpScreen'

interface LoginScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface LoginScreenState {
  email: string
  password: string
  error?: string
}

export class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Log In',
  }

  constructor(props: LoginScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }

    this.loginWithEmailPassword = this.loginWithEmailPassword.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Button onPress={this.loginWithFacebook} title="Log in with Fakebook" />
        {this.state.error && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
        />
        <Button
          disabled={!this.validateInput()}
          onPress={this.loginWithEmailPassword}
          title="Log in"
        />
        <Text
          style={[styles.signUpText, styles.signUpMargin]}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          Sign up as a new user!
        </Text>
        <Text
          style={styles.signUpText}
          onPress={() => this.props.navigation.navigate('PasswordRecovery')}
        >
          Forget password
        </Text>
      </View>
    )
  }

  private async loginWithFacebook(): Promise<void> {
    signInWithFacebook(this.setState, () =>
      this.props.navigation.navigate('App'),
    )
  }

  private validateInput(): boolean {
    return (
      SignUpScreen.EMAIL_REGEX.test(this.state.email.toLowerCase()) &&
      SignUpScreen.PASSWORD_REGEX.test(this.state.password)
    )
  }

  private async loginWithEmailPassword(): Promise<void> {
    const { email, password } = this.state
    const { navigation } = this.props
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInWithEmailAndPassword
    try {
      const authCred = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      navigation.navigate('App')
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      let errorInfo
      if (errorCode === 'auth/invalid-email') {
        errorInfo = 'Invalid email provided'
      } else if (errorCode === 'auth/user-disabled') {
        errorInfo = 'Given email has been disabled. Please contact us!'
      } else {
        errorInfo = 'Non-registered email address or wrong password'
      }
      this.setState({
        error: errorInfo,
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    margin: 10,
    paddingLeft: 20,
  },
  error: {
    textAlign: 'center',
  },
  signUpMargin: {
    marginTop: 80,
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
})

export async function signInWithFacebook(
  setState: (_: { error: string }) => void,
  success: (_: firebase.auth.UserCredential) => void,
): Promise<void> {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '1901480836828140',
    {
      permissions: ['public_profile', 'email'],
    },
  )

  if (type !== 'success' || !token) {
    return Alert.alert('Cancelled!', 'Login was cancelled!')
  }

  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}`,
  )
  const fbProfile = await response.json()

  Alert.alert('Logged in!', `Hi ${fbProfile.name}!`)

  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAndRetrieveDataWithCredential
  try {
    const credential = firebase.auth.FacebookAuthProvider.credential(token)
    const authCredentials = await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
    success(authCredentials)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    let errorInfo
    if (errorCode === 'auth/account-exists-with-different-credential') {
      const otherCredentialProviders = await firebase
        .auth()
        .fetchProvidersForEmail(this.state.email)
      errorInfo = `You could not login with Facebook for now. Please login with ${otherCredentialProviders.join(
        ', or',
      )}.`
    } else if (errorCode === 'auth/invalid-credential') {
      errorInfo = 'Invalid Facebook credentials. Please retry.'
    } else if (errorCode === 'auth/user-disabled') {
      errorInfo = 'This account been disabled. Please contact us.'
    } else {
      console.info(errorCode, errorMessage)
      errorInfo = 'Could not log you in. Please retry.'
    }
    setState({ error: errorInfo })
  }
}
