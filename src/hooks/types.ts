import type { WheelPickerProps } from '../components';

/**
 * @property {number} selectedIndex - The index of the selected value
 * @property {Array<string | number>} arrayData - The data to be displayed in the wheel picker
 * @property {number} restElements - The number of elements to be displayed above and below the selected element
 * @property {number} loopCount - The number of times the data should be looped
 * @property {string | number} decelerationRate - The deceleration rate of the scroll view
 * @property {Array<string | number>} data - The data to be displayed in the wheel picker
 * @property {number} elementHeight - The height of each element in the wheel picker
 */
export interface ThrowPropsError
  extends Pick<
    WheelPickerProps,
    | 'selectedIndex'
    | 'restElements'
    | 'loopCount'
    | 'decelerationRate'
    | 'elementHeight'
    | 'data'
    | 'initialSelectedIndex'
  > {
  arrayData: Array<string | number>;
}
