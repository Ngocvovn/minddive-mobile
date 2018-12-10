import { Facebook } from 'expo'
import React, { Component } from 'react'
import { Alert, StyleSheet } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import AudioPlayer from '../components/Player/AudioPlayer'
import ScriptPlayer from '../components/Player/ScriptPlayer'
import DefaultLayout from '../layouts/DefaultLayout'
import sessions from '../sessions'

interface SessionInformationScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  session: object
}

interface SessionInformationScreenState {
  error?: string
  timestamp: number
  session: number
}

export class SessionInformationScreen extends Component<
  SessionInformationScreenProps,
  SessionInformationScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Informaatio',
  }

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      timestamp: 0,
      session: props.navigation.getParam('session', 21),
    }
  }

  public updateTimestamp = timestamp => {
    this.setState({ timestamp })
  }

  public navigateToExercise = () => {
    this.props.navigation.navigate('Exercise', { session: this.state.session })
  }

  public render(): React.ReactNode {
    console.log(this.state)
    const { audio, script, preview } = sessions[
      this.state.session
    ].default.information
    const { pictures, week, name } = sessions[this.state.session].default

    return (
      <DefaultLayout>
        <ScriptPlayer
          week={week}
          name={name}
          preview={preview}
          pictures={pictures && pictures}
          script={script}
          timestamp={this.state.timestamp}
        />
        <AudioPlayer
          track={audio}
          onAudioEnd={this.navigateToExercise}
          onTimestampUpdate={timestamp =>
            this.setState({ timestamp: timestamp })
          }
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
