import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import { Reflection } from '../../services/ReflectionService'

interface DiaryItemProps {
  entry: Reflection
}

class DiaryItem extends Component<DiaryItemProps> {
  public render(): React.ReactNode {
    console.log(this.props.entry)
    const { entry } = this.props
    return (
      <View style={styles.diaryItem}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {entry.createdAt.toDate().toLocaleDateString()}
          </Text>
        </View>
        {entry.image && (
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: entry.image }}
          />
        )}
        <Text>{entry.text}</Text>
        <Text>{entry.feeling}</Text>
      </View>
    )
  }
}

export default DiaryItem
