import * as React from 'react'
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
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
