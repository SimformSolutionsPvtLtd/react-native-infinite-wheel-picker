import { StyleSheet } from 'react-native';
import { Colors, scale } from '../../theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  selectorView: {
    position: 'absolute',
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: Colors.black,
    width: '90%',
  },
  listStyle: {
    width: '90%',
  },
  listView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultTextStyle: {
    color: Colors.black,
    fontSize: scale(30),
  },
});
