import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  headingText: { fontSize: 16, fontWeight: '700', color: '#000000' },
  wheelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  wheelPickerContainer: { flex: 0.3 },
  wheelPickerSelectedLayoutStyle: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
  },
  wheelPickerElementTextStyle: { fontSize: 20 },
  separatorContainerStyle: { justifyContent: 'center', marginHorizontal: 20 },
  separatorViewStyle: {
    height: 10,
    width: 10,
    backgroundColor: '#000000',
    borderRadius: 99,
  },
  separatorBottomViewStyle: {
    height: 10,
    width: 10,
    backgroundColor: '#000000',
    borderRadius: 99,
    marginTop: 10,
  },
});
