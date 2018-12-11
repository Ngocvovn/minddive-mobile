import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import TextBoxWhite from '../../layouts/TextBoxWhite'
import PrimaryButton from '../Buttons/PrimaryButton'
import { H2, H3 } from '../Text/Header'
import LogoText from '../Text/LogoText'

import styles from './styles'

const { width } = Dimensions.get('window')

interface SessionInfoProps {
  session: {
    keywords: string[]
    name: string
    week: number
  }
  navigate: ((week: number) => void)
  navigateReflection: ((week: number) => void)
}

const ListItem = ({ text }) => <Text>- {text}</Text>

// List item for home page sessions
const SessionInfo: React.SFC<SessionInfoProps> = props => {
  const { session, navigate, navigateReflection } = props

  return (
    <View
      style={{ flex: 1, width: width - 60, marginLeft: 30, marginRight: 30 }}
    >
      <View style={styles.week}>
        <LogoText text="21" />
      </View>
      <View style={styles.text}>
        <TextBoxWhite>
          <H2 text={session.name} />
          {session.keywords.map(w => (
            <ListItem text={w} key={`keyword-${w}`} />
          ))}
          <PrimaryButton
            title="Sessioon"
            onPress={() => navigate(session.week)}
            style={{ marginTop: 20 }}
          />
          <PrimaryButton
            title="Reflektio"
            onPress={() => navigateReflection(session.week)}
            style={{ marginTop: 20 }}
          />
        </TextBoxWhite>
      </View>
    </View>
  )
}

export default SessionInfo
