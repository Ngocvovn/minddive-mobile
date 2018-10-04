import React, { Component } from 'react'
import { Image, Text, View, } from 'react-native'
import {
  Reflection,
} from '../../services/ReflectionService'
import H3 from '../Text/H3'
import Paragraph from '../Text/Paragraph'
import styles from './styles'

interface DiaryItemProps {
  entry: Reflection
}

class DiaryItem extends Component<DiaryItemProps> {
  public render(): React.ReactNode {
    const { entry } = this.props
    return (
      <View style={styles.diaryItem}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{entry.createdAt.toDate().toLocaleDateString()}</Text>
        </View>
        {entry.image &&
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: entry.image }}
          />}
        <View style={styles.text}>
          <H3 text={entry.feeling} />
          <Paragraph text={entry.text} />
        </View>
      </View>
    )
  }
}

export default DiaryItem
