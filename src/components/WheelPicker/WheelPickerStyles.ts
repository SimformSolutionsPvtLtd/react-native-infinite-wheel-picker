import { StyleSheet } from 'react-native';
import { Colors, scale } from '../../theme';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  containerHeight: {
    justifyContent: 'center',
    zIndex: 0,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: scale(18),
  },
  highlightedItemText: {
    fontWeight: 'bold',
  },
  highlight: {
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.gray,
    zIndex: 0,
  },
});
