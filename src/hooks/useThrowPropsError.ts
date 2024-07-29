import { useEffect } from 'react';
import type { ThrowPropsError } from './types';

/**
 * Verify if the props are valid or not
 * If not, throw an error
 * @param selectedIndex - The index of the selected value
 * @param arrayData - The data to be displayed in the wheel picker
 * @param restElements - The number of elements to be displayed above and below the selected element
 * @param loopCount - The number of times the data should be looped
 * @param decelerationRate - The deceleration rate of the scroll view
 * @param data - The data to be displayed in the wheel picker
 * @param elementHeight - The height of each element in the wheel picker
 */
const useThrowPropsError = ({
  selectedIndex,
  arrayData,
  restElements,
  loopCount,
  decelerationRate,
  data,
  elementHeight,
  initialSelectedIndex,
}: ThrowPropsError) => {
  /**
   * Check if the selected index is out of bounds
   * If it is, throw an error
   */
  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= arrayData.length) {
      throw new Error(
        `Selected index ${selectedIndex} is out of bounds. Index should be in between [0, ${
          arrayData.length - 1
        }]`
      );
    }
    if (
      initialSelectedIndex &&
      (initialSelectedIndex < 0 || initialSelectedIndex >= data.length)
    ) {
      throw new Error(
        `Initial selected index ${initialSelectedIndex} is out of bounds. Index should be in between [0, ${
          data.length - 1
        }]`
      );
    }
    if (restElements && (restElements < 1 || restElements > 6)) {
      throw new Error(
        `Rest elements ${restElements} is out of bounds. Rest elements should be in between [1, 6]`
      );
    }
    if (
      decelerationRate !== 'normal' &&
      decelerationRate !== 'fast' &&
      typeof decelerationRate !== 'number'
    ) {
      throw new Error(
        `Deceleration rate ${decelerationRate} is invalid. Deceleration rate should be either 'normal', 'fast' or a number`
      );
    }
    if (loopCount && loopCount < 1) {
      throw new Error(
        `Loop count ${loopCount} is invalid. Loop count must be greater than 1.`
      );
    }
    if (!Array.isArray(data)) {
      throw new Error(`Data ${data} is invalid. Data must be an array.`);
    }
    if (Array.isArray(data)) {
      data.map(item => {
        if (typeof item !== 'string' && typeof item !== 'number') {
          throw new Error(
            `Data ${data} is invalid. Data must be an array of strings or numbers.`
          );
        }
      });
    }
    if (typeof elementHeight !== 'number') {
      throw new Error(
        `Element height ${elementHeight} is invalid. Element height must be a number.`
      );
    }
  }, [
    selectedIndex,
    arrayData,
    restElements,
    loopCount,
    decelerationRate,
    data,
    elementHeight,
    initialSelectedIndex,
  ]);
};

export default useThrowPropsError;
