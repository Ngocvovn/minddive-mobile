import { StyleSheet } from 'react-native';

import variables from '../styles/variables'

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: variables.lightGrey,
  },
  backgroundStyle: {
    width: '100%',
    height: '100%'
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomRightFixed: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  textboxwhite: {
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 15,
  }
})

export default styles
