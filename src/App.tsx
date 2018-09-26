import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { RootNavigator } from './navigation/RootNavigator'
import { AuthStateProvider } from './services/AuthService'

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
  text: string
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
  }

  public render(): React.ReactElement<{}> {
    return (
      <AuthStateProvider>
        <RootNavigator />
      </AuthStateProvider>
    )
  }
}
