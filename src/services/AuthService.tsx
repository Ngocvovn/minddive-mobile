import * as firebase from 'firebase'
require('firebase/firestore')
import hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { AsyncStorage, Button, Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

const { Consumer, Provider } = React.createContext<null | firebase.User>(null)

firebase.initializeApp({
  apiKey: 'AIzaSyAYlM5kr5rYCfCY9SzkqDZR19VfKygoFxk',
  authDomain: 'mindive-449e6.firebaseapp.com',
  databaseURL: 'https://mindive-449e6.firebaseio.com',
  projectId: 'mindive-449e6',
  storageBucket: 'mindive-449e6.appspot.com',
  messagingSenderId: '49215748476',
})

interface AuthStateState {
  user: firebase.User | null
}

export class AuthStateProvider extends React.Component<{}, AuthStateState> {
  private unsubscribed?: firebase.Unsubscribe

  constructor(props: {}) {
    super(props)
    this.state = {
      user: null,
    }
  }

  public componentDidMount(): void {
    this.unsubscribed = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ user }))
  }

  public componentWillMount(): void {
    if (this.unsubscribed) {
      this.unsubscribed()
    }
  }

  public render(): React.ReactNode {
    return <Provider value={this.state.user}>{this.props.children}</Provider>
  }
}

export function withAuthenticatedUser<P>(
  Component: React.ComponentType<P & { user: firebase.User }>,
): React.ComponentType<P> {
  const Inner: React.SFC<NavigationInjectedProps & P> = props => {
    return (
      <Consumer>
        {user => {
          if (!user) {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>You need to sign in!</Text>
                <Button
                  title="Go to Log In"
                  onPress={() => {
                    props.navigation.navigate('Login')
                  }}
                />
              </View>
            )
          }

          return <Component {...props} user={user} />
        }}
      </Consumer>
    )
  }

  return hoistNonReactStatics(withNavigation(Inner), Component)
}
