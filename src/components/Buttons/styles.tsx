import { StyleSheet } from 'react-native';

import variables from '../../styles/variables'

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  primaryButtonStyle: {
    padding: 10,
    backgroundColor: variables.purple,
    borderRadius: 5,
  },
  secondaryButtonStyle: {
    padding: 10,
    backgroundColor: variables.turquoise,
    borderRadius: 5
  },
})

export default styles
