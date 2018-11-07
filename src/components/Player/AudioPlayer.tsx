import { MaterialIcons } from '@expo/vector-icons'
import { Asset, Audio, Font } from 'expo'
import React, { Component } from 'react'
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import Slider from 'react-native-slider'

// https://github.com/GetStream/react-native-audio-player

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')
const DISABLED_OPACITY = 0.5
const FONT_SIZE = 14
const LOADING_STRING = 'Loading...'
const BUFFERING_STRING = 'Buffering...'
const RATE_SCALE = 3.0

interface AudioPlayerProps {
  track: string
  onTimestampUpdate: ((timestamp: number) => number)
}

interface AudioPlayerState {
  shouldPlay: boolean
  isPlaying: boolean
  isBuffering: boolean
  isLoading: boolean
  volume: number
  playbackInstancePosition: number | null
  playbackInstanceDuration: number | null
  rate: number
}

export default class AudioPlayer extends Component<
  AudioPlayerProps,
  AudioPlayerState
> {
  constructor(props) {
    super(props)
    this.index = 0
    this.isSeeking = false
    this.shouldPlayAtEndOfSeek = false
    this.playbackInstance = null
    this.state = {
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      volume: 1.0,
      rate: 1.0,
    }
  }

  public componentDidMount(): void {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    })

    this._loadNewPlaybackInstance(false)
  }

  public async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync()
      this.playbackInstance.setOnPlaybackStatusUpdate(null)
      this.playbackInstance = null
    }

    const source = { uri: this.props.track }

    const initialStatus = {
      shouldPlay: playing,
      downloadFirst: true,
      rate: this.state.rate,
      volume: this.state.volume,
    }

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate,
    )
    this.playbackInstance = sound

    this._updateScreenForLoading(false)
  }

  public _updateScreenForLoading(isLoading: boolean): void {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      })
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  public _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        volume: status.volume,
      })
      if (status.didJustFinish) {
        this._onStopPressed()
      }
      if (status.isPlaying) {
        setTimeout(() => {
          this.props.onTimestampUpdate(this.state.playbackInstancePosition)
        }, 500)
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`)
      }
    }
  }

  public componentWillUnmount(): void {
    this._endListening()
  }

  public _endListening(): void {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync()
    }
  }

  public async _updatePlaybackInstanceForIndex(playing): void {
    this._updateScreenForLoading(true)

    this._loadNewPlaybackInstance(playing)
  }

  public _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync()
      } else {
        this.playbackInstance.playAsync()
      }
    }
  }

  public _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync()
    }
  }

  public _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
    }
  }

  public _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
    }
  }

  public _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value)
    }
  }

  public _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay
      this.playbackInstance.pauseAsync()
    }
  }

  public _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false
      const seekPosition = value * this.state.playbackInstanceDuration
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition)
      } else {
        this.playbackInstance.setPositionAsync(seekPosition)
      }
    }
  }

  public _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      )
    }
    return 0
  }

  public _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = number => {
      const string = number.toString()
      if (number < 10) {
        return '0' + string
      }
      return string
    }
    return padWithZero(minutes) + ':' + padWithZero(seconds)
  }

  public _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition,
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`
    }
    return ''
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>
            {this.state.isBuffering ? BUFFERING_STRING : this._getTimestamp()}
          </Text>
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerTopRow,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}
        >
          <TouchableHighlight
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}
          >
            <View>
              {this.state.isPlaying ? (
                <MaterialIcons name="pause" size={40} color="#56D5FA" />
              ) : (
                <MaterialIcons name="play-arrow" size={40} color="#56D5FA" />
              )}
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}
        >
          <Slider
            style={styles.playbackSlider}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            thumbTintColor="#000000"
            minimumTrackTintColor="#4CCFF9"
            disabled={this.state.isLoading}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 125,
    alignItems: 'center',
  },
  detailsContainer: {
    height: 40,
    alignItems: 'center',
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  playbackSlider: {
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: 40,
  },
  buttonsContainerMiddleRow: {
    maxHeight: 40,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  volumeSlider: {
    width: DEVICE_WIDTH - 80,
  },
  buttonsContainerBottomRow: {
    alignSelf: 'stretch',
  },
})
