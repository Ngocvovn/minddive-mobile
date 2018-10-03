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
      <Text style={styles.logo}>{this.props.text}</Text>
    )
  }
}

export default LogoText
