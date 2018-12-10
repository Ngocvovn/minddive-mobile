import React from 'react'
import { View } from 'react-native'
import styles from './styles'

interface ContainerProps {
  children?: React.ReactNode
}

// Absolutely positioned layout container
const BottomRightFixed: React.StatelessComponent<ContainerProps> = ({
  children,
}) => <View style={styles.bottomRightFixed}>{children}</View>

export default BottomRightFixed
