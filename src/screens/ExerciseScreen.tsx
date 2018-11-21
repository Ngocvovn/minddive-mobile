import { Facebook } from 'expo'
import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import AudioPlayer from '../components/Player/AudioPlayer'
import ScriptPlayer from '../components/Player/ScriptPlayer'
import DefaultLayout from '../layouts/DefaultLayout'

interface ExerciseScreenProps {
  session: object
}

export class ExerciseScreen extends Component {
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
    this.props.navigation.navigate('Reflection', { session: this.state.session })
  }

  public render(): React.ReactNode {
    const { audio, script, preview } = this.state.session.exercise
    const { pictures, week, name } = this.state.session
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