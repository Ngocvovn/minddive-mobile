import { Facebook } from 'expo'
import React, { Component } from 'react'
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import AudioPlayer from '../components/Player/AudioPlayer'
import ScriptPlayer from '../components/Player/ScriptPlayer'
import DefaultLayout from '../layouts/DefaultLayout'
import sessions from '../sessions'

const WEEK = 21

interface SessionInformationScreenProps {
  session: object
}

export class SessionInformationScreen extends Component {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Informaatio',
  }

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      timestamp: 0,
      session: props.navigation.getParam('session', {}).default,
    }
  }

  public updateTimestamp = timestamp => {
    this.setState({ timestamp })
  }
  public render(): React.ReactNode {
    const { audio, script } = this.state.session.information
    const pictures = this.state.session.informationPictures
    return (
      <DefaultLayout>
        <ScriptPlayer
          pictures={pictures && pictures}
          script={script}
          timestamp={this.state.timestamp}
        />
        <AudioPlayer
          track={audio}
          onTimestampUpdate={timestamp => this.updateTimestamp(timestamp)}
        />
      </DefaultLayout>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
