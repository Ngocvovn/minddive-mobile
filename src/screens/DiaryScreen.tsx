import { Facebook } from 'expo'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import { SignUpScreen } from './SignUpScreen'
import {
  addReflection,
  Reflection,
  Feeling,
  collection,
} from '../services/ReflectionService'
import { pickImage } from '../services/FileServices'
import DefaultLayout from '../layouts/DefaultLayout'
import BottomRightFixed from '../layouts/BottomRightFixed'
import RoundButton from '../components/Buttons/RoundButton'

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
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import db from '../services/Db'

interface DiaryScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface DiaryScreenState {
  error?: string
  reflections: Array<Reflection>
}

export class DiaryScreen extends Component<
  DiaryScreenProps,
  DiaryScreenState
  > {
  public static navigationOptions: NavigationStackScreenOptions = ({ navigation }) => {
    return {
      title: 'Päiväkirja',
    }
  }

  constructor(props: DiaryScreenProps) {
    super(props)
    this.state = {
      error: '',
      reflections: [],
    }
  }

  async componentDidMount() {
    let user = firebase.auth().currentUser || { uid: '' }
    let query = await collection.where('createdBy', '==', user.uid).get()

    let reflections: Array<Reflection> = []
    query.docs.forEach(doc => {
      reflections.push(doc.data())
    })
    this.setState({ reflections: reflections })
  }

  public render(): React.ReactNode {
    let reflectionViews = this.state.reflections.map((reflection, index) => {
      return (
        <View key={index}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: reflection.image }}
          />
          <Text>{reflection.text}</Text>
          <Text>{reflection.createdAt.toDate().toLocaleDateString()}</Text>
          <Text>{reflection.feeling}</Text>
        </View>
      )
    })
    return (
      <DefaultLayout>
        <Text style={styles.error}> {this.state.error}</Text>
        {reflectionViews}
        <BottomRightFixed>
          <RoundButton
            onPress={() => this.props.navigation.navigate('AddReflection')} />
        </BottomRightFixed>
      </DefaultLayout>
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
