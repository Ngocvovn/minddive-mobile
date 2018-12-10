import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import { ProgressCircle } from 'react-native-svg-charts'

import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'
import { H3, H2 } from '../components/Text/Header'
import Paragraph from '../components/Text/Paragraph'
import sessions from '../sessions'
import PrimaryButton from '../components/Buttons/PrimaryButton'

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
    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 },
    ]
    console.log(sessions[21].default.reflection.description)
    return (
      <ImageBackgroundLayout>
        <Text style={styles.error}>
          <H2 text="Viikko 21" />
        </Text>
        <ProgressCircle
          style={{ height: 200 }}
          progress={0.6}
          strokeWidth={10}
          progressColor={'rgb(134, 65, 244)'}
        />
        <View style={styles.infoContainer}>
          <H3 text={sessions[21].default.name} />
          <Paragraph text={sessions[21].default.reflection.description} />
          <PrimaryButton
            title="Sessioon"
            onPress={() =>
              this.props.navigation.navigate('Information', { session: 21 })
            }
            style={{ marginTop: 20 }}
          />
        </View>
      </ImageBackgroundLayout>
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
