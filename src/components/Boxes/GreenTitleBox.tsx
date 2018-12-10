import React from 'react'
import { Text, View } from 'react-native'
import { H3 } from '../Text/Header'
import Paragraph from '../Text/Paragraph'
import styles from './styles'

interface GreenTitleBoxProps {
  title: string
  children?: React.ReactNode
}

// Styled container with green title area
const GreenTitleBox: React.SFC<GreenTitleBoxProps> = props => {
  const { title, children } = props
  return (
    <View style={styles.greenTitleBox}>
      <View style={styles.greenTitleContainer}>
        <Text style={styles.greenTitle}>{title}</Text>
      </View>
      {children}
    </View>
  )
}

export default GreenTitleBox
