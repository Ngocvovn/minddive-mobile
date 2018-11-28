import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

interface RoundButtonProps {
  disabled?: boolean
  children?: React.ReactNode
  onPress: (event: GestureResponderEvent) => void
}

// Round button meant to use with icon
const RoundButton: React.SFC<RoundButtonProps> = props => {
  const { onPress, disabled, children } = props
  return (
    <TouchableOpacity
      style={styles.roundButtonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  )
}

export const RoundButtonGreen: React.SFC<RoundButtonProps> = props => {
  const { onPress, disabled, children } = props
  return (
    <TouchableOpacity
      style={[styles.roundButtonStyle, styles.roundButtonStyleGreen]}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  )
}

export default RoundButton
