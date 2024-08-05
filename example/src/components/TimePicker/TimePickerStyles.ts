import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
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
  wheelMainContainer: { flexDirection: 'row', marginTop: 10 },
  wheelContainerStyle: { flex: 1 },
  wheelHoursSelectedLayoutStyle: {
    borderColor: '#D3D3D3',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    elevation: 1,
  },
  wheelPickerText: { fontSize: 14 },
  wheelPickerMinutesContainerStyle: { flex: 0.5 },
  wheelPickerMinutesSelectedLayoutStyle: {
    backgroundColor: '#FAFAFA',
    borderRadius: 0,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    elevation: 1,
  },
  wheelPickerMeridiemSelectedLayoutStyle: {
    borderColor: '#D3D3D3',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 0,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    elevation: 1,
  }
});
