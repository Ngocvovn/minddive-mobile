import React, { Component } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import RoundButton from '../components/Buttons/RoundButton'
import DiaryItem from '../components/Diary/DiaryItem'
import { H2, H3 } from '../components/Text/Header'
import LogoText from '../components/Text/LogoText'
import Paragraph from '../components/Text/Paragraph'
import BottomRightFixed from '../layouts/BottomRightFixed'
import ImageBackgroundLayout from '../layouts/ImageBackgroundLayout'
import TextBoxWhite from '../layouts/TextBoxWhite'
import sessions from '../sessions'
import DiaryStore from '../stores/DiaryStore'

interface SessionScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface SessionScreenState {
  error?: string
  calendar: boolean
}

@observer
export class SessionScreen extends Component<
  SessionScreenProps,
  SessionScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: '',
  }

  public async componentDidMount() {
    await DiaryStore.getAll()
  }

  public keyExtractor = (item, index) => 'diaryItem' + index

  public renderItem = ({ item }) => <DiaryItem entry={item} />

  constructor(props: SessionScreenProps) {
    super(props)
    this.state = {
      error: '',
      calendar: false,
    }
  }

  public render(): React.ReactNode {
    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 },
    ]
    return (
      <ImageBackgroundLayout>
        <ScrollView>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.error}>
              <LogoText text="Viikko 21" />
            </Text>
            <ProgressCircle
              style={{ height: 200, marginBottom: 20 }}
              progress={0.6}
              strokeWidth={15}
              progressColor={'rgb(134, 65, 244)'}
            />
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <TextBoxWhite>
                <H3 text={sessions[21].default.name} />
                <Paragraph text={sessions[21].default.description} />
                <PrimaryButton
                  title="Sessioon"
                  onPress={() =>
                    this.props.navigation.navigate('SessionDetail', {
                      session: 21,
                    })
                  }
                  style={{ marginTop: 20 }}
                />
              </TextBoxWhite>
            </View>
          </View>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <FlatList
              data={DiaryStore.reflections}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
        <BottomRightFixed>
          <RoundButton
            onPress={() => this.props.navigation.navigate('AddReflection')}
          >
            <Ionicons name="md-add" size={32} color="white" />
          </RoundButton>
        </BottomRightFixed>
      </ImageBackgroundLayout>
    )
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  error: {
    textAlign: 'center',
    paddingBottom: 30,
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
