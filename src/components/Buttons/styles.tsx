import { StyleSheet } from 'react-native';

import variables from '../../styles/variables'

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  primaryButtonStyle: {
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: variables.purple,
    borderRadius: 25,
    alignSelf: 'center',
  },
  secondaryButtonStyle: {
    padding: 10,
    backgroundColor: variables.turquoise,
    borderRadius: 5
  },
  roundButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.purple,
  },
  roundButtonStyleGreen: {
    backgroundColor: variables.turquoise,
  },
})

export default styles
