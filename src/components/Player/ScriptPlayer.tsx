import { Facebook } from 'expo'
import React, { Component } from 'react'
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import Bold from '../Text/Bold'
import CursiveParagraph from '../Text/CursiveParagraph'
import LogoText from '../Text/LogoText'
import ScriptItem from './ScriptItem'
import styles from './styles'

interface ScriptPlayerProps {
  script: object[]
  timestamp: number
  pictures: object
  preview: object
  week: number
  name: string
}

interface ScriptPlayerState {
  script: object[]
  error: string
}

/**
 * ScriptPlayer class takes in the script and handles the display of
 * paragraphs/timed script items based on timestamp prop.
 * Class also displays a start screen with information supplied
 *
 * @export
 * @class ScriptPlayer
 * @extends {Component<ScriptPlayerProps, ScriptPlayerState>}
 *
 * @param script Array of script items
 * @param timespamp Integer timestamp that is used for deciding script items shown
 * @param pictures List of available pictures in case script item is a picture
 * @param preview Preview text for the script, shown before playback starts
 * @param week Integer, number of the week for the preview
 * @param name String, name of the week's session
 */

export default class ScriptPlayer extends Component<
  ScriptPlayerProps,
  ScriptPlayerState
> {
  public static getDerivedStateFromProps = (
    props: ScriptPlayerProps,
    state: ScriptPlayerState,
  ) => {
    const newScripts: object[] = []
    if (props.script) {
      props.script.map((item: object, i: number) => {
        if (state.script.length === 0 || i > state.script.length - 1) {
          if (props.timestamp >= item.timeStarts) {
            newScripts.push(item)
          }
        }
      })
      return { script: state.script.concat(newScripts) }
    }
    return null
  }
  constructor(props: ScriptPlayerProps) {
    super(props)
    this.state = {
      script: [],
      error: '',
    }
  }

  public keyExtractor = (item: { timeStarts: number }, index: number) =>
    item.timeStarts.toString()

  // Check if new items are added and scroll to the end
  public componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.script.length > 0 &&
      prevState.script.length < this.state.script.length
    ) {
      setTimeout(() => {
        this.refs.flatList.scrollToEnd()
      }, 100)
    }
  }

  // conditional rendering of script item based on it's "type"
  public renderItem = ({ item }) => {
    if (item.type === 'TEXT') {
      return <ScriptItem text={item.text} />
    } else {
      return <Image source={this.props.pictures[item.file]} />
    }
  }

  public render(): React.ReactNode {
    const preview = this.props.preview
    return (
      <View style={styles.scriptContainer}>
        {this.props.timestamp === 0 && this.props.preview ? (
          <View style={{ flex: 1 }}>
            {this.props.pictures && (
              <Image
                style={{
                  width: 125,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={this.props.pictures[this.props.preview.image]}
              />
            )}
            <CursiveParagraph text={this.props.preview.text} />
            <Bold
              style={{ marginTop: 15 }}
              text={`Kesto: ${this.props.preview.length}min`}
            />
          </View>
        ) : (
          <FlatList
            data={this.state.script}
            keyExtractor={this.keyExtractor}
            ref="flatList"
            renderItem={this.renderItem}
          />
        )}
      </View>
    )
  }
}
