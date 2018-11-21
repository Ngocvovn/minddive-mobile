import { Facebook } from 'expo'
import React, { Component } from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import GreenTitleBox from '../components/Boxes/GreenTitleBox'
import CursiveParagraph from '../components/Text/CursiveParagraph'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import DefaultLayout from '../layouts/DefaultLayout'

interface ReflectionScreenProps {
  session: object
}

interface ReflectionScreenState {
  session: object
}

export class ReflectionScreen extends Component {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Harjoitus',
  }

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      session: props.navigation.getParam('session', {}),
      answers: [],
    }
  }

  public updateAnswer = (text, index) => {
    console.log(index)
    this.state.answers[index] = { text }
    console.log(this.state.answers)
  }

  public saveReflection = () => {
    console.log('saving reflection')
  }

  public render(): React.ReactNode {
    const { description, questions } = this.state.session.reflection
    return (
      <DefaultLayout>
        <ScrollView>
        <CursiveParagraph text={description} style={{marginBottom: 20}}/>
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
          <PrimaryButton
            onPress={this.saveReflection}
            title="Tallenna"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </ScrollView>
      </DefaultLayout>
    )
  }
}
const styles = StyleSheet.create({
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
})

/*
 <FlatList
            data={this.state.script}
            keyExtractor={this.keyExtractor}
            ref="flatList"
            renderItem={this.renderItem}
          />
          */
