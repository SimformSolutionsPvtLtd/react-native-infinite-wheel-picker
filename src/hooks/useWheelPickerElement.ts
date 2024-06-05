import { Animated } from 'react-native';
import type { WheelPickerElementProps } from '../components';
import {
  generateInputRange,
  generateOutputRange,
  generateTranslateYOutputRange,
  opacityFunction,
  rotationFunction,
  scaleFunction,
} from '../utils';
import Constants from '../constants';

/**
 * Custom hook to handle the wheel picker element logic
 * @param index - The index of the current element
 * @param restElements - The number of elements to be displayed above and below the selected element
 * @param currentScrollIndex - The current scroll index of the wheel picker
 * @param defaultActiveScale - The default scale of the active element
 * @param defaultActiveOpacity - The default opacity of the active element
 * @param elementHeight - The height of each element in the wheel picker
 */
const useWheelPickerElement = ({
  index,
  restElements,
  currentScrollIndex,
  defaultActiveScale,
  defaultActiveOpacity,
  elementHeight,
}: Required<
  Pick<
    WheelPickerElementProps,
    | 'index'
    | 'restElements'
    | 'currentScrollIndex'
    | 'defaultActiveOpacity'
    | 'defaultActiveScale'
    | 'elementHeight'
  >
>) => {
  /**
   * Generate the input range for the interpolation
   */
  const inputRange = generateInputRange(restElements);

  /**
   * Calculate the relative scroll index
   */
  const scrollIndex = Animated.subtract(index, currentScrollIndex);

  /**
   * Interpolate the translateY value
   * based on the scroll index
   * @returns {Animated.AnimatedAddition<string | number>}
   */
  const translateY = scrollIndex.interpolate({
    inputRange: inputRange,
    outputRange: generateTranslateYOutputRange(
      restElements,
      elementHeight,
      rotationFunction
    ),
  });

  /**
   * Interpolate the Opacity value
   * based on the scroll index
   * @returns {Animated.AnimatedAddition<string | number>}
   */
  const opacity = scrollIndex.interpolate({
    inputRange: inputRange,
    outputRange: generateOutputRange(
      restElements,
      opacityFunction,
      defaultActiveOpacity,
      false,
      true
    ),
  });

  /**
   * Interpolate the Scale value
   * based on the scroll index
   * @returns {Animated.AnimatedAddition<string | number>}
   */
  const scale = scrollIndex.interpolate({
    inputRange: inputRange,
    outputRange: generateOutputRange(
      restElements,
      scaleFunction,
      defaultActiveScale
    ),
  });

  /**
   * Interpolate the RotateX value
   * based on the scroll index
   * @returns {Animated.AnimatedAddition<string | number>}
   */
  const rotateX = scrollIndex.interpolate({
    inputRange: inputRange,
    outputRange: generateOutputRange(
      restElements,
      rotationFunction,
      Constants.defaultRotation,
      true
    ),
  });

  return {
    translateY,
    opacity,
    scale,
    rotateX,
  };
};

export default useWheelPickerElement;
