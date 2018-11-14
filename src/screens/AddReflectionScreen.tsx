import { Ionicons } from '@expo/vector-icons'
import { Facebook } from 'expo'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import DefaultLayout from '../layouts/DefaultLayout'
import { pickImage } from '../services/FileServices'
import {
  addReflection,
  collection,
  Feeling,
  Reflection,
} from '../services/ReflectionService'
import { SignUpScreen } from './SignUpScreen'
import DiaryStore from '../stores/DiaryStore'

import db from '../services/Db'

interface AddReflectionScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface AddReflectionScreenState {
  text: string
  image?: string
  feeling: string
  error?: string
  reflections: Reflection[]
}

@observer
export class AddReflectionScreen extends Component<
  AddReflectionScreenProps,
  AddReflectionScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Lisää merkintä',
  }

  constructor(props: AddReflectionScreenProps) {
    super(props)
    this.state = {
      text: '',
      feeling: '',
      error: '',
      reflections: [],
    }
    this.addImage = this.addImage.bind(this)
    this.addNewReflection = this.addNewReflection.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <DefaultLayout>
        <Text style={styles.error}> {this.state.error}</Text>
        <Ionicons
          name="md-camera"
          size={32}
          color="black"
          onPress={this.addImage}
        />
        <TextInput
          autoCapitalize="sentences"
          autoCorrect={false}
          multiline={true}
          style={styles.textInput}
          onChangeText={text => this.setState({ text })}
          placeholder="Kirjoita merkintä"
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="sentences"
          autoCorrect={false}
          onChangeText={feeling => this.setState({ feeling })}
          placeholder="Fiilis"
        />
        <PrimaryButton
          onPress={() => this.addNewReflection()}
          title="Tallenna"
        />
      </DefaultLayout>
    )
  }

  private async addNewReflection() {
    const user = firebase.auth().currentUser || { uid: '' }
    const reflection: Reflection = {
      text: this.state.text,
      feeling: Feeling.Happy,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: user.uid,
    }
    if (this.state.image) {
      reflection.image = this.state.image
    }
    try {
      await DiaryStore.addReflection(reflection)
    } catch (e) {
      console.log(e)
    }
  }

  private async addImage() {
    const imageUrl: string = await pickImage()
    this.setState({ image: imageUrl })
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
