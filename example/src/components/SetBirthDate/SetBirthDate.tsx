import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { StaticData } from '../../constants';
import styles from './SetBirthDateStyles';

const SetBirthDate: React.FC = () => (
  <View style={styles.datePickerContainer}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Birthday</Text>
    </View>
    <View style={styles.datePickerWheelContainer}>
      <View style={styles.wheelContainer}>
        <WheelPicker
          data={StaticData.monthsArray}
          surroundingItemsCount={2}
          itemHeight={40}
          infinite={true}
          itemStyle={styles.itemStyle}
          onValueChange={value => {
            console.log('value', value);
          }}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          selectedItemStyle={styles.selectedItemStyle}
          itemsAngle={[30, 50]}
          itemsOpacity={[0.5, 0.3]}
          wheelPickerContainerStyle={styles.containerStyle}
        />
      </View>
      <View>
        <WheelPicker
          initialSelectedItem={26}
          data={StaticData.datesArray}
          surroundingItemsCount={2}
          itemHeight={40}
          infinite={true}
          itemStyle={styles.itemStyle}
          onValueChange={value => {
            console.log('value', value);
          }}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          selectedItemStyle={styles.selectedItemStyle}
          itemsAngle={[30, 50]}
          itemsOpacity={[0.5, 0.3]}
          wheelPickerContainerStyle={styles.containerStyle}
        />
      </View>

      <View style={styles.wheelContainer}>
        <WheelPicker
          data={StaticData.yearsArray}
          surroundingItemsCount={2}
          itemHeight={40}
          infinite={true}
          itemStyle={styles.itemStyle}
          onValueChange={value => {
            console.log('value', value);
          }}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          selectedItemStyle={styles.selectedItemStyle}
          itemsAngle={[30, 50]}
          itemsOpacity={[0.5, 0.3]}
          wheelPickerContainerStyle={styles.containerStyle}
        />
      </View>
    </View>
    <TouchableOpacity activeOpacity={0.7} style={styles.datePickerBtnContainer}>
      <Text style={styles.confirmText}>Confirm</Text>
    </TouchableOpacity>
  </View>
);

export default SetBirthDate;
