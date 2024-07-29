import type {
  Animated,
  FlatListProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

/**
 * this type is written for range between 1-6 for size
 */
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

/**
 * @property {number} selectedIndex - The index of the selected value
 * @property {Array<string | number>} data - The data to be displayed in the wheel picker
 * @property {number} elementHeight - The height of each element in the wheel picker
 * @property {number} restElements - The number of elements to be displayed above and below the selected element
 * @property {string | number} decelerationRate - The deceleration rate of the scroll view
 * @property {number} loopCount - The number of times the data should be looped
 * @property {StyleProp<ViewStyle>} selectedLayoutStyle - The style of the selected element
 * @property {StyleProp<ViewStyle>} containerStyle - The style of the container
 * @property {ViewProps} containerProps - The props of the container
 * @property {FlatListProps<string | null>} flatListProps - The props of the flat list
 * @property {StyleProp<TextStyle>} elementTextStyle - The style of the element text
 * @property {StyleProp<ViewStyle>} elementContainerStyle - The style of the element container
 * @property {Animated.AnimatedAddition<string | number>} currentScrollIndex - The current scroll index
 * @property {number} initialSelectedIndex - The initial selected index
 */
export interface WheelPickerProps
  extends Pick<
    Partial<WheelPickerElementProps>,
    | 'elementHeight'
    | 'elementContainerStyle'
    | 'restElements'
    | 'elementTextStyle'
  > {
  selectedIndex: number;
  data: Array<string | number>;
  onChangeValue: (index: number, value: string) => void;
  selectedLayoutStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  containerProps?: Omit<ViewProps, 'style'>;
  decelerationRate?: 'normal' | 'fast' | number;
  flatListProps?: Omit<FlatListProps<string | null>, 'data' | 'renderItem'>;
  loopCount?: number;
  infiniteScroll?: boolean;
  initialSelectedIndex?: number;
}

/**
 * @property {string | null} item - The item to be displayed in the wheel picker element
 * @property {number} elementHeight - The height of the element
 * @property {number} index - The index of the element
 * @property {Animated.AnimatedAddition<string | number>} currentScrollIndex - The current scroll index
 * @property {Range<1, 6>} restElements - The number of elements to be displayed above and below the selected element
 * @property {number} defaultActiveScale - The default scale of the active element
 * @property {number} defaultActiveOpacity - The default opacity of the active element
 * @property {StyleProp<TextStyle>} elementTextStyle - The style of the element text
 * @property {StyleProp<ViewStyle>} elementContainerStyle - The style of the element container
 */
export interface WheelPickerElementProps {
  item: string | null;
  elementHeight: number;
  index: number;
  currentScrollIndex: Animated.AnimatedAddition<string | number>;
  restElements: Range<1, 6>;
  defaultActiveScale?: number;
  defaultActiveOpacity?: number;
  elementTextStyle: StyleProp<TextStyle>;
  elementContainerStyle: StyleProp<ViewStyle>;
}

/**
 * @property {(index: number) => void} scrollToIndex - The function to scroll to a specific index
 */
export interface WheelPickerRef {
  scrollToIndex: (index: number) => void;
}
