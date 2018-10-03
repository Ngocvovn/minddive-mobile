import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'

interface RoundButtonProps {
  disabled?: boolean
  onPress: void
}

class RoundButton extends Component<RoundButtonProps> {
  public render(): React.ReactNode {
    const { onPress, disabled } = this.props
    return (
      <TouchableOpacity
        style={styles.roundButtonStyle}
        onPress={onPress}
        disabled={disabled}
      ><Ionicons
          name="md-add"
          size={32}
          color="white"
        />
      </TouchableOpacity>
    )
  }
}

export default RoundButton
