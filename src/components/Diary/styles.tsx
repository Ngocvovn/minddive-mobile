import { StyleSheet } from 'react-native';

import variables from '../../styles/variables'

const styles = StyleSheet.create({
  diaryItem: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff',
    marginBottom: 20,
    position: 'relative',
  },
  dateContainer: {
    backgroundColor: variables.turquoise,
    padding: 10,
  },
  image: {
    left: 0,
    right: 0,
    width: undefined,
    height: 200,
  },
  date: {
    color: '#fff',
    fontSize: variables.mediumFont,
  },
  text: {
    padding: 10
  }
})

export default styles
