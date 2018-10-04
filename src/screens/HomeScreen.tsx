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

import db from '../services/Db'

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
          <Text>Tervetuloa</Text>
          <PrimaryButton
            title="Päiväkirja"
            onPress={() => this.props.navigation.navigate('Diary')}
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
