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
import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'

import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { CheckBox } from 'react-native-elements'
import { addInfo } from '../services/ReflectionService'
import LogoText from '../components/Text/LogoText'
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
    headerRight: (
      <Button
        onPress={() => firebase.auth().signOut()}
        title="Info"
        color="#fff"
      />
    ),
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
      <ImageBackgroundLayout>
        <Text style={styles.error}> {this.state.error}</Text>
        <LogoText text="Tervetuloa," />
        <Text>Laskettu aika</Text>
        {!calendar ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 13,
              marginTop: 10,
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          >
            <Text style={{ paddingTop: 10 }}>
              {new Date(this.state.dueDate).toDateString()}
            </Text>
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
          title="Are you mother ?"
          checked={this.state.isMother}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            padding: 0,
          }}
          onPress={() => this.setState({ isMother: !this.state.isMother })}
        />
        <PrimaryButton onPress={this.add1UserInfo} title="Tallenna" />
      </ImageBackgroundLayout>
    )
  }

  async add1UserInfo() {
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
