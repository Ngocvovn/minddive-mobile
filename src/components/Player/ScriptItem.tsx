import React from 'react'
import { Image, Text, View } from 'react-native'
import { Reflection } from '../../services/ReflectionService'
import Fade from '../Animations/Fade'
import { H3 } from '../Text/Header'
import Paragraph from '../Text/Paragraph'
import styles from './styles'

interface ScriptItemProps {
  text: string
}

const ScriptItem: React.SFC<ScriptItemProps> = props => {
  const { text } = props
  return (
    <Fade>
      <View style={styles.scriptItemContainer}>
        <Text style={styles.scriptText}>{text}</Text>
      </View>
    </Fade>
  )
}

export default ScriptItem
