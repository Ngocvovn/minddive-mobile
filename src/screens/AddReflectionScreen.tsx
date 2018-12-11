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
  ScrollView,
} from 'react-native'
import { observer } from 'mobx-react'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import { CheckBox } from 'react-native-elements'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import DefaultLayout from '../layouts/DefaultLayout'
import { pickImage } from '../services/FileServices'
import { Reflection } from '../services/ReflectionService'
import DiaryStore from '../stores/DiaryStore'
import UserStore from '../stores/UserStore'
import GreenTitleBox from '../components/Boxes/GreenTitleBox'

interface AddReflectionScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface AddReflectionScreenState {
  text: string
  image?: string
  feeling: string
  error?: string
  video?: string
  reflections: Array<Reflection>
  message: string
  recording: boolean
}

@observer
export class AddReflectionScreen extends Component<
  AddReflectionScreenProps,
  AddReflectionScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Reflektio',
  }

  camera: any = null

  constructor(props: AddReflectionScreenProps) {
    super(props)
    this.state = {
      text: '',
      feeling: 'Pelkoa',
      error: '',
      reflections: [],
      message: '',
      recording: false,
    }
    this.addImage = this.addImage.bind(this)
    this.addNewReflection = this.addNewReflection.bind(this)
    this.startVideo = this.startVideo.bind(this)
    this.stopVideo = this.stopVideo.bind(this)
  }

  async componentWillMount() {
    const { status: existingStatus2 } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING,
    )
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
  }

  public render(): React.ReactNode {
    return (
      <DefaultLayout>
        <ScrollView>
          <Text style={styles.error}> {this.state.error}</Text>
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
          <Ionicons
            name="md-camera"
            size={32}
            color="black"
            onPress={this.addImage}
          />
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
          <View style={styles.alignHorizontally}>
            <PrimaryButton
              title="Start"
              style={{ marginTop: 10, marginBottom: 10 }}
              onPress={this.startVideo}
            />

            <PrimaryButton
              title="Stop"
              style={{ marginTop: 10, marginBottom: 10 }}
              onPress={this.stopVideo}
            />

            <Camera
              ref={cam => {
                this.camera = cam
              }}
              style={styles.preview}
              type={Camera.Constants.Type.front}
              onCameraReady={() => {
                this.setState({ message: 'Camera Ready !' })
              }}
            />
          </View>
          <PrimaryButton
            onPress={this.addNewReflection.bind(this)}
            title="Tallenna"
            style={{ marginTop: 30, marginBottom: 20 }}
          />
          <Button onPress={this.logout.bind(this)} title="Log out" />
        </ScrollView>
      </DefaultLayout>
    )
  }

  // ask permission then start to record with front camera
  startVideo = async () => {
    const { status: existingStatus2 } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING,
    )
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
    )
    if (!this.camera) return
    try {
      const data = await this.camera.recordAsync({})
      this.setState({ video: data.uri })
    } catch (error) {
      this.setState({ message: error })
      throw error
    }
  }

  stopVideo = () => {
    this.setState({ recording: false })
    if (!this.camera) return
    this.camera.stopRecording()
  }

  //reset all store, sign out then navigate to login screen
  private logout() {
    UserStore.reset()
    DiaryStore.reset()
    firebase.auth().signOut()
    this.props.navigation.navigate('Login')
  }

  private async addNewReflection() {
    const user = firebase.auth().currentUser || { uid: '' }
    const reflection: Reflection = {
      text: this.state.text,
      feeling: this.state.feeling,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: user.uid,
      session: 21,
    }
    if (this.state.image) {
      reflection.image = this.state.image
    }

    if (this.state.video) {
      reflection.video = this.state.video
    }
    try {
      console.log(reflection)
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

  container: {
    flex: 1,
    flexDirection: 'row',
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
