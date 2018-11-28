import React from 'react'
import { View } from 'react-native'
import styles from './styles'

interface DefaultLayoutProps {
  children?: React.ReactNode
}

// Default layout with solid background
const DefaultLayout: React.StatelessComponent<DefaultLayoutProps> = ({
  children,
}) => <View style={styles.default}>{children}</View>

export default DefaultLayout
