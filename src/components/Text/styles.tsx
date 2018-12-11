import { StyleSheet } from 'react-native'

import variables from '../../styles/variables'

const styles = StyleSheet.create({
  logo: {
    fontSize: 56,
    fontFamily: 'grandhotel-regular',
    color: variables.purple,
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontSize: variables.mediumFont,
    color: variables.dark,
    fontWeight: 'bold',
    fontFamily: 'nunito-semibold',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: variables.smallFont,
    color: variables.dark,
    fontFamily: 'nunito-regular',
  },
  cursive: {
    fontSize: variables.mediumFont,
    color: variables.dark,
    fontStyle: 'italic',
  },
  h2: {
    fontSize: variables.headerFont,
    fontWeight: 'bold',
    color: variables.purple,
    marginBottom: 5,
    fontFamily: 'nunito-regular',
  },
  h3: {
    fontSize: variables.mediumFont,
    fontWeight: 'bold',
    color: variables.purple,
    marginBottom: 5,
    fontFamily: 'nunito-regular',
  },
})

export default styles
