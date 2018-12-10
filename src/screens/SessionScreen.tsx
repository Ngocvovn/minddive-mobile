import * as firebase from 'firebase'
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TextBase,
} from 'react-native'
import { observer } from 'mobx-react'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import { ProgressCircle } from 'react-native-svg-charts'
import DefaultLayout from '../layouts/DefaultLayout'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { CheckBox } from 'react-native-elements'
import { addInfo } from '../services/ReflectionService'
import LogoText from '../components/Text/LogoText'
interface SessionScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface SessionScreenState {
  dueDate: number
  isMother: boolean
  error?: string
  calendar: boolean
}

export class SessionScreen extends Component<
  SessionScreenProps,
  SessionScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: '',
  }

  constructor(props: SessionScreenProps) {
    super(props)
    this.state = {
      dueDate: new Date().getTime(),
      isMother: true,
      error: '',
      calendar: false,
    }
  }

  public render(): React.ReactNode {
    const { calendar } = this.state
    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 },
    ]
    return (
      <ImageBackgroundLayout>
        <Text style={styles.error}> {this.state.error}</Text>
        <ProgressCircle
          style={{ height: 200 }}
          progress={0.7}
          strokeWidth={10}
          progressColor={'rgb(134, 65, 244)'}
        />
      </ImageBackgroundLayout>
    )
  }
}

const styles = StyleSheet.create({
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
