import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './styles'

interface ParagraphProps {
  text: string
}

class Paragraph extends Component<ParagraphProps> {
  public render(): React.ReactNode {
    const { text } = this.props
    return <Text style={styles.paragraph}>{this.props.text}</Text>
  }
}

export default Paragraph
