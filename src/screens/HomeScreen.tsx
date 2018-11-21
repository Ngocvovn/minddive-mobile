import { Facebook } from 'expo'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View,  Dimensions } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'

import LogoText from '../components/Text/LogoText'
import db from '../services/Db'

import SessionInfo from '../components/Sessions/SessionInfo'
import { DiaryScreen } from '../screens/DiaryScreen'

import sessions from '../sessions'

const CURRENT_WEEK = 21

function diff_weeks(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7);
  return Math.abs(Math.round(diff));
  
 }

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface HomeScreenState {
  error?: string
}

const { width } = Dimensions.get('window');


export class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {

  public const sessionCards = Object.keys(sessions).map(s => {
    return (
      <SessionInfo key={sessions[s].default.week.toString()} 
      navigate={week => this.navigate(week)}
      navigateReflection={week => this.navigateReflection(week)}
      session={sessions[s].default} />
    )
  })
  constructor(props: HomeScreenProps) {
    super(props)
    this.state = {
      error: '',
    }
  }

  public navigate = week => {
    this.props.navigation.navigate('Information', { session: sessions[week].default })
  }

  public navigateReflection = week => {
    this.props.navigation.navigate('Reflection', { session: sessions[week].default })
  }

  public render(): React.ReactNode {
    return (
      <ImageBackgroundLayout>
        <View style={styles.container}>
          <ScrollView
            alwaysBounceHorizontal={true}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={width - 60}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
          >
            {this.sessionCards}
          </ScrollView>
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
  container: {
    flex: 1,
  },
  error: {
    textAlign: 'center',
  },
})

/** 
<PrimaryButton
            title="Päiväkirja"
            onPress={() => this.props.navigation.navigate('Diary')}
          />
          <PrimaryButton
            title="Sessio"
            onPress={() => this.props.navigation.navigate('Information')}
          />
*/
