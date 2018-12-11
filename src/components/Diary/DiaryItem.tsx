import React from 'react'
import { Image, Text, View } from 'react-native'
import { Reflection } from '../../services/ReflectionService'
import { Video } from 'expo'
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
  console.log('entry', entry)
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
      {entry.video && (
        <Video
          source={{ uri: entry.video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: '100%', height: 300 }}
        />
      )}
    </GreenTitleBox>
  )
}

export default DiaryItem
