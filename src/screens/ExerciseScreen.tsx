import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import AudioPlayer from '../components/Player/AudioPlayer'
import ScriptPlayer from '../components/Player/ScriptPlayer'
import DefaultLayout from '../layouts/DefaultLayout'
import sessions from '../sessions'

interface ExerciseScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  session: number
}

interface ExerciseScreenState {
  error?: string
  timestamp: number
  session: number
}

export class ExerciseScreen extends Component<
  ExerciseScreenProps,
  ExerciseScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Harjoitus',
  }

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      timestamp: 0,
      session: props.navigation.getParam('session', {}),
    }
  }

  public updateTimestamp = timestamp => {
    this.setState({ timestamp })
  }

  public navigateToReflection = () => {
    this.props.navigation.navigate('Reflection', {
      session: this.state.session,
    })
  }

  public render(): React.ReactNode {
    const { audio, script, preview } = sessions[
      this.state.session
    ].default.exercise
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
          onAudioEnd={this.navigateToReflection}
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
