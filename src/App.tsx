import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Font } from 'expo'

import { RootNavigator } from './navigation/RootNavigator'
import { AuthStateProvider } from './services/AuthService'

import AppLoading from './components/Loading/AppLoading'

import { YellowBox } from 'react-native'
import _ from 'lodash'
YellowBox.ignoreWarnings(['Setting a timer'])
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
