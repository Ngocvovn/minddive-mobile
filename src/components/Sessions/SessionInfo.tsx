import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import TextBoxWhite from '../../layouts/TextBoxWhite'
import PrimaryButton from '../Buttons/PrimaryButton'
import H3 from '../Text/H3'
import LogoText from '../Text/LogoText'

import styles from './styles'

const { width } = Dimensions.get('window')

interface SessionInfoProps {
  session: object
}

const ListItem = ({ text }) => <Text>{text}</Text>

const SessionInfo: React.SFC<SessionInfoProps> = props => {
  const { session, navigate, navigateReflection } = props

  return (
    <View
      style={{ flex: 1, width: width - 60, marginLeft: 15, marginRight: 15 }}
    >
      <View style={styles.week}>
        <LogoText text={session.week.toString()} />
      </View>
      <View style={styles.text}>
        <TextBoxWhite>
          <H3 text={session.name} />
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
