import * as firebase from 'firebase'
import React, { Component } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'
interface SignUpScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface SignUpScreenState {
  email: string
  password: string
  firstName: string
  lastName: string
  error?: string
}

export class SignUpScreen extends Component<
  SignUpScreenProps,
  SignUpScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Sign Up',
  }

  public static readonly EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // Spec:
  //   Length > 6
  //   Valid char: "a-z" "0-9" "A-Z" plus special chars in https://www.owasp.org/index.php/Password_special_characters
  public static readonly PASSWORD_REGEX: RegExp = /^[a-z0-9A-Z !"#$%&'()*+,.\/:;<=>?@[\]\\^_`{|}~-]{6,}$/
  public static readonly NAME_REGEX: RegExp = /^[a-zA-Z]{1,40}$/

  constructor(props: SignUpScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }

    this.signUpWithEmailPassword = this.signUpWithEmailPassword.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <ImageBackgroundLayout>
        <View style={styles.container}>
          <Text style={styles.error}> {this.state.error}</Text>
          <View style={styles.nameInputRow}>
            <TextInput
              style={styles.nameInput}
              autoCorrect={false}
              onChangeText={firstName => this.setState({ firstName })}
              placeholder="First Name"
            />
            <TextInput
              style={styles.nameInput}
              autoCorrect={false}
              onChangeText={lastName => this.setState({ lastName })}
              placeholder="Last Name"
            />
          </View>
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
            onPress={this.signUpWithEmailPassword}
            title="Sign up"
          />
        </View>
      </ImageBackgroundLayout>
    )
  }

  private validateInput(): boolean {
    return (
      SignUpScreen.EMAIL_REGEX.test(this.state.email.toLowerCase()) &&
      SignUpScreen.PASSWORD_REGEX.test(this.state.password) &&
      SignUpScreen.NAME_REGEX.test(this.state.firstName) &&
      SignUpScreen.NAME_REGEX.test(this.state.lastName)
    )
  }

  private async signUpWithEmailPassword(): Promise<void> {
    const { email, password } = this.state
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    try {
      const authCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      this.props.navigation.navigate('App')
    } catch (error) {
      console.log(error)
      const errorCode = error.code
      let errorInfo
      if (errorCode === 'auth/weak-password') {
        errorInfo = 'The password is too weak'
      } else if (errorCode === 'auth/email-already-in-use') {
        errorInfo = 'Given email already exists'
      } else if (errorCode === 'auth/invalid-email') {
        errorInfo = 'Given email is invalid'
      } else {
        errorInfo = 'Unknown error! Please contact us'
      }
      this.setState({ error: errorInfo })
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
    paddingBottom: 10,
  },
  error: {
    textAlign: 'center',
  },
  nameInput: {
    flex: 1,
    paddingBottom: 10,
  },
  nameInputRow: {
    flexDirection: 'row',
    margin: 10,
    paddingLeft: 20,
  },
})
