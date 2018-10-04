import { StyleSheet } from 'react-native';

import variables from '../../styles/variables'

const styles = StyleSheet.create({
  diaryItem: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  dateContainer: {
    backgroundColor: variables.turquoise,
    padding: 10,
  },
  date: {
    color: '#fff',
    fontSize: variables.mediumFont,
  },
})

export default styles
