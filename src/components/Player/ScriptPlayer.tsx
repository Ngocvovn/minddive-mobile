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
import ScriptItem from './ScriptItem'
import styles from './styles'

interface ScriptPlayerProps {
  script: object[]
  timestamp: number
}

interface ScriptPlayerState {
  script: object[]
  error: string
}

export default class ScriptPlayer extends Component<
  ScriptPlayerProps,
  ScriptPlayerState
> {
  public static getDerivedStateFromProps = (props, state) => {
    const newScripts: object[] = []
    props.script.map((item: object, i: number) => {
      if (state.script.length === 0 || i > state.script.length - 1) {
        if (props.timestamp >= item.timeStarts) {
          newScripts.push(item)
        }
      }
    })
    return { script: state.script.concat(newScripts) }
  }
  constructor(props) {
    super(props)
    this.state = {
      script: [],
      error: '',
    }
  }

  public keyExtractor = (item, index) => item.timeStarts.toString()

  /** 
  public componentDidUpdate = (prevProps, prevState) => {
    if (prevState.script.length < this.state.script.length) {
      setTimeout(() => {
        this.scrollToIndex()
      }, 100)
    }
  } 
  **/

  public scrollToIndex = () => {
    const index = this.state.script.length - 1
    this.flatListRef.scrollToIndex({ animated: true, index })
  }

  public renderItem = ({ item }) => <ScriptItem text={item.text} />

  public render(): React.ReactNode {
    return (
      <View style={styles.scriptContainer}>
        <FlatList
          data={this.state.script}
          keyExtractor={this.keyExtractor}
          ref={ref => {
            this.flatListRef = ref
          }}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
