import React from 'react'
import { Image, Text, View } from 'react-native'
import { Reflection } from '../../services/ReflectionService'
import H3 from '../Text/H3'
import Paragraph from '../Text/Paragraph'
import styles from './styles'

interface DiaryItemProps {
  entry: Reflection
}

const DiaryItem: React.SFC<DiaryItemProps> = props => {
  const { entry } = props
  return (
    <View style={styles.diaryItem}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {entry.createdAt.toDate().toLocaleDateString()}
        </Text>
      </View>
      {entry.image && (
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: entry.image }}
        />
      )}
      <View style={styles.text}>
        <H3 text={entry.feeling} />
        <Paragraph text={entry.text} />
      </View>
    </View>
  )
}

export default DiaryItem
