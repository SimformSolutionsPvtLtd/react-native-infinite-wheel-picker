import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { StaticData } from '../../constants';
import styles from './SetMeetingStyles';

interface HeaderProps {
  minute: string;
  hour: string;
  onPress: () => void;
}

const Header = ({ minute, hour, onPress }: HeaderProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.headerContainer}>
    <View>
      <Text style={styles.headerTitle}>Meeting</Text>
      <Text style={styles.headerSubTitle}>Set your reminder</Text>
    </View>
    <View style={styles.selectedTimeContainer}>
      <View style={styles.selectedMHContainer}>
        <Text style={styles.selectedTimeText}>
          {hour} : {minute}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SetMeeting: React.FC = () => {
  const [hour, setHour] = React.useState('08');
  const [minute, setMinute] = React.useState('15');
  const [openPicker, setOpenPicker] = React.useState(true);
  const itemAngles = [30, 40];
  const itemOpacity = [0.5, 0.3];

  return (
    <>
      <View style={[styles.cardContainer, styles.mb]}>
        <Header
          minute={minute}
          hour={hour}
          onPress={() => setOpenPicker(prev => !prev)}
        />
      </View>

      <View style={styles.cardContainer}>
        <Header
          minute={minute}
          hour={hour}
          onPress={() => setOpenPicker(prev => !prev)}
        />
        {openPicker && (
          <View style={styles.pickerContainer}>
            <WheelPicker
              initialSelectedItem={hour}
              data={StaticData.hourArray}
              surroundingItemsCount={2}
              itemHeight={40}
              infinite={true}
              itemStyle={styles.itemStyle}
              onValueChange={value => {
                setHour(value.toString());
              }}
              selectedItemContainerStyle={styles.selectedItemContainerStyle}
              selectedItemStyle={styles.selectedTimeText}
              itemsAngle={itemAngles}
              itemsOpacity={itemOpacity}
              wheelPickerContainerStyle={styles.containerStyle}
            />
            <Text style={styles.timeTitleText}>hours</Text>
            <WheelPicker
              initialSelectedItem={minute}
              data={StaticData.minutesArray}
              surroundingItemsCount={2}
              itemHeight={40}
              infinite={true}
              itemStyle={styles.itemStyle}
              onValueChange={value => {
                setMinute(value.toString());
              }}
              selectedItemContainerStyle={styles.selectedItemContainerStyle}
              selectedItemStyle={styles.selectedTimeText}
              itemsAngle={itemAngles}
              itemsOpacity={itemOpacity}
              wheelPickerContainerStyle={styles.containerStyle}
            />
            <Text style={[styles.timeTitleText, styles.minuteText]}>
              minutes
            </Text>
            <View style={styles.absoluteView} />
          </View>
        )}
      </View>
    </>
  );
};

export default SetMeeting;
