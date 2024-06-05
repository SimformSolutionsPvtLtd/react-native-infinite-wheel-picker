import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    alignItems: 'center',
  },
  selectedItemStyle: {
    fontWeight: '600',
  },
  itemStyle: {
    color: '#000',
  },
  firstVselectedItemContainerStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 70,
  },
  firstVWheelPickerContainerStyle: {
    width: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  secondVselectedItemContainerStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: 70,
  },
  thirdVselectedItemContainerStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    width: 70,
  },
  thirdVWheelPickerContainerStyle: {
    backgroundColor: '#EE5366',
    borderRadius: 10,
  },
  fourthVselectedItemContainerStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: 70,
  },
});
