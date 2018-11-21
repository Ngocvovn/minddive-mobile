import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './styles'

interface CursiveParagraphProps {
  text: string
}

class CursiveParagraph extends Component<CursiveParagraphProps> {
  public render(): React.ReactNode {
    const { text, style } = this.props
    return <Text style={[styles.cursive, style]}>{this.props.text}</Text>
  }
}

export default CursiveParagraph
