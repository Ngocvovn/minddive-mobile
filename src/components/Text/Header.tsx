/* tslint:disable:max-classes-per-file */

import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './styles'

interface H2Props {
  text: string
}

export class H2 extends Component<H2Props> {
  public render(): React.ReactNode {
    const { text } = this.props
    return <Text style={styles.h2}>{this.props.text}</Text>
  }
}

interface H3Props {
  text: string
}

export class H3 extends Component<H3Props> {
  public render(): React.ReactNode {
    const { text } = this.props
    return <Text style={styles.h3}>{this.props.text}</Text>
  }
}
