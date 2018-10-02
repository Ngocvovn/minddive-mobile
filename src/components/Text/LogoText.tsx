import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

interface LogoTextProps {
  text: string
}

class LogoText extends Component<LogoTextProps> {
  constructor(props: LogoTextProps) {
    super(props)
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.logo}>{this.props.text}</Text>
      </View>
    )
  }
}

export default LogoText
