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
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: variables.smallFont,
    color: variables.dark
  },
  cursive: {
    fontSize: variables.mediumFont,
    color: variables.dark,
    fontStyle: 'italic',
  },
  h3: {
    fontSize: variables.mediumFont,
    fontWeight: 'bold',
    color: variables.purple,
    marginBottom: 5,
  }
})

export default styles
