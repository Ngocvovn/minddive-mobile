import React, { Component } from 'react'
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

interface PrimaryButtonProps {
  disabled?: boolean
  title: string
  style: object
  onPress: (event: GestureResponderEvent) => void
}

// Primary button with rounded edge and fixed padding
const PrimaryButton: React.SFC<PrimaryButtonProps> = props => {
  const { title, onPress, disabled, style } = props
  return (
    <TouchableOpacity
      style={[styles.primaryButtonStyle, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton
