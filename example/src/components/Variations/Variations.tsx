import React from 'react';
import { View } from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import styles from './VariationsStyles';

const FirstVariationData = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
const SecondVariationData = [
  70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 90,
];
const ThirdVariationData = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
const FourthVariationData = [
  70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
];

const Variations: React.FC = () => (
  <View style={styles.container}>
    <WheelPicker
      initialSelectedItem={77}
      data={FirstVariationData}
      surroundingItemsCount={2}
      itemHeight={40}
      infinite={false}
      itemStyle={styles.itemStyle}
      onValueChange={value => {
        console.log(value);
      }}
      selectedItemContainerStyle={styles.firstVselectedItemContainerStyle}
      selectedItemStyle={styles.selectedItemStyle}
      itemsAngle={[0, 0]}
      itemsOpacity={[0.4, 0.2]}
      wheelPickerContainerStyle={styles.firstVWheelPickerContainerStyle}
    />

    <WheelPicker
      initialSelectedItem={77}
      data={SecondVariationData}
      surroundingItemsCount={1}
      itemHeight={40}
      infinite={true}
      itemStyle={styles.itemStyle}
      onValueChange={value => {
        console.log(value);
      }}
      selectedItemContainerStyle={styles.secondVselectedItemContainerStyle}
      selectedItemStyle={styles.selectedItemStyle}
      itemsAngle={[20, 40]}
      itemsOpacity={[0.4, 0.2]}
    />

    <WheelPicker
      initialSelectedItem={74}
      data={ThirdVariationData}
      surroundingItemsCount={2}
      itemHeight={40}
      infinite={true}
      itemStyle={styles.itemStyle}
      onValueChange={value => {
        console.log(value);
      }}
      selectedItemContainerStyle={styles.thirdVselectedItemContainerStyle}
      selectedItemStyle={styles.selectedItemStyle}
      itemsAngle={[30, 40]}
      itemsOpacity={[0.7, 0.3]}
      wheelPickerContainerStyle={styles.thirdVWheelPickerContainerStyle}
    />

    <WheelPicker
      initialSelectedItem={77}
      data={FourthVariationData}
      surroundingItemsCount={3}
      itemHeight={40}
      infinite={true}
      itemStyle={styles.itemStyle}
      onValueChange={value => {
        console.log(value);
      }}
      selectedItemContainerStyle={styles.fourthVselectedItemContainerStyle}
      selectedItemStyle={styles.selectedItemStyle}
      itemsAngle={[30, 40, 50]}
      itemsOpacity={[0.4, 0.2]}
    />
  </View>
);

export default Variations;
