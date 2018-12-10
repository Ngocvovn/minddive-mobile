import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ImageBackground, View } from 'react-native'
import styles from './styles'

const background = require('./imageBackground.png')

interface ImageBackgroundLayoutProps {
  children?: React.ReactNode
}

// Same than DefaultLayout but with image background
const ImageBackgroundLayout: React.StatelessComponent<
  ImageBackgroundLayoutProps
> = ({ children }) => (
  <ImageBackground source={background} style={styles.backgroundStyle}>
    <View style={styles.imageBackground}>{children}</View>
  </ImageBackground>
)

export default ImageBackgroundLayout
