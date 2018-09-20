import { createStackNavigator } from 'react-navigation'

import { LoginScreen } from '../screens/LoginScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { PasswordRecoveryScreen } from '../screens/PasswordRecovery'

export const AuthenticationNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  PasswordRecovery: { screen: PasswordRecoveryScreen }
})
