import { StyleSheet } from 'react-native';
import { scale } from '../../theme';

export default StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  itemStyle: {
    fontSize: scale(15),
    color: '#000',
  },
  selectedItemContainerStyle: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  datePickerContainer: {
    width: '100%',
    marginTop: 20,
    borderColor: '#000',
    backgroundColor: '#EE5366',
    borderRadius: 5,
  },
  datePickerWheelContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  wheelContainer: { flex: 1 },
  confirmText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  datePickerBtnContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  selectedItemStyle: {
    fontSize: 20,
    fontWeight: '500',
  },
});
