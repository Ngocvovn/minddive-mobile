import { Facebook } from 'expo'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'


import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import LogoText from '../components/Text/LogoText';
import db from '../services/Db'

import { DiaryScreen } from '../screens/DiaryScreen'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface HomeScreenState {
  error?: string
}

export class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props)
    this.state = {
      error: '',
    }
  }

  public render(): React.ReactNode {
    return (
      <ImageBackgroundLayout>
        <View>
          <LogoText text="PregMind" />
          <PrimaryButton
            title="Päiväkirja"
            onPress={() => this.props.navigation.navigate('Diary')}
          />
          <PrimaryButton
            title="Sessio"
            onPress={() => this.props.navigation.navigate('Information')}
          />
        </View>
      </ImageBackgroundLayout>
    )
  }
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
  },
})
