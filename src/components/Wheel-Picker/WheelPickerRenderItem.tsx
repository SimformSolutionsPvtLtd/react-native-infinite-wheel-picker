import React from 'react';
import { Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import wheelPickerStyle from './styles';
import type { WheelPickerListProps } from './types';

/**
 * Renders an item for the WheelPicker component.
 * @param {object} props - The props object containing item information and styling.
 * @param {object} props.item - The item to render.
 * @param {number} props.index - The index of the item.
 * @param {number} props.height - The height of the item.
 * @param {Animated.Value} props.animatedScrollY - Animated value for scroll position.
 * @param {number} props.itemsCount - The total number of items in the list.
 * @param {object} props.textStyle - Additional styling for the text.
 * @returns {React.ReactNode} A React node representing the rendered item.
 */
const WheelPickerRenderItem = ({
  item,
  index,
  height,
  animatedScrollY,
  itemsCount,
  textStyle,
}: WheelPickerListProps) => {
  let inRanage = [];
  let outRange = [];
  let rotateXOutputRange = [];
  let angleValue = 0;

  // To find the center position of a items we have to divide total number of items by 2.
  const centerPosition = Math.floor(itemsCount / 2);

  outRange[centerPosition] = 1;
  outRange.length = itemsCount;
  rotateXOutputRange[centerPosition] = 0;
  rotateXOutputRange.length = itemsCount;

  for (var i = itemsCount - 1; i >= 0; i--) {
    inRanage.push((index - i) * height);
  }
  /**
 Here we are increasing the angle 25 degree each time. It is the best suited
 range which gives the feel like text is going in z direction.
 And 65 degree is the last range which gives the feel that text is gome max 
 in the z direction.
 If we increase the angle more than 90 degree it will invert the text.
 */
  for (let j = 1; j <= centerPosition; j++) {
    const val = Math.pow(1 / 2, j);
    const angleVal = angleValue + 25;
    outRange[centerPosition - j] = outRange[centerPosition + j] = val;
    rotateXOutputRange[centerPosition - j] = rotateXOutputRange[
      centerPosition + j
    ] = angleVal >= 65 ? 65 : angleVal;
    angleValue = angleVal;
  }

  const opacityValue = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedScrollY.value,
        inRanage,
        outRange,
        Extrapolation.CLAMP
      ),
    };
  }, [animatedScrollY]);

  const xRotation = useAnimatedStyle(() => ({
    transform: [
      {
        rotateX: `${interpolate(
          animatedScrollY.value,
          inRanage,
          rotateXOutputRange,
          Extrapolation.CLAMP
        )}deg`,
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        xRotation,
        wheelPickerStyle.listView,
        {
          height,
        },
        opacityValue,
      ]}>
      <Text style={[wheelPickerStyle.defaultTextStyle, textStyle]}>
        {item.label}
      </Text>
    </Animated.View>
  );
};

export default WheelPickerRenderItem;
