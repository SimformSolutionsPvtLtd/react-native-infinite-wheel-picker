import React from 'react';
import { Text, View } from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { StaticData } from '../../constants';
import styles from './SetBirthDateStyles';

const SetBirthDate: React.FC = () => {
  const [month, setMonth] = React.useState({
    index: 0,
    value: StaticData.monthsArray[0],
  });
  const [date, setDate] = React.useState({
    index: 0,
    value: StaticData.datesArray[0],
  });
  const [year, setYear] = React.useState({
    index: 0,
    value: StaticData.yearsArray[0],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Birthday</Text>
      <View style={styles.wheelPickerContainer}>
        <WheelPicker
          restElements={3}
          data={StaticData.monthsArray}
          initialSelectedIndex={0}
          selectedIndex={month?.index ?? 0}
          onChangeValue={(index, value) => {
            console.log('Month onChange: ', index, value);
            setMonth({ index, value: value });
          }}
          elementHeight={30}
          containerStyle={styles.containerStyle}
          selectedLayoutStyle={styles.monthSelectedLayoutStyle}
          elementTextStyle={styles.elementTextStyle}
        />
        <WheelPicker
          restElements={3}
          data={StaticData.datesArray}
          initialSelectedIndex={0}
          selectedIndex={date?.index ?? 0}
          onChangeValue={(index, value) => {
            console.log('Date onChange: ', index, value);
            setDate({ index, value: parseInt(value) });
          }}
          selectedLayoutStyle={styles.minutesSelectedLayoutStyle}
          elementHeight={30}
          elementTextStyle={styles.elementTextStyle}
        />
        <WheelPicker
          restElements={3}
          data={StaticData.yearsArray}
          initialSelectedIndex={0}
          selectedIndex={year?.index ?? 0}
          onChangeValue={(index, value) => {
            console.log('onChange: ', index, value);
            setYear({ index, value: parseInt(value) });
          }}
          containerStyle={styles.containerStyle}
          selectedLayoutStyle={styles.yearSelectedLayoutPicker}
          elementHeight={30}
          elementTextStyle={styles.elementTextStyle}
        />
      </View>
      <Text
        style={
          styles.selectedDateText
        }>{`Date: ${date.value}, ${month.value} ${year.value}`}</Text>
    </View>
  );
};

export default SetBirthDate;
