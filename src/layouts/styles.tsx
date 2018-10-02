import { StyleSheet } from 'react-native';

import variables from '../styles/variables'

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: variables.lightGrey,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
})

export default styles
