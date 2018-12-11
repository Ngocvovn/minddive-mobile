import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import { H3, H2 } from '../components/Text/Header'
import Paragraph from '../components/Text/Paragraph'
import sessions from '../sessions'
import PrimaryButton from '../components/Buttons/PrimaryButton'
const baby = require('../sessions/1x/Asset3.png')

interface SessionDetailScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface SessionDetailScreenState {
  error?: string
  calendar: boolean
}

export class SessionDetailScreen extends Component<
  SessionDetailScreenProps,
  SessionDetailScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Viikko 21',
  }

  constructor(props: SessionDetailScreenProps) {
    super(props)
    this.state = {
      error: '',
      calendar: false,
    }
  }

  public render(): React.ReactNode {
    return (
      <View>
        <Image source={baby} style={{ height: 200 }} />
        <View style={styles.infoContainer}>
          <H3 text={sessions[21].default.name} />
          <Paragraph text={sessions[21].default.reflection.description} />
          <PrimaryButton
            title="Informatio"
            onPress={() =>
              this.props.navigation.navigate('Information', { session: 21 })
            }
            style={{ marginTop: 20 }}
          />
          <PrimaryButton
            title="Haroitus"
            onPress={() =>
              this.props.navigation.navigate('Exercise', { session: 21 })
            }
            style={{ marginTop: 20 }}
          />
          <PrimaryButton
            title="Reflekio"
            onPress={() =>
              this.props.navigation.navigate('Reflection', { session: 21 })
            }
            style={{ marginTop: 20 }}
          />
          <PrimaryButton
            title="Päiväkirja"
            style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('Diary')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  error: {
    textAlign: 'center',
    paddingBottom: 30,
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
