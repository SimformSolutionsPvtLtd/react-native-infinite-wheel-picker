import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { StaticData } from '../../constants';
import styles from './TimePickerStyles';

const TimePicker: React.FC = () => {
  const [hour, setHour] = React.useState({
    index: StaticData.hourArray.indexOf(moment().format('hh')),
    value:
      StaticData.hourArray[
        StaticData.hourArray.indexOf(moment().format('hh'))
      ] ?? '01',
  });
  const [minute, setMinute] = React.useState({
    index: StaticData.minutesArray.indexOf(moment().format('mm')),
    value:
      StaticData.minutesArray[
        StaticData.minutesArray.indexOf(moment().format('mm'))
      ] ?? '00',
  });
  const [meridiem, setMeridiem] = React.useState({
    index: StaticData.meridiemArray.indexOf(moment().format('A')),
    value:
      StaticData.meridiemArray[
        StaticData.meridiemArray.indexOf(moment().format('A'))
      ] ?? 'AM',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Time (AM/PM)</Text>
      <View style={styles.wheelMainContainer}>
        <WheelPicker
          restElements={2}
          data={StaticData.hourArray}
          initialSelectedIndex={StaticData.hourArray.indexOf(moment().format('hh'))}
          selectedIndex={hour.index ?? 0}
          onChangeValue={(index, value) => {
            console.log('Hours onChange: ', index, value);
            setHour({ index, value: value });
          }}
          elementHeight={30}
          containerStyle={styles.wheelContainerStyle}
          selectedLayoutStyle={styles.wheelHoursSelectedLayoutStyle}
          elementTextStyle={styles.wheelPickerText}
        />
        <WheelPicker
          restElements={2}
          data={StaticData.minutesArray}
          initialSelectedIndex={StaticData.minutesArray.indexOf(moment().format('mm'))}
          selectedIndex={minute.index ?? 0}
          onChangeValue={(index, value) => {
            console.log('Minutes onChange: ', index, value);
            setMinute({ index, value: value });
          }}
          selectedLayoutStyle={styles.wheelPickerMinutesSelectedLayoutStyle}
          containerStyle={styles.wheelPickerMinutesContainerStyle}
          elementHeight={30}
          elementTextStyle={styles.wheelPickerText}
        />
        <WheelPicker
          restElements={2}
          data={StaticData.meridiemArray}
          initialSelectedIndex={StaticData.meridiemArray.indexOf(moment().format('A'))}
          selectedIndex={meridiem.index ?? 0}
          onChangeValue={(index, value) => {
            console.log('Meridiem onChange: ', index, value);
            setMeridiem({ index, value: value });
          }}
          containerStyle={styles.wheelContainerStyle}
          selectedLayoutStyle={styles.wheelPickerMeridiemSelectedLayoutStyle}
          elementHeight={30}
          infiniteScroll={false}
          elementTextStyle={styles.wheelPickerText}
        />
      </View>
    </View>
  );
};

export default TimePicker;
