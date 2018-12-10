import React from 'react'
import { View } from 'react-native'
import styles from './styles'

interface TextBoxWhiteProps {
  children?: React.ReactNode
}

// Simple white container with padding
const TextBoxWhite: React.StatelessComponent<TextBoxWhiteProps> = ({
  children,
}) => <View style={styles.textboxwhite}>{children}</View>

export default TextBoxWhite
