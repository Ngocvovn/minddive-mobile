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
import PrimaryButton from '../components/Buttons/PrimaryButton'
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

interface AddReflectionScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface AddReflectionScreenState {
  text: string
  image?: string
  feeling: string
  error?: string
  reflections: Array<Reflection>
}

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
          style={styles.textInput}
          onChangeText={text => this.setState({ text })}
          placeholder="Merkinnän nimi"
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="sentences"
          autoCorrect={false}
          multiline={true}
          onChangeText={feeling => this.setState({ feeling })}
          placeholder="Kerro fiilikset"
        />
        <PrimaryButton
          onPress={() => this.addNewReflection()}
          title="Tallenna"
        />
      </DefaultLayout>
    )
  }

  private async addNewReflection() {
    let user = firebase.auth().currentUser || { uid: '' }
    let reflection: Reflection = {
      text: this.state.text,
      feeling: Feeling.Happy,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: user.uid,
    }
    if (this.state.image) {
      console.log('image')
      reflection.image = this.state.image
    }
    try {
      await addReflection(reflection)
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
