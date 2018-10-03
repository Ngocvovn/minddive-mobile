import { Facebook, ImagePicker, Permissions } from 'expo'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import {
  Alert,
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
import PrimaryButton from '../components/Buttons/PrimaryButton'
import LogoText from '../components/Text/LogoText'
import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'
import db from '../services/Db'
import { uploadImage } from '../services/FileServices'
import {
  addReflection,
  deleteReflection,
  Feeling,
  Reflection,
  updateReflection,
} from '../services/ReflectionService'
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
      <ImageBackgroundLayout>
        {this.state.error && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        <LogoText text="PregMind" />
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
        <PrimaryButton
          disabled={!this.validateInput()}
          onPress={() => this.loginWithEmailPassword()}
          title="Log in"
        />
        <Text
          style={[styles.signUpText, styles.signUpMargin]}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          Sign up as a new user
        </Text>
        <Text
          style={styles.signUpText}
          onPress={() => this.props.navigation.navigate('PasswordRecovery')}
        >
          Forgot password?
        </Text>
      </ImageBackgroundLayout>
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
