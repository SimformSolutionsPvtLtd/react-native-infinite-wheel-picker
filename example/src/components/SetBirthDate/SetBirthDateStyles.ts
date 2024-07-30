import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  wheelPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 10,
  },
  monthSelectedLayoutStyle: {
    backgroundColor: '#D3D3D366',
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  elementTextStyle: { fontSize: 14 },
  containerStyle: { flex: 1 },
  minutesSelectedLayoutStyle: {
    backgroundColor: '#D3D3D366',
    borderRadius: 0,
  },
  yearSelectedLayoutPicker: {
    backgroundColor: '#D3D3D366',
    borderRadius: 0,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginVertical: 5,
  }
});
