import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ImageBackground, View } from 'react-native'
import styles from './styles'

const background = require('./imageBackground.png')

const ImageBackgroundLayout = props => (
  <ImageBackground
    source={background}
    style={{ width: '100%', height: '100%' }}
  >
    <View style={styles.imageBackground}>{props.children}</View>
  </ImageBackground>
)

export default ImageBackgroundLayout
