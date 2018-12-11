import { Permissions, Camera } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import { CheckBox } from 'react-native-elements'
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
import UserStore from '../stores/UserStore'

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
      feeling: 'Pelkoa',
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

          {/*<View style={styles.alignHorizontally}>
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
            </View>*/}

          <GreenTitleBox title="Kirjoita merkintä">
            <TextInput
              style={{ padding: 10, textAlignVertical: 'top', fontSize: 20 }}
              multiline={true}
              numberOfLines={4}
              underlineColorAndroid="transparent"
              placeholder="Kerro vapaasti"
              onChangeText={text => this.setState({ text })}
            />
          </GreenTitleBox>
          <GreenTitleBox title="Mitä tuntemuksia vauvan liikkeet herättävät?">
            <CheckBox
              containerStyle={styles.checkBox}
              title="Mielenkiintoa"
              checked={this.state.feeling === 'Mielenkiintoa'}
              onPress={() => this.setState({ feeling: 'Mielenkiintoa' })}
            />
            <CheckBox
              containerStyle={styles.checkBox}
              title="Hämmennystä"
              checked={this.state.feeling === 'Hämmennystä'}
              onPress={() => this.setState({ feeling: 'Hämmennystä' })}
            />
            <CheckBox
              containerStyle={styles.checkBox}
              title="Pelkoa"
              checked={this.state.feeling === 'Pelkoa'}
              onPress={() => this.setState({ feeling: 'Pelkoa' })}
            />
            <CheckBox
              containerStyle={styles.checkBox}
              title="Ärtymystä"
              checked={this.state.feeling === 'Ärtymystä'}
              onPress={() => this.setState({ feeling: 'Ärtymystä' })}
            />
            <CheckBox
              containerStyle={styles.checkBox}
              title="Iloa"
              checked={this.state.feeling === 'Iloa'}
              onPress={() => this.setState({ feeling: 'Iloa' })}
            />
          </GreenTitleBox>
          <PrimaryButton
            onPress={this.saveReflection}
            title="Tallenna"
            style={{ marginTop: 30, marginBottom: 20 }}
          />
          <Button onPress={this.logout.bind(this)} title="Log out" />
        </ScrollView>
      </DefaultLayout>
    )
  }

  private logout() {
    UserStore.reset()
    DiaryStore.reset()
    firebase.auth().signOut()
    this.props.navigation.navigate('Login')
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
      console.log(data)
      this.setState({ video: data.uri })
    } catch (error) {
      this.setState({ message: error })
      throw error
    }
  }

  private async stopVideo() {
    this.setState({ recording: false })
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
    height: 300,
    width: '100%',
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
    paddingBottom: 30,
  },
  checkBox: {
    backgroundColor: 'transparent',
    marginLeft: 0,
    paddingLeft: 0,
    borderWidth: 0,
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
