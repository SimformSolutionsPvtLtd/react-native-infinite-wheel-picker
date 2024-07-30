import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  selectedLayoutViewStyle: {
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors?.lightGray,
    borderRadius: 4,
    top: '50%',
  },
  flatListStyle: {
    overflow: 'hidden',
    flex: 1,
  },
  wheelPickerElementContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 100,
  },
  wheelPickerElementTextStyle: { fontWeight: '700', color: Colors.black },
});

export default styles;
