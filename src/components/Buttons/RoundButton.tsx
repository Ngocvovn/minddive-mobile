import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

interface RoundButtonProps {
  disabled?: boolean
  onPress: (event: GestureResponderEvent) => void
}

const RoundButton: React.SFC<RoundButtonProps> = props => {
  const { onPress, disabled } = props
  return (
    <TouchableOpacity
      style={styles.roundButtonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons name="md-add" size={32} color="white" />
    </TouchableOpacity>
  )
}

export default RoundButton
