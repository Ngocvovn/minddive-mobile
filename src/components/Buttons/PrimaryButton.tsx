import React, { Component } from 'react'
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

interface PrimaryButtonProps {
  disabled?: boolean
  title: string
  onPress: (event: GestureResponderEvent) => void
}

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
