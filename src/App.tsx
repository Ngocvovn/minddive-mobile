import { Font } from 'expo'
import _ from 'lodash'
import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { YellowBox } from 'react-native'
import AppLoading from './components/Loading/AppLoading'
import { RootNavigator } from './navigation/RootNavigator'
import { AuthStateProvider } from './services/AuthService'

YellowBox.ignoreWarnings(['Setting a timer', 'Warning: Can'])

const _console = _.clone(console)

console.warn = (message: any) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message)
  }
}

interface AppState {
  fontLoaded: boolean
}
export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      fontLoaded: false,
    }
  }

  public async componentDidMount(): Promise<void> {
    if (!this.state.fontLoaded) {
      await Font.loadAsync({
        'grandhotel-regular': require('../assets/fonts/GrandHotel-Regular.ttf'),
        'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'nunito-semibold': require('../assets/fonts/Nunito-SemiBold.ttf'),
      })

      this.setState({ fontLoaded: true })
    }
  }

  public render(): React.ReactElement<{}> {
    if (this.state.fontLoaded) {
      return (
        <AuthStateProvider>
          <RootNavigator />
        </AuthStateProvider>
      )
    } else {
      return <AppLoading />
    }
  }
}
