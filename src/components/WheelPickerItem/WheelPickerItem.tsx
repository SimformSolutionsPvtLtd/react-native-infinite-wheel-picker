import React from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import useWheelPickerItem from '../../hooks/useWheelPickerItem';
import styles from './WheelPickerItemStyles';
import type { WheelPickerItemProps } from './types';

const WheelPickerItem: React.FC<WheelPickerItemProps> = ({
  itemStyle,
  height,
  item,
  index,
  currentScrollIndex,
  surroundingItemsCount,
  selectedItemStyle,
  itemsAngle,
  itemsOpacity,
}) => {
  const selectedItem = currentScrollIndex + surroundingItemsCount === index;
  const { rotate, opacity } = useWheelPickerItem({
    itemsAngle,
    itemsOpacity,
    surroundingItemsCount,
    currentScrollIndex,
    index,
  });

  return (
    <Animated.View
      style={[
        styles.option,
        {
          height,
          transform: [{ rotateX: `${rotate}deg` }],
          opacity: opacity,
        },
      ]}>
      <Text style={[itemStyle, selectedItem && selectedItemStyle]}>
        {typeof item === 'object' ? item.label : item}
      </Text>
    </Animated.View>
  );
};

export default WheelPickerItem;
