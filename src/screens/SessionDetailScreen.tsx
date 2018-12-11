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
import TextBoxWhite from '../layouts/TextBoxWhite'
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
      <View style={{ backgroundColor: 'white' }}>
        <Image source={baby} style={{ height: 200 }} />
        <View style={styles.infoContainer}>
          <H2 text={sessions[21].default.name} />
          <Paragraph text={sessions[21].default.description} />
          <PrimaryButton
            title="Informaatio"
            onPress={() =>
              this.props.navigation.navigate('Information', { session: 21 })
            }
            style={{ marginTop: 20 }}
          />
          <PrimaryButton
            title="Harjoitus"
            onPress={() =>
              this.props.navigation.navigate('Exercise', { session: 21 })
            }
            style={{ marginTop: 20 }}
          />
          <PrimaryButton
            title="Reflektio"
            onPress={() =>
              this.props.navigation.navigate('Reflection', { session: 21 })
            }
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    backgroundColor: 'white',
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
