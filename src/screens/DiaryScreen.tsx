import React, { Component } from 'react'
import { Reflection } from '../services/ReflectionService'
import DefaultLayout from '../layouts/DefaultLayout'
import BottomRightFixed from '../layouts/BottomRightFixed'
import RoundButton from '../components/Buttons/RoundButton'
import { Ionicons } from '@expo/vector-icons'
import DiaryItem from '../components/Diary/DiaryItem'
import { observer } from 'mobx-react'
import { Ionicons } from '@expo/vector-icons'
import { FlatList, StyleSheet } from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import db from '../services/Db'
import DiaryStore from '../stores/DiaryStore'

interface DiaryScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface DiaryScreenState {
  error?: string
  reflections: Reflection[]
}

@observer
export class DiaryScreen extends Component<DiaryScreenProps, DiaryScreenState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Päiväkirja',
  }

  constructor(props: DiaryScreenProps) {
    super(props)
    this.state = {
      error: '',
      reflections: [],
    }
  }

  async componentDidMount() {
    await DiaryStore.getAll()
  }

  public keyExtractor = (item, index) => 'diaryItem' + index

  public renderItem = ({ item }) => <DiaryItem entry={item} />

  public render(): React.ReactNode {
    console.log(DiaryStore.reflections)
    return (
      <DefaultLayout>
        <FlatList
          data={DiaryStore.reflections}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <BottomRightFixed>
          <RoundButton
            onPress={() => this.props.navigation.navigate('AddReflection')}
          >
            <Ionicons name="md-add" size={32} color="white" />
          </RoundButton>
        </BottomRightFixed>
      </DefaultLayout>
    )
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
