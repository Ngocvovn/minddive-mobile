import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ImageBackground, View } from 'react-native'
import styles from './styles'

const background = require('./imageBackground.png')

const ImageBackgroundLayout: React.SFC<{}> = props => (
  <ImageBackground source={background} style={styles.backgroundStyle}>
    <View style={styles.imageBackground}>{props.children}</View>
  </ImageBackground>
)

export default ImageBackgroundLayout
