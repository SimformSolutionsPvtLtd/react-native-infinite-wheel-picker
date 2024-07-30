import { StyleSheet } from 'react-native';
import { scale } from '../../theme';

export default StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#EE5366',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, color: '#fff', fontWeight: '800' },
  headerSubTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    marginTop: 3,
  },
  selectedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    padding: 2,
    borderColor: '#F6F5FF',
  },
  selectedMHContainer: {
    padding: 8,
    backgroundColor: '#fff',
  },
  selectedTimeText: { color: '#000', fontWeight: '700', fontSize: 18 },
  itemStyle: {
    fontSize: scale(15),
    color: '#000',
  },
  selectedItemContainerStyle: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    width: 50,
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  absoluteView: {
    position: 'absolute',
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    zIndex: -1,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  timeTitleText: { fontSize: 18, marginHorizontal: 10, marginRight: 20 },
  minuteText: {
    marginRight: 0,
  },
  mb: {
    marginBottom: 20,
  },
});
