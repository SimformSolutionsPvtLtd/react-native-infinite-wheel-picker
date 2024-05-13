import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export interface DataType {
  value: number | string;
  label: number | string;
}

export interface WheelPickerProps {
  data: DataType[];
  height: number;
  dividerWidth?: ViewStyle['borderBottomWidth'];
  dividerColor?: ViewStyle['borderBottomColor'];
  textStyle?: StyleProp<TextStyle>;
  selectedValue?: number;
  onValueChange?: (value: number | string) => void;
  itemDisplayInList?: number;
  infiniteScroll?: boolean;
}

export interface WheelPickerListProps {
  item: DataType;
  index: number;
  height: number;
  animatedScrollY: SharedValue<number>;
  itemsCount: number;
  textStyle?: StyleProp<TextStyle>;
}

export interface ViewabilityConfirProps {
  minimumViewTime: number;
  viewAreaCoveragePercentThreshold: number;
}
