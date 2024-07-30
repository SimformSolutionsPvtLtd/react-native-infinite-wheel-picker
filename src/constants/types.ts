import type { WheelPickerElementProps, WheelPickerProps } from '../components';

/**
 * The constants type
 * @property {number} perspective - The perspective of the wheel picker
 * @property {number} elementHeight - The height of each element in the wheel picker
 * @property {number} restElements - The number of elements to be displayed above and below the selected element
 * @property {string} decelerationRate - The deceleration rate of the scroll view
 * @property {number} loopCount - The number of times the data should be looped
 * @property {number} defaultActiveOpacity - The default opacity of the active element
 * @property {number} defaultActiveScale - The default scale of the active element
 * @property {number} perspective - The perspective of the wheel picker
 */
export interface ConstantsType
  extends Required<
      Pick<
        WheelPickerProps,
        'loopCount' | 'restElements' | 'decelerationRate' | 'elementHeight'
      >
    >,
    Required<
      Pick<
        WheelPickerElementProps,
        'defaultActiveOpacity' | 'defaultActiveScale'
      >
    > {
  perspective: number;
  defaultRotation: string;
}
