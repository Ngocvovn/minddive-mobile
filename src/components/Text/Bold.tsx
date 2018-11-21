import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './styles'

interface BoldProps {
  text: string
}

class Bold extends Component<BoldProps> {
  public render(): React.ReactNode {
    const { text, style } = this.props
    return <Text style={[styles.bold, style]}>{this.props.text}</Text>
  }
}

export default Bold
