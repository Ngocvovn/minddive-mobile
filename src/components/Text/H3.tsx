import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './styles'

interface H3Props {
  text: string
}

class H3 extends Component<H3Props> {
  public render(): React.ReactNode {
    const { text } = this.props
    return <Text style={styles.h3}>{this.props.text}</Text>
  }
}

export default H3
