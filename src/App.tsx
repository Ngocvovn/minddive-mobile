import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { RootNavigator } from './navigation/RootNavigator'
import { getClient } from './services/ApoloClient'
import { AuthStateProvider } from './services/AuthService'

interface AppState {
  text: string
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
  }

  public render(): React.ReactElement<{}> {
    return (
      <ApolloProvider client={getClient()}>
        <AuthStateProvider>
          <RootNavigator />
        </AuthStateProvider>
      </ApolloProvider>
    )
  }
}
