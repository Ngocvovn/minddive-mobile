import React from 'react'
import { View } from 'react-native'
import styles from './styles'

interface TextBoxWhiteProps {
  children?: React.ReactNode
  style?: object
}

// Simple white container with padding
const TextBoxWhite: React.StatelessComponent<TextBoxWhiteProps> = ({
  children,
  style,
}) => <View style={[styles.textboxwhite, style]}>{children}</View>

export default TextBoxWhite
