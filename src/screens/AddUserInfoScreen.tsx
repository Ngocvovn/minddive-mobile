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
import DefaultLayout from '../layouts/DefaultLayout'
import PrimaryButton from '../components/Buttons/PrimaryButton'

import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { CheckBox } from 'react-native-elements'
import { addInfo } from '../services/ReflectionService'
interface AddUserInfoScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface AddUserInfoScreenState {
  dueDate: number
  isMother: boolean
  error?: string
  calendar: boolean
}

export class AddUserInfoScreen extends Component<
  AddUserInfoScreenProps,
  AddUserInfoScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Lisää merkintä',
  }

  constructor(props: AddUserInfoScreenProps) {
    super(props)
    this.state = {
      dueDate: new Date().getTime(),
      isMother: true,
      error: '',
      calendar: false,
    }

    this.add1UserInfo = this.add1UserInfo.bind(this)
  }

  public render(): React.ReactNode {
    const { calendar } = this.state
    return (
      <DefaultLayout>
        <Text style={styles.error}> {this.state.error}</Text>
        <Text>{new Date(this.state.dueDate).toDateString()}</Text>
        {!calendar ? (
          <View>
            <Ionicons
              name="md-calendar"
              size={32}
              color="black"
              onPress={() => this.setState({ calendar: !this.state.calendar })}
            />
          </View>
        ) : (
          <Calendar
            onDayPress={date =>
              this.setState({ dueDate: date.timestamp, calendar: !calendar })
            }
            minDate={new Date().toDateString()}
          />
        )}

        <CheckBox
          checked={this.state.isMother}
          onPress={() => this.setState({ isMother: !this.state.isMother })}
        />
        <Text>Are you mother?</Text>
        <PrimaryButton onPress={this.add1UserInfo} title="Tallenna" />
      </DefaultLayout>
    )
  }

  async add1UserInfo() {
    console.log('asdas')
    try {
      await addInfo({
        dueDate: firebase.firestore.Timestamp.fromMillis(this.state.dueDate),
        isMother: this.state.isMother,
      })
      this.props.navigation.navigate('Home')
    } catch (e) {
      console.log(e)
    }
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
