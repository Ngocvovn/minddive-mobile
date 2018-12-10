import { Permissions, Camera } from 'expo'
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
  Picker,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { observer } from 'mobx-react'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
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
    title: 'Lisää merkintä',
  }

  camera: any = null

  constructor(props: AddReflectionScreenProps) {
    super(props)
    this.state = {
      text: '',
      feeling: 'Happy',
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
        <Text style={styles.error}> {this.state.error}</Text>
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
          onPress={() => this.addNewReflection()}
          title="Tallenna"
        />
        <Button
          onPress={() => {
            firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}
          title="Log out"
        />
      </DefaultLayout>
    )
  }

  startVideo = async () => {
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

  private async addVideo() {
    const { status: existingStatus2 } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING,
    )
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
    )
    if (existingStatus === 'granted') {
      let result = await this.camera.recordAsync({})
    }
  }

  private async addNewReflection() {
    let user = firebase.auth().currentUser || { uid: '' }
    let reflection: Reflection = {
      text: this.state.text,
      feeling: this.state.feeling,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: user.uid,
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
