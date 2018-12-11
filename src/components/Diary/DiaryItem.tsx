import { Video } from 'expo'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { Reflection } from '../../services/ReflectionService'
import sessions from '../../sessions'
import GreenTitleBox from '../Boxes/GreenTitleBox'
import Bold from '../Text/Bold'
import { H3 } from '../Text/Header'
import Paragraph from '../Text/Paragraph'
import styles from './styles'

const loading = require('../../../assets/images/loading.png')

interface DiaryItemProps {
  entry: Reflection
}

const Answer = ({ session, answer }) => (
  <View style={{ marginBottom: 20, paddingLeft: 10, paddingRight: 10 }}>
    <Bold
      text={
        sessions[session].default.reflection.questions[answer.questionNumber]
          .question
      }
    />
    <Paragraph text={answer.answer} />
  </View>
)

const tellStatus = status => console.log(status)

// Diary item, takes in Reflection class object
const DiaryItem: React.SFC<DiaryItemProps> = props => {
  const { entry } = props
  console.log(entry)

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
          useNativeControls
          onPlaybackStatusUpdate={tellStatus}
          posterSource={loading}
          style={{ width: '100%', height: 300 }}
        />
      )}
      {entry.answers && (
        <View>
          {Object.keys(entry.answers).map(a => {
            return (
              <Answer
                key={entry.createdAt + Math.random()}
                session={entry.session}
                answer={entry.answers[a]}
              />
            )
          })}
        </View>
      )}
    </GreenTitleBox>
  )
}

export default DiaryItem
