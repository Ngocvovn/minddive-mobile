import React from 'react'
import { Image, Text, View } from 'react-native'
import { Reflection } from '../../services/ReflectionService'
import GreenTitleBox from '../Boxes/GreenTitleBox'
import { H3 } from '../Text/Header'
import Paragraph from '../Text/Paragraph'
import styles from './styles'

interface DiaryItemProps {
  entry: Reflection
}

// Diary item, takes in Reflection class object
const DiaryItem: React.SFC<DiaryItemProps> = props => {
  const { entry } = props
  return (
    <GreenTitleBox title={entry.createdAt.toDate().toLocaleDateString()}>
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
    </GreenTitleBox>
  )
}

export default DiaryItem
