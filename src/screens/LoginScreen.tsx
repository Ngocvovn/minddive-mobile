import { Facebook, ImagePicker, Permissions } from 'expo'
import * as firebase from 'firebase'
import db from '../services/Db'
import React, { Component } from 'react'
import {
  Feeling,
  Reflextion,
  addReflextion,
  updateReflextion,
  deleteReflextion,
} from '../services/ReflextionService'
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
import { uploadImage } from '../services/FileServices'
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
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
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
