// session name etc, header pic and such
import { Asset } from 'expo'

export default {
  name: 'Vauvan liikkeet',
  description:
    'Tässä sessiossa keskitymme vauvan liikkeisiin ja siihen millaisia tuntemuksia ne voivat herättää.',
  keywords: ['Vauvan liikkeet', 'Yhteys vauvaan'],
  information: require('./information.json'),
  exercise: require('./exercise.json'),
  week: 21,
  pictures: {
    picture1: require('./media/information.png'),
    picture2: require('./media/exercise.png'),
  },
  reflection: require('./reflection.json'),
}
