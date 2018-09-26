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
import { Ionicons } from '@expo/vector-icons'
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
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
  reflections?: Array<Reflection>
}

export class AddReflectionScreen extends Component<
  AddReflectionScreenProps,
  AddReflectionScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Add Reflection',
  }

  constructor(props: AddReflectionScreenProps) {
    super(props)
    this.state = {
      text: '',
      image: '',
      feeling: '',
      error: '',
      reflections: [],
    }
    this.addImage = this.addImage.bind(this)
    this.addRelfection = this.addRelfection.bind(this)
  }

  async componentDidMount() {
    const dab = firebase.firestore()
    let user = firebase.auth().currentUser || { uid: '' }
    let query = collection.where('createdBy', '==', user.uid)

    let reflections = await query.get()
    let asd = reflections.docs
    setTimeout(() => {
      console.log('aa')
    }, 1)
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.error}> {this.state.error}</Text>
        <Ionicons
          name="md-checkmark-circle"
          size={32}
          color="green"
          onPress={this.addImage}
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={text => this.setState({ text })}
          placeholder="Text"
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={feeling => this.setState({ feeling })}
          placeholder="Feeling"
        />
        <Button onPress={this.addRelfection} title="Submit" />
      </View>
    )
  }

  private async addRelfection() {
    let user = firebase.auth().currentUser || { uid: '' }
    let reflection: Reflection = {
      image: this.state.image,
      text: this.state.text,
      feeling: Feeling.Happy,
      createdAt: new Date(),
      createdBy: user.uid,
    }
    console.log(reflection)
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
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
