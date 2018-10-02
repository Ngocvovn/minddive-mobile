import { StyleSheet } from 'react-native'

import variables from '../../styles/variables'

const styles = StyleSheet.create({
  logo: {
    fontSize: 56,
    fontFamily: 'grandhotel-regular',
    color: variables.purple,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
