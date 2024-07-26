import React from 'react';
import { Animated, Text } from 'react-native';
import Constants from '../../constants';
import { useWheelPickerElement } from '../../hooks';
import styles from './WheelPickerStyles';
import type { WheelPickerElementProps } from './WheelPickerTypes';

/**
 * The wheel picker element component
 * @property {StyleProp<TextStyle>} elementTextStyle - The style of the element text
 * @property {StyleProp<ViewStyle>} elementContainerStyle - The style of the element container
 * @property {number} elementHeight - The height of each element in the wheel picker
 * @property {string | null} item - The item to be displayed in the wheel picker element
 * @property {number} index - The index of the current element
 * @property {number} restElements - The number of elements to be displayed above and below the selected element
 * @property {Animated.AnimatedAddition<string | number>} currentScrollIndex - The current scroll index
 * @property {number} defaultActiveScale - The default scale of the active element
 * @property {number} defaultActiveOpacity - The default opacity of the active element
 */
const WheelPickerElement = ({
  elementTextStyle,
  elementContainerStyle,
  elementHeight,
  item,
  index,
  restElements,
  currentScrollIndex,
  defaultActiveScale = Constants.defaultActiveScale,
  defaultActiveOpacity = Constants.defaultActiveOpacity,
}: WheelPickerElementProps) => {
  const { translateY, opacity, scale, rotateX } = useWheelPickerElement({
    index,
    restElements,
    currentScrollIndex,
    defaultActiveOpacity,
    defaultActiveScale,
    elementHeight,
  });

  return (
    <Animated.View
      style={[
        styles.wheelPickerElementContainerStyle,
        elementContainerStyle,
        {
          height: elementHeight,
          opacity,
          transform: [
            { translateY },
            { rotateX },
            { scale },
            { perspective: Constants.perspective },
          ],
        },
      ]}>
      <Text style={[styles.wheelPickerElementTextStyle, elementTextStyle]}>
        {item}
      </Text>
    </Animated.View>
  );
};

/**
 * After the first render, we enforce that this component won't re-render.
 */
export default React.memo(WheelPickerElement, () => true);
