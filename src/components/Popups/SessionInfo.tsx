import React from 'react'
import { Image, Text, View } from 'react-native'

import styles from './styles'

interface SessionInfoProps {
  session: object
}

const SessionInfo: React.SFC<SessionInfoProps> = props => (
  <View style={styles.container}>
    <Text>Moi ja tervetulloo</Text>
  </View>
)
export default SessionInfo
