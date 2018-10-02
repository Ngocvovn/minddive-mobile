import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

interface PrimaryButtonProps {
  disabled?: boolean
  title: string
  onPress(): void
}

class PrimaryButton extends Component<PrimaryButtonProps> {
  public render(): React.ReactNode {
    const { title, onPress, disabled } = this.props
    return (
      <TouchableOpacity
        style={styles.primaryButtonStyle}
        onPress={() => onPress()}
        disabled={disabled}
      >
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

export default PrimaryButton
