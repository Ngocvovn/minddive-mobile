import { Permissions, Camera } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  ScrollView,
} from 'react-native'

import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import GreenTitleBox from '../components/Boxes/GreenTitleBox'
import CursiveParagraph from '../components/Text/CursiveParagraph'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import DefaultLayout from '../layouts/DefaultLayout'
import sessions from '../sessions'
import { Answer, Reflection } from '../services/ReflectionService'
import { pickImage } from '../services/FileServices'
import DiaryStore from '../stores/DiaryStore'

interface ReflectionScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface ReflectionScreenState {
  text: string
  image?: string
  feeling: string
  error?: string
  video?: string
  message: string
  recording: boolean
  session: number
  answers: Answer[]
}

export class ReflectionScreen extends Component<
  ReflectionScreenProps,
  ReflectionScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Harjoitus',
  }
  camera: any = null

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      error: '',
      session: props.navigation.getParam('session', 21),
      answers: new Array<Answer>(4),
      feeling: 'Happy',
      message: '',
      recording: false,
      image: '',
    }
    this.addImage = this.addImage.bind(this)
    this.saveReflection = this.saveReflection.bind(this)
    this.startVideo = this.startVideo.bind(this)
    this.stopVideo = this.stopVideo.bind(this)
  }

  public updateAnswer = (text, index) => {
    let answers = Object.assign({}, this.state.answers)
    answers[index] = {
      answer: text,
      questionNumber: index,
    }
    this.setState({ answers: answers })
  }

  public render(): React.ReactNode {
    const { description, questions } = sessions[
      this.state.session
    ].default.reflection
    return (
      <DefaultLayout>
        <ScrollView>
          <CursiveParagraph text={description} style={styles.paragragph} />
          {questions.map((item, index) => (
            <GreenTitleBox key={`question-${index}`} title={item.question}>
              <TextInput
                style={{ padding: 10, textAlignVertical: 'top', fontSize: 20 }}
                multiline={true}
                numberOfLines={4}
                underlineColorAndroid="transparent"
                placeholder={
                  item.placeholder ? item.placeholder : 'Kerro vapaasti'
                }
                onChangeText={text => this.updateAnswer(text, index)}
              />
            </GreenTitleBox>
          ))}

          <View style={styles.alignHorizontally}>
            <Text style={styles.capture} onPress={this.startVideo}>
              Start
            </Text>

            <Text style={styles.capture} onPress={this.stopVideo}>
              Stop
            </Text>
            <Camera
              ref={cam => {
                this.camera = cam
              }}
              style={styles.preview}
              type={Camera.Constants.Type.back}
              onCameraReady={() => {
                this.setState({ message: 'Camera Ready !' })
              }}
            />
          </View>
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
          <View style={styles.alignHorizontally}>
            <Picker
              selectedValue={this.state.feeling}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ feeling: itemValue })
              }
            >
              <Picker.Item label="Happy" value="Happy" />
              <Picker.Item label="Bad" value="Bad" />
            </Picker>
          </View>
          <PrimaryButton
            onPress={this.saveReflection}
            title="Tallenna"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <Button
            onPress={() => {
              firebase.auth().signOut()
              this.props.navigation.navigate('Login')
            }}
            title="Log out"
          />
        </ScrollView>
      </DefaultLayout>
    )
  }

  private async saveReflection() {
    const user = firebase.auth().currentUser || { uid: '' }
    const reflection: Reflection = {
      text: this.state.text,
      feeling: this.state.feeling,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: user.uid,
      session: 21,
      answers: this.state.answers,
    }
    if (this.state.image) {
      reflection.image = this.state.image
    }

    if (this.state.video) {
      reflection.video = this.state.video
    }
    try {
      console.log('asdada', reflection)
      await DiaryStore.addReflection(reflection)
    } catch (e) {
      console.log(e)
    }
  }

  private async startVideo() {
    const { status: existingStatus2 } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING,
    )
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
    )
    try {
      const data = await this.camera.recordAsync({})
      this.setState({ video: data.uri })
    } catch (error) {
      this.setState({ message: error })
      throw error
    }
  }

  private async stopVideo() {
    this.setState({ recording: false })
    if (!this.camera) return
    this.camera.stopRecording()
  }

  private async addImage() {
    const imageUrl: string = await pickImage()
    console.log(imageUrl)
    this.setState({ image: imageUrl })
  }
}
const styles = StyleSheet.create({
  paragragph: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  preview: {
    height: 200,
    width: 300,
    top: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  message: {
    top: 220,
  },
  capture: {
    marginRight: 10,
  },
  alignHorizontally: {
    flex: 1,
    flexDirection: 'row',
  },
})

/*
 <FlatList
            data={this.state.script}
            keyExtractor={this.keyExtractor}
            ref="flatList"
            renderItem={this.renderItem}
          />
          */
