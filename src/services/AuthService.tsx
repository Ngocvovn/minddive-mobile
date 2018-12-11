import * as firebase from 'firebase'
import hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { AsyncStorage, Button, Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { init } from '../services/FireBase'
const { Consumer, Provider } = React.createContext<null | firebase.User>(null)

init()
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

// React high-order component which will return React component
// If firebase user is existed it will return Home Screen otherwise it will redirect to log in screen
export function withAuthenticatedUser<P>(
  Component: React.ComponentType<P & { user: firebase.User }>,
): React.ComponentType<P> {
  console.log('userss')
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
