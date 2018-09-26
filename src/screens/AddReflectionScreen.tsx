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
      <View style={styles.container}>
        <Text style={styles.error}> {this.state.error}</Text>
        <Ionicons
          name="md-camera"
          size={32}
          color="black"
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
        {reflectionViews}
      </View>
    )
  }

  private async addRelfection() {
    let user = firebase.auth().currentUser || { uid: '' }
    let reflection: Reflection = {
      image: this.state.image,
      text: this.state.text,
      feeling: Feeling.Happy,
      createdAt: firebase.firestore.Timestamp.now(),
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
