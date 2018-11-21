import { StyleSheet } from 'react-native'

import variables from '../../styles/variables'

const styles = StyleSheet.create({
  greenTitleBox: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff',
    marginBottom: 20,
    position: 'relative',
  },
  greenTitleContainer: {
    backgroundColor: variables.turquoise,
    padding: 10,
  },
  greenTitle: {
    color: '#fff',
    fontSize: variables.mediumFont,
  },
})

export default styles
