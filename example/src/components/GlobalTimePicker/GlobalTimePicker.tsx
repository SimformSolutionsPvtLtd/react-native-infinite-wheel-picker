import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { StaticData } from '../../constants';
import styles from './GlobalTimePickerStyles';

const GlobalTimePicker = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Time (24 Hours)</Text>
      <View style={styles.wheelContainer}>
        <WheelPicker
          restElements={1}
          data={StaticData.hour24Array}
          initialSelectedIndex={15 ?? 0}
          selectedIndex={0 ?? 0}
          onChangeValue={(index, value) => {
            console.log('Hours onChange: ', index, value);
          }}
          elementHeight={60}
          containerStyle={styles.wheelPickerContainer}
          selectedLayoutStyle={styles.wheelPickerSelectedLayoutStyle}
          elementTextStyle={styles.wheelPickerElementTextStyle}
        />
        <View style={styles.separatorContainerStyle}>
          <View style={styles.separatorViewStyle} />
          <View style={styles.separatorBottomViewStyle} />
        </View>
        <WheelPicker
          restElements={1}
          data={StaticData.minutesArray}
          initialSelectedIndex={
            StaticData.minutesArray.indexOf(moment().format('mm')) ?? 0
          }
          selectedIndex={
            StaticData.minutesArray.indexOf(moment().format('mm')) ?? 0
          }
          onChangeValue={(index, value) => {
            console.log('Minutes onChange: ', index, value);
          }}
          elementHeight={60}
          containerStyle={styles.wheelPickerContainer}
          selectedLayoutStyle={styles.wheelPickerSelectedLayoutStyle}
          elementTextStyle={styles.wheelPickerElementTextStyle}
        />
      </View>
    </View>
  );
};

export default GlobalTimePicker;
