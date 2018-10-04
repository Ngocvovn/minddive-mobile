import React, { Component } from 'react'
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import styles from './styles'

interface PrimaryButtonProps {
  disabled?: boolean
  title: string
  onPress: (event: GestureResponderEvent) => void
}

const PrimaryButton: React.SFC<PrimaryButtonProps> = props => {
  const { title, onPress, disabled } = props
  return (
    <TouchableOpacity
      style={styles.primaryButtonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton
